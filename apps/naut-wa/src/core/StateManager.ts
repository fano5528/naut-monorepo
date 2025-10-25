import { PromptManager } from '../prompts/PromptManager';
import { ToolExecutor } from './ToolExecutor';

export enum ConversationState {
  GREETING = 'greeting',
  BUSINESS_INFO = 'business_info',
  INITIAL_SITE_GENERATION = 'initial_site_generation',
  SITE_REFINEMENT = 'site_refinement',
  DEPLOYMENT = 'deployment',
  DOMAIN_CONNECTION = 'domain_connection',
  POST_LAUNCH_UPDATES = 'post_launch_updates'
}

export interface StateTransition {
  from: ConversationState;
  to: ConversationState;
  condition?: (context: any) => boolean;
}

export class StateManager {
  private static instance: StateManager;
  private promptManager: PromptManager;
  private toolExecutor: ToolExecutor;

  private constructor() {
    this.promptManager = PromptManager.getInstance();
    this.toolExecutor = ToolExecutor.getInstance();
  }

  public static getInstance(): StateManager {
    if (!StateManager.instance) {
      StateManager.instance = new StateManager();
    }
    return StateManager.instance;
  }

  private validTransitions: StateTransition[] = [
    { from: ConversationState.GREETING, to: ConversationState.BUSINESS_INFO },
    { from: ConversationState.BUSINESS_INFO, to: ConversationState.INITIAL_SITE_GENERATION },
    { from: ConversationState.INITIAL_SITE_GENERATION, to: ConversationState.SITE_REFINEMENT },
    { from: ConversationState.SITE_REFINEMENT, to: ConversationState.DEPLOYMENT },
    { from: ConversationState.DEPLOYMENT, to: ConversationState.DOMAIN_CONNECTION },
    { from: ConversationState.DOMAIN_CONNECTION, to: ConversationState.POST_LAUNCH_UPDATES },
    { from: ConversationState.SITE_REFINEMENT, to: ConversationState.SITE_REFINEMENT }, // Allow staying in refinement
    { from: ConversationState.POST_LAUNCH_UPDATES, to: ConversationState.SITE_REFINEMENT },
  ];

  public getSystemPrompt(state: ConversationState): string {
    return this.promptManager.getSystemPrompt(state);
  }

  public getAvailableTools(state: ConversationState): any[] {
    return this.toolExecutor.getAvailableTools(state);
  }

  public canTransition(from: ConversationState, to: ConversationState, context?: any): boolean {
    const transition = this.validTransitions.find(t => t.from === from && t.to === to);
    if (!transition) return false;
    
    if (transition.condition) {
      return transition.condition(context);
    }
    
    return true;
  }

  public getValidTransitions(from: ConversationState): ConversationState[] {
    return this.validTransitions
      .filter(t => t.from === from)
      .map(t => t.to);
  }

  public getInitialState(): ConversationState {
    return ConversationState.GREETING;
  }
} 