
import React, { ReactNode } from 'react';
import { Route, RouteProps } from 'react-router-dom';

/**
 * Type for a route configuration
 */
export interface RouteConfig {
  path: string;
  element: ReactNode;
  key: string;
  requiresAuth?: boolean;
  allowedRoles?: string[];
  index?: boolean;
}

/**
 * Generate a Route component from a route configuration
 */
export const createRoute = (config: RouteConfig): React.ReactElement => {
  const { path, element, key, index = false } = config;
  
  return index 
    ? <Route key={key} index element={element} />
    : <Route key={key} path={path} element={element} />;
};

/**
 * Create a batch of routes from route configurations
 */
export const createRoutes = (configs: RouteConfig[]): React.ReactElement[] => {
  return configs.map(createRoute);
};

/**
 * Get the path for a named route
 */
export const getRoutePath = (name: string, params?: Record<string, string>): string => {
  const routes: Record<string, string> = {
    // Main routes
    home: '/',
    about: '/about',
    forConsumers: '/for-consumers',
    forAdvisors: '/for-advisors',
    forFirms: '/for-firms',
    blog: '/blog',
    contact: '/contact',
    pricing: '/pricing',
    terms: '/terms',
    privacy: '/privacy',
    disclaimer: '/disclaimer',
    cookies: '/cookies',
    
    // Auth routes
    signIn: '/signin',
    signUp: '/signup',
    
    // Dashboard routes
    advisorDashboard: '/advisor-dashboard',
    consumerDashboard: '/consumer-dashboard',
    firmDashboard: '/firm-dashboard',
    schedule: '/schedule',
    chat: '/chat',
    leads: '/leads',
    settings: '/settings',
    
    // Other routes
    advisorProfile: '/advisor-profile',
    match: '/match',
    team: '/team',
    resources: '/resources',
    downloadApp: '/download',
  };
  
  if (!routes[name]) {
    console.error(`Route '${name}' not found in route definitions`);
    return '/';
  }
  
  let path = routes[name];
  
  // Replace params in path
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, value);
    });
  }
  
  return path;
};

/**
 * Helper function to lazy load a component with better Typescript support
 */
export function lazyLoadComponent<T extends React.ComponentType<any>>(
  importPromise: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  return React.lazy(importPromise);
}
