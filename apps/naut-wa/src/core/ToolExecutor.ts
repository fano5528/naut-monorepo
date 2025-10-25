import { ConversationState } from './StateManager';
import { tool } from 'ai';
import { z } from 'zod';

export interface ToolExecutionResult {
  toolName: string;
  success: boolean;
  result: any;
  error?: string;
  type?: string;
}

export interface ToolCall {
  toolName: string;
  args: any;
}

export class ToolExecutor {
  private static instance: ToolExecutor;
  private tools: Map<string, any> = new Map();

  private constructor() {
    this.initializeTools();
  }

  public static getInstance(): ToolExecutor {
    if (!ToolExecutor.instance) {
      ToolExecutor.instance = new ToolExecutor();
    }
    return ToolExecutor.instance;
  }

  private initializeTools(): void {
    // Begin Button Tool
    this.tools.set('beginButton', tool({
      description: 'Iniciar el proceso de creación de un sitio web',
      parameters: z.object({}),
      execute: async ({}) => {
        return {
          message: 'Iniciando el proceso de creación de un sitio web...',
          type: 'begin_site_creation',
          success: true
        };
      },
    }));

    // Business Info Collection Tool
    this.tools.set('collectBusinessInfo', tool({
      description: 'Recopilar información básica del negocio',
      parameters: z.object({
        businessName: z.string().describe('Nombre del negocio'),
        businessType: z.string().describe('Tipo de negocio o industria'),
        description: z.string().optional().describe('Descripción del negocio')
      }),
      execute: async ({ businessName, businessType, description }) => {
        // In a full implementation, this would save to database
        console.log('Collecting business info:', { businessName, businessType, description });
        return {
          message: `Información del negocio guardada: ${businessName} - ${businessType}`,
          type: 'business_info_collected',
          success: true,
          data: { businessName, businessType, description }
        };
      },
    }));

    // Site Generation Tool
    this.tools.set('generateInitialSite', tool({
      description: 'Generar el sitio web inicial basado en la información del negocio',
      parameters: z.object({
        businessName: z.string(),
        businessType: z.string(),
        primaryColor: z.string().optional().describe('Color primario para el sitio'),
        template: z.string().optional().describe('Plantilla a usar')
      }),
      execute: async ({ businessName, businessType, primaryColor, template }) => {
        // Mock site generation
        const siteData = {
          domain: `${businessName.toLowerCase().replace(/\s+/g, '-')}.naut.mx`,
          template: template || 'business-basic',
          colors: {
            primary: primaryColor || '#fb3640',
            secondary: '#e5e7eb'
          },
          pages: ['home', 'about', 'contact']
        };

        return {
          message: `Sitio inicial generado para ${businessName}`,
          type: 'initial_site_generated',
          success: true,
          data: siteData
        };
      },
    }));

    // Site Refinement Tool
    this.tools.set('refineSite', tool({
      description: 'Refinar aspectos del sitio web como colores, fuentes, contenido',
      parameters: z.object({
        aspect: z.string().describe('Aspecto a refinar: colors, fonts, content, images'),
        changes: z.object({}).passthrough().describe('Cambios específicos a realizar')
      }),
      execute: async ({ aspect, changes }) => {
        console.log(`Refining ${aspect}:`, changes);
        return {
          message: `Refinamiento aplicado: ${aspect}`,
          type: 'site_refined',
          success: true,
          data: { aspect, changes }
        };
      },
    }));

    // Deployment Tool
    this.tools.set('deploySite', tool({
      description: 'Desplegar el sitio web a un subdominio de Naut',
      parameters: z.object({
        subdomain: z.string().describe('Subdominio deseado'),
        domain: z.string().optional().describe('Dominio completo si es diferente')
      }),
      execute: async ({ subdomain, domain }) => {
        const finalDomain = domain || `${subdomain}.naut.mx`;
        
        return {
          message: `Sitio desplegado en ${finalDomain}`,
          type: 'site_deployed',
          success: true,
          data: { domain: finalDomain, subdomain }
        };
      },
    }));

    // Domain Connection Tool
    this.tools.set('connectDomain', tool({
      description: 'Conectar un dominio propio al sitio web',
      parameters: z.object({
        domain: z.string().describe('Dominio a conectar'),
        action: z.enum(['purchase', 'connect']).describe('Comprar dominio nuevo o conectar existente')
      }),
      execute: async ({ domain, action }) => {
        if (action === 'purchase') {
          return {
            message: `Iniciando proceso de compra para ${domain}`,
            type: 'domain_purchase_initiated',
            success: true,
            data: { domain, action, status: 'pending' }
          };
        } else {
          return {
            message: `Instrucciones de conexión enviadas para ${domain}`,
            type: 'domain_connection_instructions',
            success: true,
            data: { domain, action, instructions: 'DNS records provided' }
          };
        }
      },
    }));
  }

  public getAvailableTools(state: ConversationState): any[] {
    const toolsByState: Record<ConversationState, string[]> = {
      [ConversationState.GREETING]: ['beginButton'],
      [ConversationState.BUSINESS_INFO]: ['collectBusinessInfo'],
      [ConversationState.INITIAL_SITE_GENERATION]: ['generateInitialSite'],
      [ConversationState.SITE_REFINEMENT]: ['refineSite'],
      [ConversationState.DEPLOYMENT]: ['deploySite'],
      [ConversationState.DOMAIN_CONNECTION]: ['connectDomain'],
      [ConversationState.POST_LAUNCH_UPDATES]: ['refineSite', 'connectDomain']
    };

    const availableToolNames = toolsByState[state] || [];
    return availableToolNames.map(name => this.tools.get(name)).filter(Boolean);
  }

  public async executeTools(
    toolCalls: ToolCall[],
    userId: string,
    currentState: ConversationState
  ): Promise<ToolExecutionResult[]> {
    const results: ToolExecutionResult[] = [];

    for (const toolCall of toolCalls) {
      try {
        const tool = this.tools.get(toolCall.toolName);
        if (!tool) {
          results.push({
            toolName: toolCall.toolName,
            success: false,
            result: null,
            error: `Tool ${toolCall.toolName} not found`
          });
          continue;
        }

        // Execute the tool
        const result = await tool.execute(toolCall.args);
        
        results.push({
          toolName: toolCall.toolName,
          success: result.success !== false,
          result: result,
          type: result.type
        });

      } catch (error) {
        console.error(`Error executing tool ${toolCall.toolName}:`, error);
        results.push({
          toolName: toolCall.toolName,
          success: false,
          result: null,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return results;
  }

  public registerTool(name: string, toolDefinition: any): void {
    this.tools.set(name, toolDefinition);
  }

  public getTool(name: string): any {
    return this.tools.get(name);
  }

  public listAvailableTools(): string[] {
    return Array.from(this.tools.keys());
  }
} 