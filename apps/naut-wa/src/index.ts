// Imports
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import messageRouter from "./routes/message";

// Constants
const port = process.env.PORT || 3010;
export const model = {
  name: "gpt-4.1-nano",
  inputTokenCostPerMillion: 0.15,
  outputTokenCostPerMillion: 0.6,
};

// Initializations
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred'
    },
    timestamp: new Date()
  });
});

// Routes
app.use("/message", messageRouter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Naut-WA API is healthy",
    version: "2.0.0",
    architecture: "modular",
    timestamp: new Date(),
  });
});

// API documentation endpoint
app.get("/", (req, res) => {
  res.json({
    name: "Naut-WA API",
    description: "AI-Powered Website Creation Assistant with WhatsApp Integration",
    version: "2.0.0",
    architecture: "modular",
    endpoints: {
      "/health": "Health check",
      "/message": "Process user messages and WhatsApp webhooks",
      "/message/health": "Message handler and WhatsApp health check",
      "/message/test-whatsapp": "Test WhatsApp message sending"
    },
    whatsapp: {
      webhook_url: "Your webhook URL should be: [YOUR_DOMAIN]/message",
      required_env_vars: [
        "META_ACCESS_TOKEN - Your Meta WhatsApp API access token",
        "META_PHONE_NUMBER_ID - Your WhatsApp Business phone number ID",
        "META_TOKEN - Token for webhook verification"
      ]
    },
    documentation: "See README.md for detailed setup and architecture information"
  });
});

// Export the app for Vercel
export default app;

// Start server only in non-serverless environments
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(port, () => {
    const hasWhatsAppConfig = !!(process.env.META_ACCESS_TOKEN && process.env.META_PHONE_NUMBER_ID);
    
    console.log(`🚀 Naut-WA Server is running on port ${port}`);
    console.log(`📱 API Documentation: http://localhost:${port}/`);
    console.log(`💚 Health Check: http://localhost:${port}/health`);
    console.log(`🤖 Message Endpoint: http://localhost:${port}/message`);
    console.log(`📲 WhatsApp Integration: ${hasWhatsAppConfig ? '✅ Configured' : '⚠️  Not configured'}`);
    if (!hasWhatsAppConfig) {
      console.log(`   Missing environment variables: META_ACCESS_TOKEN, META_PHONE_NUMBER_ID`);
    }
    console.log("🏗️  Architecture: Modular (StateManager, MessageHandler, ContextManager, LLMClient, ToolExecutor, InteractionManager)");
  });
}