
import React, { Suspense, useTransition } from 'react';
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

// Improved withLazyLoading HOC with better TypeScript support
export function withLazyLoading<P extends Record<string, unknown>>(
  importFn: () => Promise<{ default: React.ComponentType<P> }>,
  LoadingComponent: React.ComponentType = ComponentLoadingFallback
) {
  const LazyComponent = React.lazy(importFn);
  
  // Create a functional component to wrap the lazy component with startTransition
  const WithLazyLoadingComponent = (props: React.PropsWithoutRef<P>) => {
    const [isPending, startTransition] = useTransition();
    
    React.useEffect(() => {
      // Pre-load the component when this wrapper mounts
      startTransition(() => {
        importFn().catch(err => console.debug('Lazy component preloading failed'));
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

// New utility to wrap state updates that might cause suspense
export function useSafeStateTransition<T>(initialState: T): [T, React.Dispatch<React.SetStateAction<T>>, boolean] {
  const [state, setState] = React.useState<T>(initialState);
  const [isPending, startTransition] = useTransition();
  
  const setStateWithTransition = React.useCallback((value: React.SetStateAction<T>) => {
    startTransition(() => {
      setState(value);
    });
  }, []);
  
  return [state, setStateWithTransition, isPending];
}
