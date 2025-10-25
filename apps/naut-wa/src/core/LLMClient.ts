import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { ConversationState } from './StateManager';
import { ConversationContext } from './ContextManager';
import { model } from '../index';

export interface LLMRequest {
  systemPrompt: string;
  context: ConversationContext;
  userMessage: string;
  availableTools: any[];
  state: ConversationState;
}

export interface LLMResponse {
  text: string;
  toolCalls?: any[];
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
  reasoning?: string;
}

export class LLMClient {
  private static instance: LLMClient;

  private constructor() {}

  public static getInstance(): LLMClient {
    if (!LLMClient.instance) {
      LLMClient.instance = new LLMClient();
    }
    return LLMClient.instance;
  }

  public async generateResponse(request: LLMRequest): Promise<LLMResponse> {
    try {
      // Build messages array
      const messages = this.buildMessages(request);

      // Convert tools to the format expected by the AI SDK
      const tools = this.formatTools(request.availableTools);

      // Generate response using AI SDK
      const response = await generateText({
        model: openai(model.name),
        messages,
        tools,
        maxSteps: 10,
        temperature: 0.5,
      });

      return {
        text: response.text,
        toolCalls: response.toolCalls || [],
        usage: {
          inputTokens: response.usage.promptTokens,
          outputTokens: response.usage.completionTokens,
        }
      };

    } catch (error) {
      console.error('Error generating LLM response:', error);
      throw new Error(`LLM generation failed: ${error}`);
    }
  }

  private buildMessages(request: LLMRequest): any[] {
    const messages: any[] = [];

    // Add system message
    messages.push({
      role: 'system',
      content: this.buildSystemMessage(request)
    });

    // Add conversation history
    request.context.recentMessages.forEach(msg => {
      messages.push({
        role: msg.role,
        content: msg.content
      });
    });

    // Add current user message
    messages.push({
      role: 'user',
      content: request.userMessage
    });

    return messages;
  }

  private buildSystemMessage(request: LLMRequest): string {
    let systemMessage = request.systemPrompt;

    // Add context information
    if (request.context.summary) {
      systemMessage += `\n\nConversation Summary:\n${request.context.summary}`;
    }

    // Add state information
    systemMessage += `\n\nCurrent conversation state: ${request.state}`;

    // Add available tools information
    if (request.availableTools.length > 0) {
      systemMessage += `\n\nAvailable tools: ${request.availableTools.map(tool => tool.name || tool.description).join(', ')}`;
    }

    return systemMessage;
  }

  private formatTools(availableTools: any[]): any {
    const formattedTools: any = {};

    availableTools.forEach(tool => {
      if (tool.name && tool.execute) {
        formattedTools[tool.name] = tool;
      }
    });

    return formattedTools;
  }

  public async validateResponse(response: LLMResponse): Promise<boolean> {
    try {
      // Basic validation
      if (!response.text && (!response.toolCalls || response.toolCalls.length === 0)) {
        return false;
      }

      // Validate tool calls if present
      if (response.toolCalls) {
        for (const toolCall of response.toolCalls) {
          if (!toolCall.toolName || !toolCall.args) {
            return false;
          }
        }
      }

      return true;
    } catch (error) {
      console.error('Error validating response:', error);
      return false;
    }
  }

  public estimateTokens(text: string): number {
    // Rough estimation: ~4 characters per token for English text
    return Math.ceil(text.length / 4);
  }

  public calculateCost(inputTokens: number, outputTokens: number): number {
    const inputCost = (inputTokens * model.inputTokenCostPerMillion) / 1000000;
    const outputCost = (outputTokens * model.outputTokenCostPerMillion) / 1000000;
    return inputCost + outputCost;
  }
} 