import { db } from '../db';
import { message, user } from '../db/schema';
import { StateManager, ConversationState } from './StateManager';
import { ContextManager } from './ContextManager';
import { LLMClient } from './LLMClient';
import { ToolExecutor } from './ToolExecutor';
import { InteractionManager } from './InteractionManager';
import { eq } from 'drizzle-orm';

export interface UserMessage {
  userId: string;
  message: string;
  conversationId?: string;
  buttonAction?: string;
}

export interface AIResponse {
  text: string;
  interactions?: any[];
  state?: ConversationState;
  toolCalls?: any[];
}

export interface MessageHandlerResponse {
  userMessage: string;
  aiResponse: AIResponse;
  cost?: {
    inputTokens: number;
    outputTokens: number;
    total: number;
  };
}

export class MessageHandler {
  private static instance: MessageHandler;
  private stateManager: StateManager;
  private contextManager: ContextManager;
  private llmClient: LLMClient;
  private toolExecutor: ToolExecutor;
  private interactionManager: InteractionManager;

  private constructor() {
    this.stateManager = StateManager.getInstance();
    this.contextManager = ContextManager.getInstance();
    this.llmClient = LLMClient.getInstance();
    this.toolExecutor = ToolExecutor.getInstance();
    this.interactionManager = InteractionManager.getInstance();
  }

  public static getInstance(): MessageHandler {
    if (!MessageHandler.instance) {
      MessageHandler.instance = new MessageHandler();
    }
    return MessageHandler.instance;
  }

  public async handleMessage(userMessage: UserMessage): Promise<MessageHandlerResponse> {
    try {
      // Ensure user exists
      await this.ensureUserExists(userMessage.userId);

      // Persist user message
      await this.persistUserMessage(userMessage);

      // Get current conversation state
      const currentState = await this.getCurrentState(userMessage.userId);

      // Build context for LLM
      const context = await this.contextManager.buildContext(userMessage.userId, currentState);

      // Get system prompt and available tools for current state
      const systemPrompt = this.stateManager.getSystemPrompt(currentState);
      const availableTools = this.stateManager.getAvailableTools(currentState);

      // Handle button actions immediately
      let toolExecutionResults: any[] = [];
      let llmResponse: any;

      if (userMessage.buttonAction) {
        // Button was clicked - execute corresponding tool directly
        const buttonToolCall = this.mapButtonActionToTool(userMessage.buttonAction, currentState);
        if (buttonToolCall) {
          console.log(`🔧 Executing tool for button action: ${userMessage.buttonAction}`);
          toolExecutionResults = await this.toolExecutor.executeTools(
            [buttonToolCall],
            userMessage.userId,
            currentState
          );
          
          // Generate a response based on the tool execution
          llmResponse = {
            text: this.generateResponseForButtonAction(userMessage.buttonAction, toolExecutionResults),
            toolCalls: [buttonToolCall],
            usage: { inputTokens: 0, outputTokens: 0 } // Button actions don't use LLM tokens
          };
        } else {
          // Fallback to normal LLM processing if button action not recognized
          llmResponse = await this.llmClient.generateResponse({
            systemPrompt,
            context,
            userMessage: userMessage.message,
            availableTools,
            state: currentState
          });
        }
      } else {
        // Normal text message - generate AI response
        llmResponse = await this.llmClient.generateResponse({
          systemPrompt,
          context,
          userMessage: userMessage.message,
          availableTools,
          state: currentState
        });

        // Execute any tool calls from LLM
        if (llmResponse.toolCalls && llmResponse.toolCalls.length > 0) {
          toolExecutionResults = await this.toolExecutor.executeTools(
            llmResponse.toolCalls,
            userMessage.userId,
            currentState
          );
        }
      }

      // Create interactions
      const interactions = this.interactionManager.createInteractions(
        llmResponse,
        currentState,
        toolExecutionResults
      );

      // Determine new state (could be same or different)
      const newState = this.determineNewState(currentState, llmResponse, toolExecutionResults);

      // Update state if changed
      if (newState !== currentState) {
        await this.updateUserState(userMessage.userId, newState);
      }

      // Persist AI response
      await this.persistAIResponse(userMessage.userId, llmResponse, newState);

      return {
        userMessage: userMessage.message,
        aiResponse: {
          text: llmResponse.text,
          interactions,
          state: newState,
          toolCalls: llmResponse.toolCalls
        },
        cost: llmResponse.usage ? {
          inputTokens: llmResponse.usage.inputTokens,
          outputTokens: llmResponse.usage.outputTokens,
          total: this.calculateCost(llmResponse.usage.inputTokens, llmResponse.usage.outputTokens)
        } : undefined
      };

    } catch (error) {
      console.error('Error handling message:', error);
      throw error;
    }
  }

