# Naut-WA: AI-Powered Website Creation Assistant

---

## Overview

**Naut-WA** is an Express.js backend application that powers Naut's conversational AI agent. This agent empowers business owners and employees to create, refine, and deploy websites through natural language interactions via WhatsApp and direct API calls. Leveraging a modular architecture built with TypeScript, Naut-WA handles stateful conversations, AI-driven content generation, and integrates with Meta's WhatsApp Business API.

---

## Current Architecture

Naut-WA is implemented with a clean modular architecture using singleton patterns and clear separation of concerns. The system is fully operational with WhatsApp integration and comprehensive state management.

### Core Modules (Implemented)

| Module Name          | Responsibility                                                                                     | Status |
|----------------------|--------------------------------------------------------------------------------------------------|--------|
| **MessageHandler**   | Main orchestrator - handles incoming messages, persists conversations, coordinates all other modules, and returns structured responses | ✅ Complete |
| **StateManager**     | Manages conversation states and valid transitions between them (greeting → business_info → site_generation → refinement → deployment → domain_connection → post_launch) | ✅ Complete |
| **ContextManager**   | Retrieves and formats conversation history, handles token limits, generates summaries for long conversations | ✅ Complete |
| **LLMClient**        | Wraps AI SDK with OpenAI integration, handles message formatting, tool calling, and usage tracking | ✅ Complete |
| **ToolExecutor**     | Implements business tools (site generation, refinement, deployment, domain connection) with state-based availability | ✅ Complete |
| **InteractionManager** | Creates rich interactive UI elements (buttons, previews, links) based on state and tool results | ✅ Complete |
| **PromptManager**    | Manages state-specific Spanish prompts with Mexican tone and context for each conversation stage | ✅ Complete |

### Supporting Infrastructure

| Component            | Responsibility                                                                                     | Status |
|----------------------|--------------------------------------------------------------------------------------------------|--------|
| **WhatsApp API**     | Full WhatsApp Business API integration with webhook handling, message sending, and interactive buttons | ✅ Complete |
| **Database Layer**   | PostgreSQL with Drizzle ORM - handles users, messages, conversation state, and full CMS schema | ✅ Complete |
| **Express Server**   | API endpoints for messages, health checks, WhatsApp webhook, and testing | ✅ Complete |
| **Vercel Deployment** | Serverless deployment configuration with environment variable management | ✅ Complete |

---

## Database Schema

The application uses PostgreSQL with Drizzle ORM and includes:

### Core Tables (Active)
- **User**: Stores user IDs, conversation state, and Stripe customer IDs
- **Message**: Conversation history with role, content, timestamps, and token usage

### CMS Tables (Available)
- **Site**: Complete site management with domains, colors, fonts, and deployment info
- **Page**: Individual pages with routes, titles, descriptions, and layout options
- **Component/Block/Content**: Flexible content management system
- **Image**: User-uploaded image management
- **CMS Types/Entries/Fields**: Advanced content type system

---

## Conversation Flow & State Management

The system implements a sophisticated state machine with 7 defined states:

1. **GREETING** (`greeting`) – Welcome users, answer questions about Naut, offer site creation button
2. **BUSINESS_INFO** (`business_info`) – Collect business name, type, and description
3. **INITIAL_SITE_GENERATION** (`initial_site_generation`) – Generate first site version with AI
4. **SITE_REFINEMENT** (`site_refinement`) – Iterative refinement of colors, content, images (5 free refinements)
5. **DEPLOYMENT** (`deployment`) – Deploy to Naut subdomain (e.g., business.naut.mx)
6. **DOMAIN_CONNECTION** (`domain_connection`) – Purchase new domain or connect existing one
7. **POST_LAUNCH_UPDATES** (`post_launch_updates`) – Ongoing site management and WhatsApp sharing

### State Transitions
- Linear progression through states with validation
- Refinement state allows staying for multiple iterations
- Post-launch can return to refinement for updates

---

## WhatsApp Integration

### Full WhatsApp Business API Support
- ✅ **Webhook Verification**: Automatic Meta webhook verification
- ✅ **Message Receiving**: Handles text and interactive messages
- ✅ **Message Sending**: Text and interactive button messages
- ✅ **Button Interactions**: Maps button clicks to tool executions
- ✅ **Error Handling**: Token validation and comprehensive error management

