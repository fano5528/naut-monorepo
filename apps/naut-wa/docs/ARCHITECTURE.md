# Naut-WA Architecture Implementation

This document describes the current implementation of the modular architecture for Naut-WA, as deployed and operational.

## Architecture Overview

The system is implemented with a clean separation of concerns using singleton design patterns and the following core modules:

```
src/
├── core/                    # Core business logic modules (All Implemented)
│   ├── MessageHandler.ts    # Main orchestrator - handles complete message flow
│   ├── StateManager.ts      # Manages 7 conversation states and transitions
│   ├── ContextManager.ts    # Builds context from conversation history
│   ├── LLMClient.ts         # AI SDK integration with OpenAI GPT-4o-mini
│   ├── ToolExecutor.ts      # Executes 6 backend tools with state-based availability
│   └── InteractionManager.ts # Creates rich UI interactions (buttons, previews)
├── prompts/                 # Spanish prompts with Mexican tone
│   └── PromptManager.ts     # State-specific prompt management
├── tools/                   # Tool definitions and interfaces
│   └── index.ts             # Tool type definitions (individual tools in ToolExecutor)
├── utils/                   # Utilities and WhatsApp integration
│   ├── index.ts             # Common utility functions
│   └── whatsapp.ts          # Complete WhatsApp Business API integration
├── db/                      # Database layer
│   ├── index.ts             # Drizzle ORM setup with PostgreSQL
│   └── schema.ts            # Complete schema (User, Message, CMS tables)
└── routes/                  # API routes
    └── message.ts           # Main route with WhatsApp webhook support
```

## Current Implementation Status

### ✅ Fully Operational Modules

### 1. MessageHandler (Main Orchestrator)
**Primary responsibility**: Coordinates the entire message processing pipeline

Key features:
- Singleton pattern implementation
- Handles both API and WhatsApp webhook messages
- Manages user creation and message persistence
- Orchestrates context building, LLM calls, tool execution
- Handles button actions directly (bypassing LLM for efficiency)
- Returns structured responses with cost tracking

```typescript
export interface MessageHandlerResponse {
  userMessage: string;
  aiResponse: AIResponse;
  cost?: {
    inputTokens: number;
    outputTokens: number;
    total: number;
  };
}
```

### 2. StateManager (Conversation States)
**Current states implemented**:
```typescript
enum ConversationState {
  GREETING = 'greeting',
  BUSINESS_INFO = 'business_info', 
  INITIAL_SITE_GENERATION = 'initial_site_generation',
  SITE_REFINEMENT = 'site_refinement',
  DEPLOYMENT = 'deployment',
  DOMAIN_CONNECTION = 'domain_connection',
  POST_LAUNCH_UPDATES = 'post_launch_updates'
}
```

**Transition rules**:
- Linear progression with validation
- Refinement allows staying in same state
- Post-launch can return to refinement

### 3. LLMClient (AI Integration)
**Implementation details**:
- Uses AI SDK (@ai-sdk/openai) with GPT-4o-mini
- Supports tool calling with up to 10 steps
- Temperature: 0.7 for creative but controlled responses
- Token usage tracking and cost calculation
- Comprehensive error handling

### 4. ToolExecutor (Business Logic)
**Implemented tools**:
1. `beginButton` - Start site creation process
2. `collectBusinessInfo` - Gather business details
3. `generateInitialSite` - Create first site version
4. `refineSite` - Modify colors, content, images
5. `deploySite` - Deploy to Naut subdomain
6. `connectDomain` - Purchase or connect custom domain

**State-based tool availability**:
- Each state has specific tools available
- Tools are implemented with Zod schema validation
- Results include success status and structured data

### 5. InteractionManager (UI Elements)
**Creates dynamic interactions**:
- State-based buttons (e.g., "🚀 Crear mi sitio web")
- Tool result interactions (site previews, links)
- Content-based interactions (URL detection)
- WhatsApp sharing functionality

### 6. ContextManager (Conversation History)
**Features**:
- Retrieves up to 20 recent messages
- Token-based context trimming (8000 token limit)
- Automatic conversation summaries for long histories
- Chronological message ordering

### 7. PromptManager (Spanish Prompts)
**Characteristics**:
- Mexican Spanish tone with emojis
- State-specific prompts for each conversation stage
- Naut company information and service description
- Limitations clearly communicated (5 refinements, subdomain only)

## WhatsApp Integration Architecture

### WhatsAppAPI Class
**Complete implementation**:
- Webhook verification for Meta App Dashboard
- Text and interactive message sending
- Button interaction handling
- Token validation and error management
- Automatic format detection (text vs interactive)

### Message Flow for WhatsApp
```
1. WhatsApp webhook → Express /message endpoint
2. Webhook verification or message processing
3. Extract message content and user ID (phone number)
4. Handle interactive button clicks → direct tool execution
5. MessageHandler processes through full pipeline
6. WhatsApp API sends response with interactions
7. Webhook acknowledges with 200 status
```

## Database Architecture

### Active Tables
```sql
-- Core conversation management
User (id, conversationState, stripeCustomerId)
Message (id, message, role, userId, date, inputTokens, outputTokens)

-- Complete CMS schema available but not actively used yet
Site, Page, Component, Block, Content, Field
Image, HeaderContent, FooterContent
cmsType, cmsEntry, cmsField, cmsCategory, etc.
```

