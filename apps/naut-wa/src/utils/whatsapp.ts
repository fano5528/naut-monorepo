interface WhatsAppMessage {
  to: string;
  type: string;
  text?: {
    body: string;
  };
  interactive?: {
    type: string;
    body: {
      text: string;
    };
    action: {
      buttons: Array<{
        type: string;
        reply: {
          id: string;
          title: string;
        };
      }>;
    };
  };
}

interface WhatsAppResponse {
  messaging_product: string;
  contacts?: Array<{
    input: string;
    wa_id: string;
  }>;
  messages?: Array<{
    id: string;
  }>;
}

interface WhatsAppError {
  error: {
    message: string;
    type: string;
    code: number;
    error_subcode?: number;
    fbtrace_id?: string;
  };
}

// Button interaction interface for our internal format
export interface ButtonInteraction {
  text: string;
  action: string;
  params?: any;
  style?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export class WhatsAppAPI {
  private accessToken: string;
  private phoneNumberId: string;
  private apiVersion: string = 'v23.0';
  private baseUrl: string = 'https://graph.facebook.com';

  constructor(accessToken: string, phoneNumberId: string) {
    if (!accessToken) {
      throw new Error('WhatsApp API access token is required');
    }
    if (!phoneNumberId) {
      throw new Error('WhatsApp phone number ID is required');
    }
    
    this.accessToken = accessToken;
    this.phoneNumberId = phoneNumberId;
  }

  /**
   * Send a text message to a WhatsApp user
   */
  async sendTextMessage(to: string, messageText: string): Promise<WhatsAppResponse> {
    const message: WhatsAppMessage = {
      to: to,
      type: 'text',
      text: {
        body: messageText
      }
    };

    return this.sendMessage(message);
  }

  /**
   * Send an interactive message with buttons to a WhatsApp user
   */
  async sendInteractiveMessage(
    to: string, 
    messageText: string, 
    buttons: ButtonInteraction[]
  ): Promise<WhatsAppResponse> {
    // Convert our internal button format to WhatsApp format
    const whatsappButtons = buttons.slice(0, 3).map((button, index) => ({
      type: "reply",
      reply: {
        id: `${button.action}_${index}`,
        title: button.text.length > 20 ? button.text.substring(0, 17) + "..." : button.text
      }
    }));

    console.log('🔄 Converting buttons to WhatsApp format:', {
      originalButtons: buttons,
      whatsappButtons: whatsappButtons
    });

    const message: WhatsAppMessage = {
      to: to,
      type: 'interactive',
      interactive: {
        type: "button",
        body: {
          text: messageText
        },
        action: {
          buttons: whatsappButtons
        }
      }
    };

    return this.sendMessage(message);
  }

  /**
   * Send a message with interactions - automatically chooses text or interactive format
   */
  async sendMessageWithInteractions(
    to: string, 
    messageText: string, 
    interactions: any[]
  ): Promise<WhatsAppResponse> {
    // Filter for button interactions
    const buttonInteractions = interactions
      .filter(interaction => interaction.type === 'button')
      .map(interaction => interaction.data as ButtonInteraction);

    // If we have buttons, send interactive message, otherwise send text
    if (buttonInteractions.length > 0) {
      return this.sendInteractiveMessage(to, messageText, buttonInteractions);
    } else {
      return this.sendTextMessage(to, messageText);
    }
  }

  /**
   * Send a message to WhatsApp API
   */
  private async sendMessage(message: WhatsAppMessage): Promise<WhatsAppResponse> {
    const url = `${this.baseUrl}/${this.apiVersion}/${this.phoneNumberId}/messages`;
    
    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      ...message
    };

    try {
      console.log('🚀 Sending WhatsApp message:', {
        to: message.to,
        type: message.type,
        url: url
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.text();
        let parsedError: WhatsAppError | null = null;
        
        try {
          parsedError = JSON.parse(errorData);
        } catch (e) {
          // Error data is not JSON, use as-is
        }

        // Check for token expiration specifically
        if (response.status === 401 || 
            (parsedError?.error?.code === 190) ||
            (parsedError?.error?.type === 'OAuthException' && 
             parsedError?.error?.message?.includes('access token'))) {
          
          console.error('🔐 WhatsApp Access Token Error:', {
            status: response.status,
            errorCode: parsedError?.error?.code,
            errorType: parsedError?.error?.type,
            message: parsedError?.error?.message,
            suggestion: 'Your WhatsApp access token has expired or is invalid. Please generate a new token from Meta App Dashboard.'
          });
          
          throw new Error(`WhatsApp API Authentication Error: ${parsedError?.error?.message || 'Invalid or expired access token'}. Please update your META_ACCESS_TOKEN in environment variables.`);
        }

        console.error('❌ WhatsApp API error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorData,
          parsedError: parsedError
        });
        
        throw new Error(`WhatsApp API error: ${response.status} ${response.statusText} - ${parsedError?.error?.message || errorData}`);
      }

      const responseData: WhatsAppResponse = await response.json();
      console.log('✅ WhatsApp message sent successfully:', responseData);
      
      return responseData;
    } catch (error) {
      console.error('❌ Failed to send WhatsApp message:', error);
      throw error;
    }
  }

