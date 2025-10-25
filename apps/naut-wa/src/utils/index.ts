// Utils Index - Common utility functions

// TODO: Implement individual utility modules
// export * from './logger';
// export * from './validation';
// export * from './formatting';
// export * from './constants';

// Common interfaces
export interface APIError {
  code: string;
  message: string;
  details?: any;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: APIError;
  timestamp: Date;
}

// Utility functions
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const sanitizeString = (str: string): string => {
  return str.replace(/[^a-zA-Z0-9\s-_]/g, '').trim();
};

export const formatCurrency = (amount: number, currency: string = 'MXN'): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}; 