### Database Features
- PostgreSQL with Vercel Postgres integration
- Drizzle ORM with full type safety
- Automatic conversation state persistence
- Token usage tracking per message
- Comprehensive foreign key relationships

## API Architecture

### Main Routes
- `POST /message` - Handles both API calls and WhatsApp webhooks
- `GET /message` - WhatsApp webhook verification
- `GET /message/health` - WhatsApp and API health check
- `POST /message/test-whatsapp` - Testing endpoints
- `GET /health` - General API health
- `GET /` - API documentation

### Response Format
All responses follow consistent structure:
```json
{
  "success": boolean,
  "data": {
    "userMessage": string,
    "aiResponse": {
      "text": string,
      "interactions": InteractionElement[],
      "state": ConversationState,
      "toolCalls": ToolCall[]
    },
    "cost": { inputTokens, outputTokens, total }
  },
  "timestamp": Date
}
```

## Environment Configuration

### Required Variables
```env
# Database
POSTGRES_URL=your_postgres_connection_string

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# WhatsApp Business API
META_ACCESS_TOKEN=your_whatsapp_access_token
META_PHONE_NUMBER_ID=your_whatsapp_phone_number_id  
META_TOKEN=your_webhook_verify_token

# Server
PORT=3010
```

## Deployment Architecture

### Vercel Configuration
```json
{
  "version": 2,
  "builds": [{ "src": "src/index.ts", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "src/index.ts" }]
}
```

### Features
- Serverless deployment with auto-scaling
- Environment variable management
- Automatic HTTPS and CDN
- Global edge network

## Key Design Patterns

### 1. Singleton Pattern
All core modules use singleton pattern for:
- Memory efficiency
- Consistent state management
- Easy dependency injection
- Testing isolation

### 2. Pipeline Architecture
Message processing follows clear pipeline:
```
Input → Validation → Context → LLM → Tools → Interactions → Output
```

### 3. State Machine
Conversation flow managed by finite state machine:
- Well-defined states and transitions
- State-specific prompts and tools
- Validation of state changes
- Recovery from invalid states

### 4. Factory Pattern
Tool and interaction creation use factory patterns:
- Dynamic tool availability based on state
- Automatic interaction generation
- Extensible tool registration

## Performance Characteristics

### Efficiency Features
- Button actions bypass LLM (instant response)
- Context trimming prevents token overflow
- Singleton pattern reduces memory usage
- Efficient database queries with Drizzle ORM

### Scalability
- Serverless architecture scales automatically
- Stateless request handling
- Database connection pooling
- Async/await throughout for non-blocking operations

## Error Handling

### Comprehensive Coverage
- WhatsApp API errors with token validation
- Database connection failures
- LLM API failures with fallbacks
- Tool execution errors
- State transition validation
- Input validation with Zod schemas

### User Experience
- Graceful degradation on errors
- Informative error messages in Spanish
- Automatic retry mechanisms
- Logging for debugging

## Security Considerations

### WhatsApp Security
- Webhook verification with secure tokens
- Message signature validation
- Access token management
- Rate limiting considerations

### General Security
- Environment variable management
- SQL injection prevention (Drizzle ORM)
- Input sanitization
- CORS configuration

## Monitoring and Observability

### Logging
- Comprehensive console logging
- Request/response logging
- Error tracking with context
- Performance metrics

### Health Checks
- API health endpoint
- WhatsApp configuration validation
- Database connectivity checks
- Token validation status

## Extension Points

### Adding New States
1. Add to ConversationState enum
2. Define transitions in StateManager
3. Create prompt in PromptManager
4. Add interactions in InteractionManager
5. Define available tools in ToolExecutor

### Adding New Tools
1. Implement in ToolExecutor.initializeTools()
2. Add to state mapping in getAvailableTools()
3. Handle results in InteractionManager
4. Add button mappings if needed

### Adding New Interactions
1. Define interface in InteractionManager
2. Add creation logic in createInteractions()
3. Add WhatsApp formatting if needed
4. Add validation logic

## Benefits of Current Architecture

1. **Production Ready**: Fully operational with WhatsApp integration
2. **Type Safe**: Complete TypeScript coverage with runtime validation
3. **Maintainable**: Clear separation of concerns and consistent patterns
4. **Scalable**: Serverless architecture with efficient resource usage
5. **Extensible**: Well-defined interfaces for adding features
6. **Reliable**: Comprehensive error handling and graceful degradation
7. **Observable**: Extensive logging and health monitoring
8. **Secure**: Proper authentication and input validation

## Next Steps for Enhancement

1. **CMS Integration**: Activate full CMS functionality using existing schema
2. **Image Management**: Implement image upload and processing
3. **Advanced Analytics**: Add user behavior tracking
4. **Payment Integration**: Activate Stripe integration
5. **Multi-language**: Extend beyond Spanish
6. **Advanced AI**: Implement more sophisticated conversation flows
7. **Testing**: Add comprehensive unit and integration tests

This architecture provides a solid, production-ready foundation for Naut-WA with room for significant future expansion using the existing infrastructure. 