  /**
   * Verify if the API is properly configured
   */
  async verifyConfiguration(): Promise<boolean> {
    try {
      const url = `${this.baseUrl}/${this.apiVersion}/${this.phoneNumberId}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      if (!response.ok && response.status === 401) {
        console.error('🔐 WhatsApp token verification failed - token may be expired or invalid');
        return false;
      }

      return response.ok;
    } catch (error) {
      console.error('❌ WhatsApp API configuration verification failed:', error);
      return false;
    }
  }

  /**
   * Check if the access token is still valid
   */
  async validateToken(): Promise<{ valid: boolean; error?: string }> {
    try {
      const url = `${this.baseUrl}/${this.apiVersion}/me`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      if (response.status === 401) {
        const errorData = await response.text();
        let parsedError: WhatsAppError | null = null;
        
        try {
          parsedError = JSON.parse(errorData);
        } catch (e) {
          // Error data is not JSON
        }

        return {
          valid: false,
          error: parsedError?.error?.message || 'Token is invalid or expired'
        };
      }

      return { valid: response.ok };
    } catch (error) {
      return { 
        valid: false, 
        error: error instanceof Error ? error.message : 'Unknown error validating token'
      };
    }
  }
}

/**
 * Create a singleton instance of WhatsApp API
 */
export const createWhatsAppAPI = (): WhatsAppAPI | null => {
  const accessToken = process.env.META_ACCESS_TOKEN;
  const phoneNumberId = process.env.META_PHONE_NUMBER_ID;

  if (!accessToken) {
    console.error('❌ META_ACCESS_TOKEN environment variable is not set');
    return null;
  }

  if (!phoneNumberId) {
    console.error('❌ META_PHONE_NUMBER_ID environment variable is not set');
    return null;
  }

  try {
    return new WhatsAppAPI(accessToken, phoneNumberId);
  } catch (error) {
    console.error('❌ Failed to create WhatsApp API instance:', error);
    return null;
  }
};

/**
 * Quick utility to check WhatsApp token status
 */
export const checkWhatsAppTokenStatus = async (): Promise<void> => {
  const whatsappAPI = createWhatsAppAPI();
  
  if (!whatsappAPI) {
    console.error('❌ Cannot create WhatsApp API instance - check environment variables');
    return;
  }

  console.log('🔍 Checking WhatsApp token status...');
  
  const tokenValidation = await whatsappAPI.validateToken();
  
  if (tokenValidation.valid) {
    console.log('✅ WhatsApp access token is valid');
    
    const configValid = await whatsappAPI.verifyConfiguration();
    if (configValid) {
      console.log('✅ WhatsApp configuration is valid');
    } else {
      console.log('⚠️ WhatsApp configuration may have issues');
    }
  } else {
    console.error('❌ WhatsApp access token is invalid or expired');
    console.error('📝 Error details:', tokenValidation.error);
    console.log('\n🔧 To fix this:');
    console.log('1. Go to https://developers.facebook.com/apps/');
    console.log('2. Navigate to your app → WhatsApp → API Setup');
    console.log('3. Generate a new access token');
    console.log('4. Update your META_ACCESS_TOKEN environment variable');
    console.log('5. Restart your application');
  }
}; 