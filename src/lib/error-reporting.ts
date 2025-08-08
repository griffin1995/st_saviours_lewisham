// CMS DATA SOURCE: Error reporting system following React official documentation patterns
// Based on React docs error handling and production reporting examples

// CMS DATA SOURCE: Error types following React official pattern
export interface ErrorReport {
  type: 'Caught' | 'Uncaught' | 'Recoverable';
  error: Error | unknown;
  errorInfo: {
    componentStack: string;
  };
  timestamp: string;
  userAgent: string;
  url: string;
}

// CMS DATA SOURCE: Error reporting function following React official docs
export function reportError({ type, error, errorInfo }: Omit<ErrorReport, 'timestamp' | 'userAgent' | 'url'>) {
  const report: ErrorReport = {
    type,
    error,
    errorInfo,
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'SSR',
    url: typeof window !== 'undefined' ? window.location.href : 'SSR'
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error(`${type} Error:`, error);
    console.error('Component Stack:', errorInfo.componentStack);
    console.error('Full Report:', report);
  }

  // In production, send to error reporting service
  if (process.env.NODE_ENV === 'production') {
    try {
      // Replace with your error reporting service
      // Example: Sentry, LogRocket, Bugsnag, etc.
      sendToErrorService(report);
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  }
}

// CMS DATA SOURCE: Mock error service function - replace with real implementation
async function sendToErrorService(report: ErrorReport) {
  // Example implementation - replace with actual service
  const endpoint = process.env.NEXT_PUBLIC_ERROR_REPORTING_URL;
  
  if (!endpoint) {
    console.warn('Error reporting endpoint not configured');
    return;
  }

  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    });
  } catch (error) {
    console.error('Error reporting service failed:', error);
  }
}

// CMS DATA SOURCE: React 19 error handlers following official docs
export function onCaughtErrorProd(error: unknown, errorInfo: { componentStack: string }) {
  // Only report unknown errors, filter out known/expected errors
  if (error instanceof Error && error.message !== 'Known error') {
    reportError({ type: 'Caught', error, errorInfo });
  }
}

export function onUncaughtErrorProd(error: unknown, errorInfo: { componentStack: string }) {
  reportError({ type: 'Uncaught', error, errorInfo });
}

export function onRecoverableErrorProd(error: unknown, errorInfo: { componentStack: string }) {
  reportError({ type: 'Recoverable', error, errorInfo });
}

// CMS DATA SOURCE: Error classification utility
export function classifyError(error: unknown): {
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'network' | 'render' | 'logic' | 'unknown';
  shouldReport: boolean;
} {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    // Network errors
    if (message.includes('fetch') || message.includes('network') || message.includes('timeout')) {
      return { severity: 'medium', category: 'network', shouldReport: true };
    }
    
    // Render errors
    if (message.includes('hydration') || message.includes('render') || message.includes('component')) {
      return { severity: 'high', category: 'render', shouldReport: true };
    }
    
    // Logic errors
    if (message.includes('undefined') || message.includes('null') || message.includes('reference')) {
      return { severity: 'high', category: 'logic', shouldReport: true };
    }
  }
  
  return { severity: 'medium', category: 'unknown', shouldReport: true };
}

// CMS DATA SOURCE: Error boundary integration helper
export function createErrorReporter(context: string) {
  return (error: Error, errorInfo: { componentStack: string }) => {
    const classification = classifyError(error);
    
    if (classification.shouldReport) {
      reportError({
        type: 'Caught',
        error: {
          ...error,
          context,
          classification
        },
        errorInfo
      });
    }
  };
}