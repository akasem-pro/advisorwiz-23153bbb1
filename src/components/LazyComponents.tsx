
import React, { Suspense } from 'react';
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

// Lazy loading HOC that applies appropriate fallback
export function withLazyLoading<P>(
  importFn: () => Promise<{ default: React.ComponentType<P> }>,
  LoadingComponent: React.ComponentType = ComponentLoadingFallback
) {
  const LazyComponent = React.lazy(importFn);
  
  // Use React.forwardRef to properly handle ref forwarding
  const WithLazyLoadingComponent = React.forwardRef<unknown, P>((props, ref) => {
    return (
      <Suspense fallback={<LoadingComponent />}>
        <LazyComponent {...props} ref={ref} />
      </Suspense>
    );
  });
  
  return WithLazyLoadingComponent;
}
