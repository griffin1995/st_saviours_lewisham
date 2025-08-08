// CMS DATA SOURCE: Error handling hooks following React official patterns
// Based on React docs error handling and custom hooks patterns

import { useCallback, useState } from 'react';
import { reportError, classifyError } from '@/lib/error-reporting';

// CMS DATA SOURCE: Error state interface
interface ErrorState {
  error: Error | null;
  hasError: boolean;
  errorInfo?: {
    componentStack?: string;
    context?: string;
  };
}

// CMS DATA SOURCE: Error handler hook following React patterns
export function useErrorHandler(context?: string) {
  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    hasError: false
  });

  // CMS DATA SOURCE: Clear error function
  const clearError = useCallback(() => {
    setErrorState({
      error: null,
      hasError: false
    });
  }, []);

  // CMS DATA SOURCE: Handle error function with classification
  const handleError = useCallback((error: Error | unknown, additionalInfo?: any) => {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    const classification = classifyError(errorObj);
    
    // Set local error state
    setErrorState({
      error: errorObj,
      hasError: true,
      errorInfo: {
        context,
        ...additionalInfo
      }
    });

    // Report error if it should be reported
    if (classification.shouldReport) {
      reportError({
        type: 'Caught',
        error: {
          ...errorObj,
          context,
          classification
        },
        errorInfo: {
          componentStack: additionalInfo?.componentStack || 'useErrorHandler'
        }
      });
    }
  }, [context]);

  // CMS DATA SOURCE: Try-catch wrapper for async operations
  const withErrorHandling = useCallback(<T extends any[], R>(
    fn: (...args: T) => Promise<R>
  ) => {
    return async (...args: T): Promise<R | null> => {
      try {
        return await fn(...args);
      } catch (error) {
        handleError(error);
        return null;
      }
    };
  }, [handleError]);

  // CMS DATA SOURCE: Try-catch wrapper for sync operations
  const withSyncErrorHandling = useCallback(<T extends any[], R>(
    fn: (...args: T) => R
  ) => {
    return (...args: T): R | null => {
      try {
        return fn(...args);
      } catch (error) {
        handleError(error);
        return null;
      }
    };
  }, [handleError]);

  return {
    ...errorState,
    handleError,
    clearError,
    withErrorHandling,
    withSyncErrorHandling
  };
}

// CMS DATA SOURCE: Form error handler hook
export function useFormErrorHandler() {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  const setFieldError = useCallback((field: string, error: string) => {
    setFormErrors(prev => ({
      ...prev,
      [field]: error
    }));
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setFormErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setFormErrors({});
    setGlobalError(null);
  }, []);

  const setError = useCallback((error: string) => {
    setGlobalError(error);
  }, []);

  const clearError = useCallback(() => {
    setGlobalError(null);
  }, []);

  return {
    formErrors,
    globalError,
    hasErrors: Object.keys(formErrors).length > 0 || !!globalError,
    setFieldError,
    clearFieldError,
    clearAllErrors,
    setError,
    clearError
  };
}

// CMS DATA SOURCE: Async operation error handler
export function useAsyncError() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleError, ...errorState } = useErrorHandler('async-operation');

  const execute = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    onSuccess?: (result: T) => void,
    onError?: (error: Error) => void
  ): Promise<T | null> => {
    setIsLoading(true);
    try {
      const result = await asyncFn();
      onSuccess?.(result);
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      handleError(errorObj);
      onError?.(errorObj);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [handleError]);

  return {
    ...errorState,
    isLoading,
    execute
  };
}