import { AuthError } from '@supabase/supabase-js';

export type ErrorType = 'auth' | 'validation' | 'network' | 'database' | 'unknown';

export interface ErrorHandlerOptions {
  showNotification?: boolean;
  logError?: boolean;
  context?: string;
}

export interface HandledError {
  type: ErrorType;
  message: string;
  originalError?: Error | AuthError | unknown;
  userMessage: string;
}

/**
 * Categorizes and handles different error types
 */
export const handleError = (
  error: unknown,
  options: ErrorHandlerOptions = {}
): HandledError => {
  const { showNotification = true, logError = true, context = 'Application' } = options;

  let errorType: ErrorType = 'unknown';
  let message = 'An unexpected error occurred';
  let userMessage = 'Something went wrong. Please try again.';

  // Handle Auth Errors
  if (error && typeof error === 'object' && 'status' in error) {
    const authError = error as AuthError;
    errorType = 'auth';
    message = authError.message;

    if (authError.message.includes('Invalid login credentials')) {
      userMessage = 'Invalid email or password. Please try again.';
    } else if (authError.message.includes('Email not confirmed')) {
      userMessage = 'Please confirm your email before signing in.';
    } else if (authError.message.includes('User already registered')) {
      userMessage = 'This email is already registered. Please sign in instead.';
    } else if (authError.message.includes('Network')) {
      errorType = 'network';
      userMessage = 'Network error. Please check your connection and try again.';
    } else {
      userMessage = `Authentication error: ${authError.message}`;
    }
  }
  // Handle Validation Errors
  else if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError') {
    errorType = 'validation';
    message = (error as Error).message;
    userMessage = 'Please check your input and try again.';
  }
  // Handle Network Errors
  else if (error instanceof TypeError && error.message.includes('fetch')) {
    errorType = 'network';
    message = error.message;
    userMessage = 'Network error. Please check your connection and try again.';
  }
  // Handle Generic Error objects
  else if (error instanceof Error) {
    message = error.message;

    if (message.includes('NetworkError') || message.includes('fetch')) {
      errorType = 'network';
      userMessage = 'Network error. Please check your connection and try again.';
    } else if (message.includes('database')) {
      errorType = 'database';
      userMessage = 'Database error. Please try again later.';
    } else {
      userMessage = message || 'An unexpected error occurred. Please try again.';
    }
  }
  // Handle string errors
  else if (typeof error === 'string') {
    message = error;
    userMessage = error;
  }

  // Log error if needed
  if (logError) {
    const errorLog = {
      context,
      type: errorType,
      message,
      timestamp: new Date().toISOString(),
      originalError: error,
    };

    if (errorType === 'auth') {
      console.warn('[AUTH ERROR]', errorLog);
    } else if (errorType === 'network') {
      console.warn('[NETWORK ERROR]', errorLog);
    } else {
      console.error('[ERROR]', errorLog);
    }
  }

  const handledError: HandledError = {
    type: errorType,
    message,
    userMessage,
    originalError: error,
  };

  // Emit notification event if needed
  if (showNotification) {
    const notificationEvent = new CustomEvent('app-error', {
      detail: handledError,
    });
    window.dispatchEvent(notificationEvent);
  }

  return handledError;
};

/**
 * Safely parse JSON with error handling
 */
export const safeJsonParse = <T>(jsonString: string, defaultValue: T): T => {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    handleError(error, {
      context: 'JSON Parse',
      logError: true,
      showNotification: false,
    });
    return defaultValue;
  }
};

/**
 * Safely stringify JSON with error handling
 */
export const safeJsonStringify = (value: unknown, defaultValue: string = '{}'): string => {
  try {
    return JSON.stringify(value);
  } catch (error) {
    handleError(error, {
      context: 'JSON Stringify',
      logError: true,
      showNotification: false,
    });
    return defaultValue;
  }
};

/**
 * Handle async operations with automatic error handling
 */
export const handleAsync = async <T>(
  asyncFn: () => Promise<T>,
  context: string = 'Async Operation'
): Promise<{ data: T | null; error: HandledError | null }> => {
  try {
    const data = await asyncFn();
    return { data, error: null };
  } catch (error) {
    const handledError = handleError(error, { context, logError: true, showNotification: true });
    return { data: null, error: handledError };
  }
};

/**
 * Check if error is a specific type
 */
export const isErrorType = (error: HandledError, type: ErrorType): boolean => {
  return error.type === type;
};

/**
 * Get user-friendly error message
 */
export const getUserErrorMessage = (error: unknown): string => {
  if (!error) return 'An unexpected error occurred.';

  const handledError = handleError(error, { showNotification: false, logError: false });
  return handledError.userMessage;
};
