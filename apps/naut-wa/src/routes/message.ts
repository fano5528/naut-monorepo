// Libraries imports
import express from "express";
import dotenv from "dotenv";

// Core modules imports
import { MessageHandler } from "../core/MessageHandler";
import { UserMessage } from "../core/MessageHandler";
import { createWhatsAppAPI } from "../utils/whatsapp";

// Initializations
dotenv.config();
const router = express.Router();
const messageHandler = MessageHandler.getInstance();
const whatsappAPI = createWhatsAppAPI();

// Helper function to handle interactive messages from WhatsApp
const handleInteractiveMessage = (message: any): { text: string; buttonAction?: string } => {
  if (message.interactive?.type === 'button_reply') {
    const buttonId = message.interactive.button_reply.id;
    const buttonTitle = message.interactive.button_reply.title;
    
    // Extract the action from the button ID (format: action_index)
    const actionMatch = buttonId.match(/^(.+)_\d+$/);
    const action = actionMatch ? actionMatch[1] : buttonId;
    
    return {
      text: `[Button clicked: ${buttonTitle}]`,
      buttonAction: action
    };
  }
  return { text: '[Interactive message]' };
};

// Webhook verification route (GET)
router.get("/", (req, res) => {
  try {
    // Extract verification parameters from query
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    console.log('Webhook verification attempt:', { mode, token: token ? '***' : 'missing', challenge: challenge ? 'received' : 'missing' });

    // Check if this is a verification request
    if (mode === 'subscribe') {
      // Verify the token matches our META_TOKEN
      if (token === process.env.META_TOKEN) {
        console.log('✅ Webhook verification successful');
        // Return the challenge to complete verification
        res.status(200).send(challenge);
        return;
      } else {
        console.log('❌ Webhook verification failed: Invalid token');
        res.status(403).json({
          success: false,
          error: {
            code: 'FORBIDDEN',
            message: 'Invalid verify token'
          }
        });
        return;
      }
    }

    // If not a verification request, return error
    console.log('❌ Invalid webhook request: Missing or invalid mode');
    res.status(400).json({
      success: false,
      error: {
        code: 'BAD_REQUEST',
        message: 'Invalid webhook request'
      }
    });

  } catch (error) {
    console.error('Error in webhook verification:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Webhook verification failed'
      }
    });
  }
});

// Main message receiving route (POST)
router.post("/", async (req, res) => {
  try {
    // Check if this is a WhatsApp webhook notification
    if (req.body.object === 'whatsapp_business_account') {
      console.log('📨 Received WhatsApp webhook notification');
      
      // Handle WhatsApp webhook event
      const { entry } = req.body;
      
      if (entry && entry.length > 0) {
        for (const entryItem of entry) {
          if (entryItem.changes) {
            for (const change of entryItem.changes) {
              if (change.field === 'messages' && change.value.messages) {
                // Process each message
                for (const message of change.value.messages) {
                  console.log('📱 Processing WhatsApp message:', {
                    from: message.from,
                    type: message.type,
                    timestamp: message.timestamp
                  });

                  // Handle different message types
                  let messageText: string;
                  let buttonAction: string | undefined;
                  
                  if (message.type === 'text') {
                    messageText = message.text.body;
                  } else if (message.type === 'interactive') {
                    const interactiveResult = handleInteractiveMessage(message);
                    messageText = interactiveResult.text;
                    buttonAction = interactiveResult.buttonAction;
                  } else {
                    messageText = `[${message.type} message]`;
                  }

                  // Create user message object for WhatsApp
                  const userMessage: UserMessage = {
                    userId: message.from,
                    message: messageText,
                    buttonAction: buttonAction, // Pass button action for processing
                  };

                  // Handle message using the new architecture
                  const response = await messageHandler.handleMessage(userMessage);
                  
                  // Send response back to WhatsApp user
                  if (whatsappAPI && response.aiResponse.text) {
                    try {
                      await whatsappAPI.sendMessageWithInteractions(
                        message.from, 
                        response.aiResponse.text, 
                        response.aiResponse.interactions || []
                      );
                      console.log('✅ Response sent to WhatsApp user:', message.from);
                    } catch (error) {
                      console.error('❌ Failed to send WhatsApp response:', error);
                    }
                  } else {
                    console.log('⚠️ WhatsApp API not configured or no response text to send');
                  }
                  
                  console.log('🤖 Generated response for WhatsApp:', response);
                }
              }
            }
          }
        }
      }

      // Always respond with 200 to acknowledge receipt
      res.status(200).send('EVENT_RECEIVED');
      return;
    }

    // Handle regular API messages (non-WhatsApp)
    const { userId, message: messageReceived } = req.body;

    // Validate required fields
    if (!userId || !messageReceived) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_FIELDS',
          message: 'userId and message are required'
        }
      });
    }

    // Create user message object
    const userMessage: UserMessage = {
      userId,
      message: messageReceived,
    };

    // Handle message using the new architecture
    const response = await messageHandler.handleMessage(userMessage);

    // Send structured response
    res.json({
      success: true,
      data: response,
      timestamp: new Date(),
    });

  } catch (error) {
    console.error('Error in message route:', error);
    
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred while processing your message',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      timestamp: new Date(),
    });
  }
});

// Health check endpoint
router.get("/health", async (req, res) => {
  const whatsappStatus = whatsappAPI ? await whatsappAPI.verifyConfiguration() : false;
  
  res.json({
    success: true,
    message: "Message handler is healthy",
    whatsapp: {
      configured: !!whatsappAPI,
      api_accessible: whatsappStatus,
      access_token: !!process.env.META_ACCESS_TOKEN,
      phone_number_id: !!process.env.META_PHONE_NUMBER_ID
    },
    timestamp: new Date(),
  });
});

// Test WhatsApp message sending endpoint
router.post("/test-whatsapp", async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_FIELDS',
          message: 'to and message are required'
        }
      });
    }

    if (!whatsappAPI) {
      return res.status(500).json({
        success: false,
        error: {
          code: 'WHATSAPP_NOT_CONFIGURED',
          message: 'WhatsApp API is not properly configured'
        }
      });
    }

    const result = await whatsappAPI.sendTextMessage(to, message);
    
    res.json({
      success: true,
      data: result,
      timestamp: new Date(),
    });

  } catch (error) {
    console.error('Error in test WhatsApp endpoint:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'WHATSAPP_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      timestamp: new Date(),
    });
  }
});

// Test WhatsApp interactive message endpoint
router.post("/test-whatsapp-interactive", async (req, res) => {
  try {
    const { to, message, buttons } = req.body;

    if (!to || !message) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_FIELDS',
          message: 'to and message are required'
        }
      });
    }

    if (!whatsappAPI) {
      return res.status(500).json({
        success: false,
        error: {
          code: 'WHATSAPP_NOT_CONFIGURED',
          message: 'WhatsApp API is not properly configured'
        }
      });
    }

    // Create sample interactions if none provided
    const testInteractions = buttons || [
      {
        type: 'button',
        data: {
          text: '🚀 Crear mi sitio web',
          action: 'begin_site_creation',
          style: 'primary'
        }
      }
    ];

    const result = await whatsappAPI.sendMessageWithInteractions(to, message, testInteractions);
    
    res.json({
      success: true,
      data: result,
      timestamp: new Date(),
    });

  } catch (error) {
    console.error('Error in test WhatsApp interactive endpoint:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'WHATSAPP_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      timestamp: new Date(),
    });
  }
});

// Export router
export default router;