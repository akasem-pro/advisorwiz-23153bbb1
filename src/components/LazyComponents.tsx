
import React, { Suspense, useTransition, startTransition, useCallback } from 'react';
import { Skeleton } from './ui/skeleton';
import { AlertCircle } from 'lucide-react';

// Loading fallbacks for different component types
export const PageLoadingFallback = () => (
  <div className="container mx-auto px-4 py-8">
    <Skeleton className="h-12 w-3/4 mb-6" />
    <Skeleton className="h-64 w-full mb-4" />
    <Skeleton className="h-32 w-full mb-4" />
    <Skeleton className="h-32 w-full" />
  </div>
);

export const SectionLoadingFallback = () => (
  <div className="py-8">
    <Skeleton className="h-10 w-1/2 mx-auto mb-6" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  </div>
);

export const ComponentLoadingFallback = () => (
  <Skeleton className="h-24 w-full" />
);

// Error boundary component to catch suspense errors
export const ErrorFallback = ({ error }: { error?: Error }) => (
  <div className="p-4 border border-red-300 rounded bg-red-50 text-red-700 my-4">
    <div className="flex items-center mb-2">
      <AlertCircle className="h-5 w-5 mr-2" />
      <h4 className="font-medium">Failed to load component</h4>
    </div>
    {error && <p className="text-sm">{error.message}</p>}
    <button 
      onClick={() => window.location.reload()} 
      className="mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 rounded text-sm"
    >
      Reload page
    </button>
  </div>
);

// Improved withLazyLoading HOC with better TypeScript support and suspension handling
export function withLazyLoading<P extends Record<string, unknown>>(
  importFn: () => Promise<{ default: React.ComponentType<P> }>,
  LoadingComponent: React.ComponentType = ComponentLoadingFallback
) {
  // Preload the module to reduce visible suspense
  const modulePromise = preloadComponent(importFn);
  
  const LazyComponent = React.lazy(() => {
    return new Promise<{ default: React.ComponentType<P> }>((resolve, reject) => {
      // Use the preloaded promise
      modulePromise
        .then(module => {
          // Small artificial delay to ensure smooth transitions
          setTimeout(() => resolve(module), 10);
        })
        .catch(err => {
          console.error("Failed to load lazy component:", err);
          reject(err);
        });
    });
  });
  
  // Create a functional component to wrap the lazy component with startTransition
  const WithLazyLoadingComponent = (props: React.PropsWithoutRef<P>) => {
    const [isPending, startTransitionHook] = useTransition();
    
    React.useEffect(() => {
      // Pre-load the component when this wrapper mounts using startTransition
      startTransitionHook(() => {
        modulePromise.catch(err => console.debug('Lazy component preloading failed:', err));
      });
    }, []);
    
    return (
      <Suspense fallback={<LoadingComponent />}>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <LazyComponent {...props} />
        </ErrorBoundary>
      </Suspense>
    );
  };
  
  // Set display name for better debugging
  const componentName = importFn.toString().match(/import\(['"](.+?)['"]\)/)?.[1]?.split('/').pop() || 'LazyComponent';
  WithLazyLoadingComponent.displayName = `withLazyLoading(${componentName})`;
  
  return React.memo(WithLazyLoadingComponent);
}

// Pre-load component and cache the promise
function preloadComponent<T>(importFn: () => Promise<T>): Promise<T> {
  // Start loading immediately
  return importFn().catch(err => {
    console.error("Failed to preload component:", err);
    throw err;
  });
}

// Enhanced utility to wrap state updates that might cause suspense
export function useSafeStateTransition<T>(initialState: T): [T, React.Dispatch<React.SetStateAction<T>>, boolean] {
  const [state, setState] = React.useState<T>(initialState);
  const [isPending, startTransitionHook] = useTransition();
  
  const setStateWithTransition = useCallback((value: React.SetStateAction<T>) => {
    startTransitionHook(() => {
      setState(value);
    });
  }, [startTransitionHook]);
  
  return [state, setStateWithTransition, isPending];
}

// Enhanced utility for deferring non-critical operations
export function deferOperation(operation: () => void, delay = 0) {
  if (typeof window !== 'undefined') {
    try {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
          startTransition(() => {
            operation();
          });
        }, { timeout: 1000 + delay });
      } else {
        setTimeout(() => {
          startTransition(() => {
            operation();
          });
        }, delay);
      }
    } catch (error) {
      console.error("Failed to defer operation:", error);
    }
  }
}

// Simple error boundary component
class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
  fallback: React.ReactNode;
}> {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Component error caught:", error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return React.isValidElement(this.props.fallback) 
        ? React.cloneElement(this.props.fallback as React.ReactElement, { error: this.state.error })
        : this.props.fallback;
    }
    return this.props.children;
  }
}

// New utility to safely use Suspense components
export function withSuspense<P extends object>(
  Component: React.ComponentType<P>,
  FallbackComponent: React.ReactNode = <ComponentLoadingFallback />
) {
  const WithSuspense = (props: P & JSX.IntrinsicAttributes) => (
    <Suspense fallback={FallbackComponent}>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Component {...props} />
      </ErrorBoundary>
    </Suspense>
  );
  
  WithSuspense.displayName = `withSuspense(${Component.displayName || Component.name || 'Component'})`;
  return WithSuspense;
}
