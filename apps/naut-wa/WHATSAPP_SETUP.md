# WhatsApp Integration Setup Guide

This guide will help you set up WhatsApp messaging integration with your Naut-WA API. The system is **fully operational** with complete WhatsApp Business API integration.

## Prerequisites

1. A Meta Business Account
2. A WhatsApp Business Account  
3. A Meta App with WhatsApp Business API access
4. A deployed Naut-WA instance (Vercel recommended)

## Step 1: Create Meta App and Get Credentials

1. Go to [Meta App Dashboard](https://developers.facebook.com/apps/)
2. Create a new app of type "Business"
3. Add WhatsApp product to your app
4. Navigate to WhatsApp > API Setup

From the API Setup page, copy these values:

- **Access Token** (Temporary or Permanent - see Production section)
- **Phone Number ID** 
- **Webhook Verify Token** (you choose this)

## Step 2: Configure Environment Variables

Create a `.env` file in your project root with:

```env
# WhatsApp API Configuration
META_ACCESS_TOKEN=your_access_token_here
META_PHONE_NUMBER_ID=your_phone_number_id_here
META_TOKEN=your_webhook_verify_token_here

# Required for full functionality
OPENAI_API_KEY=your_openai_api_key_here
POSTGRES_URL=your_postgres_connection_string

# Optional
PORT=3010
```

## Step 3: Configure Webhook in Meta App Dashboard

1. In your Meta App Dashboard, go to WhatsApp > Configuration
2. Click "Edit" in the Webhooks section
3. Set your webhook URL to: `https://your-domain.com/message`
4. Set the verify token to match your `META_TOKEN` value
5. Subscribe to webhook fields:
   - ✅ `messages` (required)
   - ✅ `messaging_postbacks` (recommended)
   - ✅ `messaging_optins` (recommended)
   - ✅ `message_deliveries` (for delivery status)
   - ✅ `message_reads` (for read receipts)

## Step 4: Test Your Integration

### Check Configuration Status
```bash
curl https://your-domain.com/message/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Message handler is healthy",
  "whatsapp": {
    "configured": true,
    "api_accessible": true,
    "access_token": true,
    "phone_number_id": true
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Test Manual Message Sending
```bash
curl -X POST https://your-domain.com/message/test-whatsapp \
  -H "Content-Type: application/json" \
  -d '{
    "to": "1234567890",
    "message": "Hello from Naut-WA! 🚀"
  }'
```

### Test Interactive Messages
```bash
curl -X POST https://your-domain.com/message/test-whatsapp-interactive \
  -H "Content-Type: application/json" \
  -d '{
    "to": "1234567890", 
    "message": "Welcome to Naut! Choose an option:",
    "buttons": [
      {
        "text": "🚀 Create Website",
        "action": "begin_site_creation",
        "style": "primary"
      }
    ]
  }'
```

## Step 5: Webhook Verification

When you save your webhook configuration in Meta App Dashboard, Meta will verify your webhook by:

1. Sending a GET request to your webhook URL
2. Including verification parameters in the query string
3. Expecting your webhook to return the challenge parameter

The verification is **automatically handled** by the `/message` endpoint - no additional setup required.

## How It Works

### Message Flow
1. **Incoming Messages**: When users send messages to your WhatsApp Business number, Meta sends webhook notifications to your `/message` endpoint
2. **Message Processing**: The system processes messages through the complete AI pipeline:
   - State management (greeting → business_info → site_generation → refinement → deployment)
   - Context building from conversation history
   - AI response generation with GPT-4o-mini
   - Tool execution (site creation, refinement, deployment)
   - Interactive button generation
3. **Response Sending**: AI responses are automatically sent back to the user via WhatsApp API with appropriate interactive elements

### Conversation States
The system manages a sophisticated conversation flow:

1. **Greeting** - Welcome and company introduction
2. **Business Info** - Collect business name and type
3. **Site Generation** - Create initial website
4. **Refinement** - Iterative improvements (colors, content, images)
5. **Deployment** - Publish to Naut subdomain  
6. **Domain Connection** - Custom domain setup
7. **Post-Launch** - Ongoing support and sharing

## Supported Message Types

### ✅ Fully Supported
- **Text messages** - Natural language conversation in Spanish
- **Interactive button messages** - Dynamic buttons based on conversation state
- **Button interactions** - Seamless button click handling with tool execution
- **State persistence** - Conversation state maintained across sessions
- **Error handling** - Graceful error responses in Spanish

### 🔄 Planned
- **Media messages** (images, documents) - Schema ready, implementation pending
- **Template messages** - For marketing and notifications
- **List messages** - For complex option selection
- **Location messages** - For business location features

## Current Interactive Features

### Dynamic Buttons by State
- **Greeting**: "🚀 Crear mi sitio web"
- **Refinement**: "🎨 Cambiar colores", "✏️ Editar contenido", "🖼️ Cambiar imágenes", "✅ Publicar sitio"
- **Deployment**: "🌐 Conectar dominio propio"
- **Domain**: "💰 Comprar dominio nuevo", "🔗 Conectar dominio existente"
- **Post-Launch**: "📱 Compartir en WhatsApp", "✏️ Hacer cambios"

### Automatic Features
- **Language**: Spanish prompts with Mexican tone and emojis
- **Context**: Conversation history maintained with smart token management
- **Cost Tracking**: Token usage and cost calculation per interaction
- **Error Recovery**: Automatic fallbacks and user-friendly error messages

## Troubleshooting

### Common Issues

1. **Webhook Verification Failed**
   - Check that `META_TOKEN` environment variable matches the verify token in your app
   - Ensure your webhook URL is accessible: `https://your-domain.com/message`
   - Verify the endpoint returns proper responses for GET requests

