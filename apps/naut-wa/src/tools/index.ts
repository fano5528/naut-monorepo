// Tools Index - Central exports for all tool implementations

// TODO: Implement individual tool modules
// export * from './SiteContentTools';
// export * from './PaymentTools';
// export * from './DomainTools';
// export * from './AnalyticsTools';

// Tool types and interfaces
export interface ToolResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: any;
  execute: (args: any) => Promise<ToolResult>;
}

// Tool categories
export enum ToolCategory {
  SITE_MANAGEMENT = 'site_management',
  CONTENT_CREATION = 'content_creation',
  PAYMENT = 'payment',
  DOMAIN = 'domain',
  ANALYTICS = 'analytics',
  COMMUNICATION = 'communication'
} 