import { ConversationState } from './StateManager';
import { LLMResponse } from './LLMClient';
import { ToolExecutionResult } from './ToolExecutor';

export interface InteractionElement {
  type: 'button' | 'image' | 'link' | 'gallery' | 'form' | 'preview';
  data: any;
}

export interface ButtonInteraction {
  text: string;
  action: string;
  params?: any;
  style?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export interface ImageInteraction {
  url: string;
  alt: string;
  caption?: string;
  thumbnail?: string;
}

export interface PreviewInteraction {
  title: string;
  url: string;
  screenshot?: string;
  description: string;
}

export class InteractionManager {
  private static instance: InteractionManager;

  private constructor() {}

  public static getInstance(): InteractionManager {
    if (!InteractionManager.instance) {
      InteractionManager.instance = new InteractionManager();
    }
    return InteractionManager.instance;
  }

  public createInteractions(
    llmResponse: LLMResponse,
    currentState: ConversationState,
    toolResults: ToolExecutionResult[]
  ): InteractionElement[] {
    const interactions: InteractionElement[] = [];

    // Create interactions based on current state
    const stateInteractions = this.createStateBasedInteractions(currentState);
    interactions.push(...stateInteractions);

    // Create interactions based on tool execution results
    const toolInteractions = this.createToolBasedInteractions(toolResults);
    interactions.push(...toolInteractions);

    // Create interactions based on LLM response content
    const contentInteractions = this.createContentBasedInteractions(llmResponse);
    interactions.push(...contentInteractions);

    return interactions;
  }

  private createStateBasedInteractions(state: ConversationState): InteractionElement[] {
    const interactions: InteractionElement[] = [];

    switch (state) {
      case ConversationState.GREETING:
        interactions.push({
          type: 'button',
          data: {
            text: '🚀 Crear mi sitio web',
            action: 'begin_site_creation',
            style: 'primary'
          } as ButtonInteraction
        });
        break;

      case ConversationState.BUSINESS_INFO:
        // Could add form interactions for business info collection
        break;

      case ConversationState.INITIAL_SITE_GENERATION:
        interactions.push({
          type: 'button',
          data: {
            text: '👀 Ver mi sitio',
            action: 'preview_site',
            style: 'primary'
          } as ButtonInteraction
        });
        break;

      case ConversationState.SITE_REFINEMENT:
        interactions.push(
          {
            type: 'button',
            data: {
              text: '🎨 Cambiar colores',
              action: 'refine_colors',
              style: 'secondary'
            } as ButtonInteraction
          },
          {
            type: 'button',
            data: {
              text: '✏️ Editar contenido',
              action: 'refine_content',
              style: 'secondary'
            } as ButtonInteraction
          },
          {
            type: 'button',
            data: {
              text: '🖼️ Cambiar imágenes',
              action: 'refine_images',
              style: 'secondary'
            } as ButtonInteraction
          },
          {
            type: 'button',
            data: {
              text: '✅ Publicar sitio',
              action: 'deploy_site',
              style: 'success'
            } as ButtonInteraction
          }
        );
        break;

      case ConversationState.DEPLOYMENT:
        interactions.push({
          type: 'button',
          data: {
            text: '🌐 Conectar dominio propio',
            action: 'connect_domain',
            style: 'primary'
          } as ButtonInteraction
        });
        break;

      case ConversationState.DOMAIN_CONNECTION:
        interactions.push(
          {
            type: 'button',
            data: {
              text: '💰 Comprar dominio nuevo',
              action: 'purchase_domain',
              style: 'primary'
            } as ButtonInteraction
          },
          {
            type: 'button',
            data: {
              text: '🔗 Conectar dominio existente',
              action: 'connect_existing_domain',
              style: 'secondary'
            } as ButtonInteraction
          }
        );
        break;

      case ConversationState.POST_LAUNCH_UPDATES:
        interactions.push(
          {
            type: 'button',
            data: {
              text: '📱 Compartir en WhatsApp',
              action: 'share_whatsapp',
              style: 'success'
            } as ButtonInteraction
          },
          {
            type: 'button',
            data: {
              text: '✏️ Hacer cambios',
              action: 'make_changes',
              style: 'secondary'
            } as ButtonInteraction
          }
        );
        break;
    }

    return interactions;
  }

