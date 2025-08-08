// CMS DATA SOURCE: Error handling barrel exports following React official patterns
// Centralised exports for error boundary system

export { ErrorBoundary, ErrorBoundaryWrapper } from './ErrorBoundary';
export { 
  BasicErrorFallback,
  PageErrorFallback,
  ComponentErrorFallback,
  FormErrorFallback,
  LoadingErrorFallback
} from './ErrorFallbacks';
export { 
  reportError,
  onCaughtErrorProd,
  onUncaughtErrorProd,
  onRecoverableErrorProd,
  classifyError,
  createErrorReporter
} from '../../../lib/error-reporting';