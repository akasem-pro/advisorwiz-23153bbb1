
import React, { Suspense, ComponentType } from 'react';
import { RouteConfig } from '../../routes/types/RouteConfig';
import { PageLoadingFallback } from '../../components/LazyComponents';
import PageErrorBoundary from '../../components/error/PageErrorBoundary';
import { recordPerformanceMark } from '../../utils/performance/webVitals';

/**
 * Creates a lazy-loaded route configuration
 */
export function createLazyRoute(
  path: string,
  importFn: () => Promise<{ default: ComponentType<any> }>,
  options: {
    meta?: RouteConfig['meta'];
    withErrorBoundary?: boolean;
    withLayout?: (component: React.ReactElement) => React.ReactElement;
  } = {}
): RouteConfig {
  const LazyComponent = React.lazy(importFn);
  
  // Setup component name for performance tracking
  const componentName = path.replace(/\//g, '-').replace(/^-/, '') || 'root';
  
  const RouteComponent = (): React.ReactElement => {
    // Record performance metrics for the route
    React.useEffect(() => {
      recordPerformanceMark(`route-${componentName}-mounted`);
    }, []);
    
    // Return the component with appropriate wrappers
    let component = (
      <Suspense fallback={<PageLoadingFallback />}>
        <LazyComponent />
      </Suspense>
    );
    
    // Apply layout if provided
    if (options.withLayout) {
      component = options.withLayout(component);
    }
    
    // Apply error boundary if requested
    if (options.withErrorBoundary !== false) {
      return <PageErrorBoundary>{component}</PageErrorBoundary>;
    }
    
    return component;
  };
  
  return {
    path,
    element: <RouteComponent />,
    meta: options.meta
  };
}

/**
 * Batch create lazy-loaded routes with common options
 */
export function createLazyRoutes(
  routes: Array<{
    path: string;
    importFn: () => Promise<{ default: ComponentType<any> }>;
    meta?: RouteConfig['meta'];
  }>,
  commonOptions: {
    withErrorBoundary?: boolean;
    withLayout?: (component: React.ReactElement) => React.ReactElement;
  } = {}
): RouteConfig[] {
  return routes.map(route => createLazyRoute(
    route.path,
    route.importFn,
    { ...commonOptions, meta: route.meta }
  ));
}