  private createToolBasedInteractions(toolResults: ToolExecutionResult[]): InteractionElement[] {
    const interactions: InteractionElement[] = [];

    for (const result of toolResults) {
      if (!result.success) continue;

      switch (result.type) {
        case 'initial_site_generated':
          if (result.result.data?.domain) {
            interactions.push({
              type: 'preview',
              data: {
                title: 'Tu sitio web está listo!',
                url: `https://${result.result.data.domain}`,
                description: `Sitio generado en ${result.result.data.domain}`,
                screenshot: this.generateScreenshotUrl(result.result.data.domain)
              } as PreviewInteraction
            });
          }
          break;

        case 'site_deployed':
          if (result.result.data?.domain) {
            interactions.push({
              type: 'preview',
              data: {
                title: '🎉 Sitio publicado exitosamente!',
                url: `https://${result.result.data.domain}`,
                description: `Tu sitio está en vivo en ${result.result.data.domain}`,
                screenshot: this.generateScreenshotUrl(result.result.data.domain)
              } as PreviewInteraction
            });

            // Add WhatsApp share button
            interactions.push({
              type: 'button',
              data: {
                text: '📱 Compartir por WhatsApp',
                action: 'share_whatsapp',
                params: { url: `https://${result.result.data.domain}` },
                style: 'success'
              } as ButtonInteraction
            });
          }
          break;

        case 'site_refined':
          interactions.push({
            type: 'button',
            data: {
              text: '👀 Ver cambios',
              action: 'preview_changes',
              style: 'primary'
            } as ButtonInteraction
          });
          break;

        case 'domain_purchase_initiated':
          interactions.push({
            type: 'button',
            data: {
              text: '💳 Completar compra',
              action: 'complete_domain_purchase',
              params: { domain: result.result.data?.domain },
              style: 'primary'
            } as ButtonInteraction
          });
          break;
      }
    }

    return interactions;
  }

  private createContentBasedInteractions(llmResponse: LLMResponse): InteractionElement[] {
    const interactions: InteractionElement[] = [];

    // Look for URLs in the response text that could be made into previews
    const urlRegex = /https?:\/\/[^\s]+/g;
    const urls = llmResponse.text.match(urlRegex);

    if (urls) {
      urls.forEach(url => {
        if (url.includes('naut.mx') || url.includes('preview')) {
          interactions.push({
            type: 'preview',
            data: {
              title: 'Vista previa del sitio',
              url: url,
              description: 'Click para ver tu sitio web',
              screenshot: this.generateScreenshotUrl(url)
            } as PreviewInteraction
          });
        }
      });
    }

    return interactions;
  }

  private generateScreenshotUrl(domain: string): string {
    // Mock screenshot generation - in a real implementation, this would
    // generate actual screenshots of the website
    return `https://api.screenshotmachine.com/?key=demo&url=${encodeURIComponent(domain)}&dimension=1024x768`;
  }

  public createWhatsAppShareLink(url: string, message?: string): string {
    const shareText = message || `¡Mira mi nuevo sitio web! ${url}`;
    return `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  }

  public formatInteractionsForResponse(interactions: InteractionElement[]): any[] {
    return interactions.map(interaction => ({
      type: interaction.type,
      ...interaction.data
    }));
  }

  public validateInteraction(interaction: InteractionElement): boolean {
    if (!interaction.type || !interaction.data) {
      return false;
    }

    switch (interaction.type) {
      case 'button':
        const buttonData = interaction.data as ButtonInteraction;
        return !!(buttonData.text && buttonData.action);

      case 'preview':
        const previewData = interaction.data as PreviewInteraction;
        return !!(previewData.title && previewData.url);

      case 'image':
        const imageData = interaction.data as ImageInteraction;
        return !!(imageData.url && imageData.alt);

      default:
        return true;
    }
  }
} 