  private async ensureUserExists(userId: string): Promise<void> {
    await db.insert(user).values({
      id: userId,
    }).onConflictDoNothing();
  }

  private async persistUserMessage(userMessage: UserMessage): Promise<void> {
    await db.insert(message).values({
      message: userMessage.message,
      role: "user",
      userId: userMessage.userId,
    });
  }

  private async persistAIResponse(userId: string, llmResponse: any, state: ConversationState): Promise<void> {
    await db.insert(message).values({
      message: llmResponse.text,
      role: "assistant",
      userId: userId,
      inputTokens: llmResponse.usage?.inputTokens,
      outputTokens: llmResponse.usage?.outputTokens,
    });
  }

  private async getCurrentState(userId: string): Promise<ConversationState> {
    try {
      // Query the user table to get the current conversation state
      const users = await db
        .select()
        .from(user)
        .where(eq(user.id, userId))
        .limit(1);

      if (users.length === 0) {
        // User doesn't exist yet, return initial state
        return this.stateManager.getInitialState();
      }

      const userRecord = users[0];
      
      // Convert string state back to enum, with fallback to initial state
      const stateValue = userRecord.conversationState as ConversationState;
      
      // Validate that the state is a valid enum value
      if (Object.values(ConversationState).includes(stateValue)) {
        return stateValue;
      } else {
        console.warn(`Invalid conversation state for user ${userId}: ${userRecord.conversationState}, using initial state`);
        return this.stateManager.getInitialState();
      }
    } catch (error) {
      console.error(`Error getting current state for user ${userId}:`, error);
      return this.stateManager.getInitialState();
    }
  }

  private async updateUserState(userId: string, newState: ConversationState): Promise<void> {
    try {
      // Update the user's conversation state in the database
      await db
        .update(user)
        .set({ conversationState: newState })
        .where(eq(user.id, userId));
      
      console.log(`✅ Updated user ${userId} state to ${newState}`);
    } catch (error) {
      console.error(`❌ Error updating user ${userId} state to ${newState}:`, error);
      throw error;
    }
  }

  private determineNewState(
    currentState: ConversationState,
    llmResponse: any,
    toolExecutionResults: any[]
  ): ConversationState {
    // Enhanced state transition logic based on tool results and conversation flow
    
    // Check if any tool indicates a specific state transition
    for (const result of toolExecutionResults) {
      switch (result.type) {
        case 'begin_site_creation':
          if (this.stateManager.canTransition(currentState, ConversationState.BUSINESS_INFO)) {
            return ConversationState.BUSINESS_INFO;
          }
          break;
        case 'generate_site':
          if (this.stateManager.canTransition(currentState, ConversationState.INITIAL_SITE_GENERATION)) {
            return ConversationState.INITIAL_SITE_GENERATION;
          }
          break;
        case 'refine_site':
        case 'refine_colors':
        case 'refine_content':
        case 'refine_images':
          if (this.stateManager.canTransition(currentState, ConversationState.SITE_REFINEMENT)) {
            return ConversationState.SITE_REFINEMENT;
          }
          break;
        case 'deploy_site':
          if (this.stateManager.canTransition(currentState, ConversationState.DEPLOYMENT)) {
            return ConversationState.DEPLOYMENT;
          }
          break;
        case 'connect_domain':
        case 'purchase_domain':
          if (this.stateManager.canTransition(currentState, ConversationState.DOMAIN_CONNECTION)) {
            return ConversationState.DOMAIN_CONNECTION;
          }
          break;
        case 'site_launched':
          if (this.stateManager.canTransition(currentState, ConversationState.POST_LAUNCH_UPDATES)) {
            return ConversationState.POST_LAUNCH_UPDATES;
          }
          break;
      }
    }

    // Check for natural progression based on current state and conversation content
    const messageContent = llmResponse.text?.toLowerCase() || '';
    
    switch (currentState) {
      case ConversationState.GREETING:
        // If user shows interest in creating a site, move to business info
        if (messageContent.includes('sitio') || messageContent.includes('crear') || 
            messageContent.includes('empezar') || messageContent.includes('comenzar')) {
          return ConversationState.BUSINESS_INFO;
        }
        break;
        
      case ConversationState.BUSINESS_INFO:
        // If business info seems complete, move to site generation
        if (messageContent.includes('generar') || messageContent.includes('crear sitio') ||
            messageContent.includes('listo') || messageContent.includes('siguiente')) {
          return ConversationState.INITIAL_SITE_GENERATION;
        }
        break;
        
      case ConversationState.INITIAL_SITE_GENERATION:
        // After initial generation, move to refinement
        if (messageContent.includes('ver') || messageContent.includes('mostrar') ||
            messageContent.includes('cambiar') || messageContent.includes('modificar')) {
          return ConversationState.SITE_REFINEMENT;
        }
        break;
    }
    
    // If no transition is determined, stay in current state
    return currentState;
  }

