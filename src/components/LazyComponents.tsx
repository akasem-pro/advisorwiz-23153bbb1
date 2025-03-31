
import React, { Suspense, useTransition, startTransition } from 'react';
import { Skeleton } from './ui/skeleton';

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

// Improved withLazyLoading HOC with better TypeScript support and suspension handling
export function withLazyLoading<P extends Record<string, unknown>>(
  importFn: () => Promise<{ default: React.ComponentType<P> }>,
  LoadingComponent: React.ComponentType = ComponentLoadingFallback
) {
  // Preload the module to reduce visible suspense
  let modulePromise: Promise<{ default: React.ComponentType<P> }> | null = null;
  
  const preloadModule = () => {
    if (!modulePromise) {
      modulePromise = importFn();
    }
    return modulePromise;
  };
  
  // Start preloading immediately
  preloadModule();
  
  const LazyComponent = React.lazy(importFn);
  
  // Create a functional component to wrap the lazy component with startTransition
  const WithLazyLoadingComponent = (props: React.PropsWithoutRef<P>) => {
    const [isPending, startTransitionHook] = useTransition();
    
    React.useEffect(() => {
      // Pre-load the component when this wrapper mounts using startTransition
      startTransitionHook(() => {
        preloadModule().catch(err => console.debug('Lazy component preloading failed'));
      });
    }, []);
    
    return (
      <Suspense fallback={<LoadingComponent />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
  
  // Set display name for better debugging
  const componentName = importFn.toString().match(/import\(['"](.+?)['"]\)/)?.[1]?.split('/').pop() || 'LazyComponent';
  WithLazyLoadingComponent.displayName = `withLazyLoading(${componentName})`;
  
  return WithLazyLoadingComponent;
}

// Enhanced utility to wrap state updates that might cause suspense
export function useSafeStateTransition<T>(initialState: T): [T, React.Dispatch<React.SetStateAction<T>>, boolean] {
  const [state, setState] = React.useState<T>(initialState);
  const [isPending, startTransitionHook] = useTransition();
  
  const setStateWithTransition = React.useCallback((value: React.SetStateAction<T>) => {
    startTransitionHook(() => {
      setState(value);
    });
  }, [startTransitionHook]);
  
  return [state, setStateWithTransition, isPending];
}

// New utility for deferring non-critical operations
export function deferOperation(operation: () => void, delay = 0) {
  if (typeof window !== 'undefined') {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(() => {
        operation();
      }, { timeout: 1000 + delay });
    } else {
      setTimeout(operation, delay);
    }
  }
}
