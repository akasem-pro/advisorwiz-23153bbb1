
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { useEnhancedErrorHandler } from '../../hooks/use-enhanced-error-handler';
import { ErrorCategory, ErrorSeverity } from '../../utils/errorHandling/errorHandler';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  showReset?: boolean;
  showHome?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// Context provider to access error handler outside of the class component
const ErrorBoundaryContext = React.createContext<{ 
  resetError: () => void 
}>({ 
  resetError: () => {} 
});

export const useErrorBoundary = () => React.useContext(ErrorBoundaryContext);

class ErrorBoundaryClass extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
    this.resetError = this.resetError.bind(this);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to console
    console.error('Page error caught by boundary:', error, errorInfo);
    
    // Report to error monitoring system 
    try {
      import('../../utils/errorHandling/errorHandler').then(({ createError, handleError }) => {
        handleError(
          createError(
            `Page Error: ${error.message}`,
            ErrorCategory.UNKNOWN,
            ErrorSeverity.HIGH,
            error,
            { componentStack: errorInfo.componentStack }
          ),
          true // Show toast notification
        );
      });
    } catch (e) {
      console.error('Failed to report error:', e);
    }
  }

  resetError(): void {
    this.setState({ hasError: false, error: undefined });
  }

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback, showReset = true, showHome = true } = this.props;

    if (hasError) {
      // Use provided fallback or default error UI
      return fallback || (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-navy-950 p-4">
          <div className="max-w-md w-full bg-white dark:bg-navy-900 rounded-lg shadow-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-16 w-16 text-amber-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {error?.message || "We're sorry, but there was an error loading this page."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {showReset && (
                <button
                  onClick={this.resetError}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              )}
              {showHome && (
                <Link
                  to="/"
                  className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-navy-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-navy-600 transition-colors"
                >
                  Go to Home
                </Link>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <ErrorBoundaryContext.Provider value={{ resetError: this.resetError }}>
        {children}
      </ErrorBoundaryContext.Provider>
    );
  }
}

// HOC to wrap page components with the error boundary
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<ErrorBoundaryProps, 'children'>
) => {
  const WithErrorBoundary = (props: P) => (
    <ErrorBoundaryClass {...options}>
      <Component {...props} />
    </ErrorBoundaryClass>
  );
  
  const displayName = Component.displayName || Component.name || 'Component';
  WithErrorBoundary.displayName = `WithErrorBoundary(${displayName})`;
  
  return WithErrorBoundary;
};

// Functional component wrapper for the class component
const PageErrorBoundary: React.FC<ErrorBoundaryProps> = (props) => {
  return <ErrorBoundaryClass {...props} />;
};

export default PageErrorBoundary;