2. **Messages Not Sending**
   - Verify `META_ACCESS_TOKEN` is valid and has proper permissions
   - Check `META_PHONE_NUMBER_ID` matches your WhatsApp Business phone number
   - Check server logs for detailed error messages
   - Test using the health endpoint: `/message/health`

3. **Webhook Not Receiving Messages**
   - Confirm webhook URL is correctly configured in Meta App Dashboard
   - Test webhook endpoint accessibility with external tools
   - Check webhook field subscriptions (especially "messages")
   - Verify webhook is active and not paused

4. **Token Expiration**
   - Temporary tokens expire after 24 hours - use permanent tokens for production
   - The system automatically detects token expiration and provides clear error messages
   - Monitor token status using `/message/health` endpoint

### Debug Endpoints

- `GET /message/health` - WhatsApp API configuration and connectivity status
- `POST /message/test-whatsapp` - Test basic message sending
- `POST /message/test-whatsapp-interactive` - Test interactive button messages
- `GET /health` - General API health check

### Logs and Monitoring

The system provides comprehensive logging:
- **Request/Response logging** for all WhatsApp API calls
- **Error tracking** with detailed context and suggestions
- **Performance metrics** including token usage and response times
- **State transitions** and tool execution results

## Security & Production Considerations

### Token Security
- **Never commit tokens** to version control
- **Use permanent tokens** for production (not temporary ones)
- **Rotate tokens regularly** as per Meta's security guidelines
- **Monitor token usage** and set up alerts for unusual activity

### Rate Limiting
- **WhatsApp API limits**: 80 messages per second (varies by tier)
- **Built-in error handling** for rate limit responses
- **Consider implementing queues** for high-volume scenarios

### Webhook Security
- **HTTPS required** - Meta only sends webhooks to HTTPS endpoints  
- **Webhook signature validation** - Consider implementing for enhanced security
- **IP whitelisting** - Restrict webhook access to Meta's IP ranges

### Production Checklist

1. **Environment Variables**
   - ✅ All required variables set
   - ✅ Permanent access token (not temporary)
   - ✅ Secure token storage

2. **Webhook Configuration**
   - ✅ HTTPS webhook URL configured
   - ✅ Correct verify token
   - ✅ Required fields subscribed

3. **Monitoring**
   - ✅ Health check endpoints accessible
   - ✅ Logging configured
   - ✅ Error alerting set up

4. **Testing**
   - ✅ Manual message sending works
   - ✅ Interactive messages work
   - ✅ Conversation flow tested end-to-end
   - ✅ Error scenarios tested

## Advanced Configuration

### Custom Domain Setup
If using a custom domain for your webhook:
```env
# Your webhook URL will be:
# https://your-custom-domain.com/message
```

### Environment-Specific Configuration
```env
# Development
META_TOKEN=dev_verify_token
META_ACCESS_TOKEN=temporary_token_for_testing

# Production  
META_TOKEN=prod_verify_token_secure
META_ACCESS_TOKEN=permanent_token_secure
```

### Multiple Phone Numbers
To use multiple WhatsApp Business numbers:
1. Configure additional phone number IDs in Meta App Dashboard
2. Update `META_PHONE_NUMBER_ID` or implement dynamic selection
3. Test each phone number independently

## Support and Resources

### Meta Resources
- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp)
- [Meta App Dashboard](https://developers.facebook.com/apps/)
- [WhatsApp Business Manager](https://business.facebook.com/whatsapp)

### Naut-WA Resources
- **API Documentation**: `GET /` endpoint provides full API reference
- **Health Monitoring**: Use health endpoints for system status
- **Logs**: Check application logs for detailed debugging information

### Getting Help
If you encounter issues:
1. Check the troubleshooting section above
2. Test using the debug endpoints
3. Review application logs for error details
4. Verify your Meta App configuration
5. Test with the simplest possible setup first

---

**Note**: This integration is production-ready and actively handles WhatsApp messages with sophisticated AI-powered conversation management. The system is designed to scale and handle real user interactions effectively. 