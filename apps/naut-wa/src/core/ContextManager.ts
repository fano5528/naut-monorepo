import { db } from '../db';
import { message } from '../db/schema';
import { ConversationState } from './StateManager';
import { desc, eq } from 'drizzle-orm';

export interface ConversationContext {
  recentMessages: MessageContext[];
  state: ConversationState;
  summary?: string;
  metadata?: any;
}

export interface MessageContext {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tokens?: {
    input?: number;
    output?: number;
  };
}

export class ContextManager {
  private static instance: ContextManager;
  private maxMessages: number = 20; // Maximum number of recent messages to include
  private maxTokens: number = 8000; // Approximate token limit for context

  private constructor() {}

  public static getInstance(): ContextManager {
    if (!ContextManager.instance) {
      ContextManager.instance = new ContextManager();
    }
    return ContextManager.instance;
  }

  public async buildContext(userId: string, currentState: ConversationState): Promise<ConversationContext> {
    try {
      // Retrieve recent conversation history
      const recentMessages = await this.getRecentMessages(userId);

      // Convert to context format
      const messageContexts = recentMessages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.message,
        timestamp: msg.date,
        tokens: {
          input: msg.inputTokens || undefined,
          output: msg.outputTokens || undefined,
        }
      }));

      // Trim context if it exceeds token limits
      const trimmedMessages = this.trimContextByTokens(messageContexts);

      // Generate summary if we have a lot of history
      const summary = trimmedMessages.length >= this.maxMessages 
        ? await this.generateConversationSummary(trimmedMessages)
        : undefined;

      return {
        recentMessages: trimmedMessages,
        state: currentState,
        summary,
        metadata: {
          userId,
          totalMessages: recentMessages.length,
          trimmed: trimmedMessages.length < recentMessages.length
        }
      };

    } catch (error) {
      console.error('Error building context:', error);
      // Return minimal context on error
      return {
        recentMessages: [],
        state: currentState,
        metadata: { userId, error: true }
      };
    }
  }

  private async getRecentMessages(userId: string): Promise<any[]> {
    const messages = await db
      .select()
      .from(message)
      .where(eq(message.userId, userId))
      .orderBy(desc(message.date))
      .limit(this.maxMessages);

    // Return in chronological order (oldest first)
    return messages.reverse();
  }

  private trimContextByTokens(messages: MessageContext[]): MessageContext[] {
    let totalTokens = 0;
    const trimmedMessages: MessageContext[] = [];

    // Start from the most recent and work backwards
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      const msgTokens = this.estimateTokens(msg.content);
      
      if (totalTokens + msgTokens > this.maxTokens && trimmedMessages.length > 0) {
        break;
      }
      
      totalTokens += msgTokens;
      trimmedMessages.unshift(msg); // Add to beginning to maintain order
    }

    return trimmedMessages;
  }

  private estimateTokens(text: string): number {
    // Rough estimation: ~4 characters per token
    return Math.ceil(text.length / 4);
  }

  private async generateConversationSummary(messages: MessageContext[]): Promise<string> {
    // Simple summary generation - in a full implementation, this could use an LLM
    const totalMessages = messages.length;
    const userMessages = messages.filter(m => m.role === 'user').length;
    const assistantMessages = messages.filter(m => m.role === 'assistant').length;
    
    const firstUserMessage = messages.find(m => m.role === 'user')?.content || '';
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || '';

    return `Conversation summary: ${totalMessages} messages (${userMessages} user, ${assistantMessages} assistant). Started with: "${firstUserMessage.substring(0, 100)}${firstUserMessage.length > 100 ? '...' : ''}" Recent: "${lastUserMessage.substring(0, 100)}${lastUserMessage.length > 100 ? '...' : ''}"`;
  }

  public formatContextForLLM(context: ConversationContext): string {
    let formattedContext = '';

    if (context.summary) {
      formattedContext += `Previous conversation summary: ${context.summary}\n\n`;
    }

    formattedContext += 'Recent conversation:\n';
    context.recentMessages.forEach(msg => {
      formattedContext += `${msg.role}: ${msg.content}\n`;
    });

    return formattedContext;
  }
} 