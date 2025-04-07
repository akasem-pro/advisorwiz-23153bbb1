
import React, { lazy } from 'react';
import { RouteConfig } from '../../routes/types/RouteConfig';

/**
 * Creates a route configuration with lazy loading
 * 
 * @param path The URL path
 * @param importCallback The import function
 * @param options Additional route options
 * @returns RouteConfig object
 */
export const createLazyRoute = (
  path: string, 
  importCallback: () => Promise<any>,
  options?: Partial<RouteConfig>
): RouteConfig => {
  // Create the lazy component
  const LazyComponent = lazy(importCallback);
  
  // Additional logging for debugging
  console.log(`Creating lazy route for: ${path}`);
  
  // Return the route config
  return {
    path,
    element: <LazyComponent />,
    meta: {
      ...options?.meta,
    },
    ...options,
  };
};