### Interactive Features
- Dynamic button generation based on conversation state
- Automatic message format detection (text vs interactive)
- WhatsApp sharing functionality for completed sites
- Professional message formatting in Spanish

---

## API Endpoints

### Main Endpoints
- `POST /message` - Process user messages (API) and WhatsApp webhooks
- `GET /message` - WhatsApp webhook verification
- `GET /message/health` - WhatsApp configuration and API health check
- `POST /message/test-whatsapp` - Manual WhatsApp message testing
- `POST /message/test-whatsapp-interactive` - Interactive message testing
- `GET /health` - General API health check
- `GET /` - API documentation

### Response Format
```json
{
  "success": true,
  "data": {
    "userMessage": "Hola, quiero crear un sitio web",
    "aiResponse": {
      "text": "¡Hola! 👋 Soy tu asistente de Naut...",
      "interactions": [
        {
          "type": "button",
          "data": {
            "text": "🚀 Crear mi sitio web",
            "action": "begin_site_creation",
            "style": "primary"
          }
        }
      ],
      "state": "greeting",
      "toolCalls": []
    },
    "cost": {
      "inputTokens": 0.00015,
      "outputTokens": 0.0006,
      "total": 0.00075
    }
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## Technology Stack

### Backend
- **Express.js** (v5.1.0) - Web framework
- **TypeScript** - Type safety and development experience
- **AI SDK** (@ai-sdk/openai) - OpenAI integration with tool calling
- **Drizzle ORM** - Type-safe database operations
- **PostgreSQL** (@vercel/postgres) - Database

### AI & Integration
- **OpenAI GPT-4o-mini** - Language model for conversations
- **Meta WhatsApp Business API** - WhatsApp integration
- **Zod** - Runtime type validation

### Deployment
- **Vercel** - Serverless deployment
- **Environment Variables** - Secure configuration management

---

## Environment Variables

```env
# Database
POSTGRES_URL=your_postgres_connection_string

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# WhatsApp (Meta Business API)
META_ACCESS_TOKEN=your_whatsapp_access_token
META_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
META_TOKEN=your_webhook_verify_token

# Server
PORT=3010
```

---

## Getting Started

### 1. Clone and Install
```bash
git clone [repository-url]
cd naut-wa
npm install
```

### 2. Environment Setup
- Copy environment variables (see Environment Variables section)
- Set up PostgreSQL database
- Configure Meta WhatsApp Business App

### 3. Database Setup
```bash
npm run db:migrate
```

### 4. Development
```bash
npm run dev  # Start development server
npm run build  # Build for production
npm start  # Start production server
```

### 5. WhatsApp Setup
- Configure webhook URL: `https://your-domain.com/message`
- Set verify token to match `META_TOKEN`
- Subscribe to message webhook fields

---

## Key Features

### ✅ Implemented
- Complete WhatsApp Business API integration
- Stateful conversation management in Spanish
- AI-powered site generation and refinement
- Interactive button-based UI
- Comprehensive error handling and logging
- Token usage tracking and cost calculation
- Database persistence with conversation history
- Serverless deployment ready

### 🔄 Planned (Based on Database Schema)
- Full CMS content management
- Image upload and management
- Advanced site customization
- Multi-user site collaboration
- Analytics integration
- Payment processing (Stripe)

---

## Development Notes

### Architecture Benefits
- **Singleton Pattern**: Ensures single instances of core modules
- **Type Safety**: Full TypeScript coverage with strict typing
- **Modular Design**: Easy to extend and maintain
- **Error Resilience**: Comprehensive error handling throughout
- **Testing Ready**: Clean interfaces suitable for unit testing

### Code Quality
- Consistent Spanish prompts with Mexican tone
- Comprehensive logging for debugging
- Clean separation between WhatsApp and API logic
- Efficient database queries with Drizzle ORM
- Modern async/await patterns throughout

---

## Contributing

1. Follow TypeScript best practices
2. Maintain the singleton pattern for core modules
3. Add comprehensive error handling
4. Write tests for new features
5. Update documentation for changes

---

## License

[Specify your license here]

---

*Built with ❤️ for Naut — Empowering Mexican businesses with AI-driven web presence.*
