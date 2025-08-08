// CMS DATA SOURCE: Enterprise error boundary following React official documentation patterns
// Based on React docs Component lifecycle methods and error handling

import React, { Component, ReactNode } from 'react';

// CMS DATA SOURCE: Error info interface following React official pattern
interface ErrorInfo {
  componentStack: string;
}

// CMS DATA SOURCE: Error boundary props following React official pattern
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

// CMS DATA SOURCE: Error boundary state following React official pattern
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// CMS DATA SOURCE: Enterprise error boundary class following React official docs exactly
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // CMS DATA SOURCE: React official getDerivedStateFromError pattern - updates state for fallback UI
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  // CMS DATA SOURCE: React official componentDidCatch pattern - side effects like error logging
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to external service or console
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call optional error callback for custom error reporting
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Warning: captureOwnerStack is only available in development
    if (process.env.NODE_ENV === 'development' && React.captureOwnerStack) {
      console.error('Owner stack:', React.captureOwnerStack());
    }
  }

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI or default error message
      return this.props.fallback || (
        <div 
          className="min-h-96 flex items-center justify-center bg-slate-900 text-white p-8"
          role="alert"
          aria-live="assertive"
        >
          <div className="text-center max-w-md">
            <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
            <p className="text-gray-300 mb-6">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-white text-slate-900 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// CMS DATA SOURCE: Wrapper component for easy usage following React official pattern
interface ErrorBoundaryWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ErrorBoundaryWrapper({ children, fallback }: ErrorBoundaryWrapperProps) {
  return (
    <ErrorBoundary fallback={fallback}>
      {children}
    </ErrorBoundary>
  );
}