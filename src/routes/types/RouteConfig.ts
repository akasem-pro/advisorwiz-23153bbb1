
import { ReactNode } from 'react';

/**
 * Standard route configuration 
 */
export interface RouteConfig {
  path: string;
  element: ReactNode;
  meta?: RouteMeta;
  children?: RouteConfig[];
}

/**
 * Route metadata for authorization and other purposes
 */
export interface RouteMeta {
  title?: string;
  description?: string;
  requiresAuth?: boolean;
  publicRoute?: boolean;
  allowedRoles?: string[];
  breadcrumb?: string;
  layout?: 'default' | 'dashboard' | 'auth' | 'minimal' | 'none';
  showHeader?: boolean;
  showFooter?: boolean;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'none';
  preload?: boolean;
}

/**
 * User role types for route authorization
 */
export type UserRole = 'consumer' | 'advisor' | 'firm_admin' | 'admin' | 'guest';

/**
 * Helper for dynamic path creation with proper typing
 */
export function createRoutePath<T extends Record<string, string>>(
  basePath: string, 
  params?: T
): string {
  if (!params) return basePath;
  
  let path = basePath;
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, value);
  });
  
  return path;
}