  private calculateCost(inputTokens: number, outputTokens: number): number {
    // Using the model costs from index.ts
    const inputCost = inputTokens * 0.4 / 1000000;
    const outputCost = outputTokens * 1.6 / 1000000;
    return inputCost + outputCost;
  }

  private mapButtonActionToTool(buttonAction: string, currentState: ConversationState): { toolName: string; args: any } | null {
    // Map button actions to corresponding tool calls
    const actionToolMap: Record<string, { toolName: string; args: any }> = {
      'begin_site_creation': {
        toolName: 'beginButton',
        args: {}
      },
      'preview_site': {
        toolName: 'generateInitialSite',
        args: { businessName: 'Mi Negocio', businessType: 'general' }
      },
      'refine_colors': {
        toolName: 'refineSite',
        args: { aspect: 'colors', changes: {} }
      },
      'refine_content': {
        toolName: 'refineSite',
        args: { aspect: 'content', changes: {} }
      },
      'refine_images': {
        toolName: 'refineSite',
        args: { aspect: 'images', changes: {} }
      },
      'deploy_site': {
        toolName: 'deploySite',
        args: { subdomain: 'mi-sitio' }
      },
      'connect_domain': {
        toolName: 'connectDomain',
        args: { domain: 'example.com', action: 'connect' }
      },
      'purchase_domain': {
        toolName: 'connectDomain',
        args: { domain: 'example.com', action: 'purchase' }
      }
    };

    const toolConfig = actionToolMap[buttonAction];
    if (!toolConfig) {
      console.warn(`No tool mapping found for button action: ${buttonAction}`);
      return null;
    }

    return {
      toolName: toolConfig.toolName,
      args: toolConfig.args
    };
  }

  private generateResponseForButtonAction(buttonAction: string, toolResults: any[]): string {
    const actionResponseMap: Record<string, string> = {
      'begin_site_creation': '¡Perfecto! Vamos a crear tu sitio web. Primero, cuéntame sobre tu negocio:\n\n• ¿Cuál es el nombre de tu negocio?\n• ¿A qué se dedica tu empresa?\n• ¿Tienes alguna descripción específica?',
      'preview_site': '¡Tu sitio web está listo! 🎉\n\nAhora puedes:\n• Personalizar colores y diseño\n• Modificar el contenido\n• Cambiar las imágenes\n• Publicar tu sitio cuando esté listo',
      'refine_colors': '🎨 ¿Qué colores te gustaría usar para tu sitio?\n\nPuedes decirme:\n• Colores específicos (ej: azul, rojo)\n• El estilo que buscas (elegante, moderno, vibrante)\n• O envíame una imagen de referencia',
      'refine_content': '✏️ ¿Qué contenido te gustaría cambiar?\n\nPuedes modificar:\n• Textos de las páginas\n• Títulos y descripciones\n• Información de contacto\n• Servicios o productos',
      'refine_images': '🖼️ ¿Qué imágenes quieres cambiar?\n\nPuedes:\n• Subir tus propias imágenes\n• Decirme qué tipo de imágenes necesitas\n• Cambiar el logo de tu empresa',
      'deploy_site': '🚀 ¡Tu sitio está siendo publicado!\n\nEn unos minutos estará disponible en internet. Te enviaré el enlace cuando esté listo.\n\n¿Te gustaría conectar un dominio personalizado?',
      'connect_domain': '🌐 Para conectar tu dominio necesito:\n\n• El dominio que quieres usar\n• Si ya lo tienes o quieres comprarlo\n• Acceso a la configuración DNS del dominio',
      'purchase_domain': '💰 ¿Qué dominio te gustaría comprar?\n\nEjemplo: minegocio.com\n\nBuscaré la disponibilidad y te mostraré las opciones con precios.'
    };

    const response = actionResponseMap[buttonAction];
    if (response) {
      return response;
    }

    // Fallback response based on tool results
    if (toolResults.length > 0 && toolResults[0].success) {
      return toolResults[0].result.message || '✅ Acción completada exitosamente.';
    }

    return '✅ Acción procesada. ¿En qué más puedo ayudarte?';
  }
} 