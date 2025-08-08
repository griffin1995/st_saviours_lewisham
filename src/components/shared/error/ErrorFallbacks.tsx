// CMS DATA SOURCE: Error fallback UI components following React official patterns
// Based on React docs error boundary fallback examples with accessibility compliance

import React from 'react';
import { m } from 'framer-motion';

// CMS DATA SOURCE: Generic error fallback props
interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  context?: string;
}

// CMS DATA SOURCE: Basic error fallback following React docs pattern
export function BasicErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div 
      className="min-h-96 flex items-center justify-center bg-slate-900 text-white p-8"
      role="alert"
      aria-live="assertive"
    >
      <div className="text-center max-w-md">
        <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
        <p className="text-gray-300 mb-6">
          An unexpected error occurred. Please try again.
        </p>
        {resetError && (
          <button
            onClick={resetError}
            className="bg-white text-slate-900 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors mr-4"
          >
            Try Again
          </button>
        )}
        <button
          onClick={() => window.location.reload()}
          className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}

// CMS DATA SOURCE: Page-level error fallback with enhanced UI
export function PageErrorFallback({ error, resetError, context }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-8">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
        role="alert"
        aria-live="assertive"
      >
        <div className="mb-8">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg 
              className="w-10 h-10 text-red-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
          <h1 className="text-3xl font-light mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            We're sorry, but an unexpected error occurred whilst loading this page. 
            {context && ` This happened in the ${context} section.`}
          </p>
          {process.env.NODE_ENV === 'development' && error && (
            <details className="bg-gray-800 rounded-lg p-4 mb-6 text-left">
              <summary className="cursor-pointer text-gray-400 mb-2">
                Technical Details (Development Only)
              </summary>
              <pre className="text-sm text-red-300 whitespace-pre-wrap">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
        </div>
        
        <div className="space-y-4">
          {resetError && (
            <button
              onClick={resetError}
              className="w-full bg-white text-slate-900 py-3 px-6 rounded-md hover:bg-gray-100 transition-colors font-medium"
            >
              Try Again
            </button>
          )}
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition-colors"
          >
            Return to Homepage
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full border border-gray-600 text-gray-300 py-3 px-6 rounded-md hover:bg-gray-800 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </m.div>
    </div>
  );
}

// CMS DATA SOURCE: Component-level error fallback for smaller sections
export function ComponentErrorFallback({ error, resetError, context }: ErrorFallbackProps) {
  return (
    <div 
      className="bg-slate-800 border border-slate-600 rounded-lg p-6 text-white"
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <svg 
            className="w-5 h-5 text-red-400 mt-0.5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-white">
            Unable to load {context || 'this section'}
          </h3>
          <p className="mt-1 text-sm text-gray-300">
            This component encountered an error and couldn't display properly.
          </p>
          {resetError && (
            <button
              onClick={resetError}
              className="mt-3 text-sm bg-white text-slate-900 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// CMS DATA SOURCE: Form-specific error fallback following React docs form patterns
export function FormErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div 
      className="bg-red-50 border border-red-200 rounded-lg p-4"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <svg 
            className="w-5 h-5 text-red-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">
            Form submission error
          </h3>
          <p className="mt-1 text-sm text-red-700">
            There was an error whilst submitting the form. Please try again.
          </p>
          {resetError && (
            <button
              onClick={resetError}
              className="mt-3 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// CMS DATA SOURCE: Loading error fallback for async operations
export function LoadingErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="flex items-center justify-center py-8 text-gray-500">
      <div className="text-center">
        <svg 
          className="w-8 h-8 mx-auto mb-3 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <p className="text-sm mb-3">Failed to load content</p>
        {resetError && (
          <button
            onClick={resetError}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}