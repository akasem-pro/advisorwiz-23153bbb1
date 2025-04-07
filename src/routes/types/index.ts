
import { ReactNode } from 'react';

/**
 * Standard route parameter types
 */
export interface RouteParams {
  id?: string;
  clientId?: string;
  advisorId?: string;
  firmId?: string;
  slug?: string;
  [key: string]: string | undefined;
}

/**
 * Extended route configuration with metadata
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
  [key: string]: any;
}

/**
 * Helper function to get route path with parameters
 */
export function createPath<T extends RouteParams>(basePath: string, params: T): string {
  let path = basePath;
  
  // Replace path parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      path = path.replace(`:${key}`, value);
    }
  });
  
  return path;
}

/**
 * Types of user roles for route authorization
 */
export type UserRole = 'consumer' | 'advisor' | 'firm_admin' | 'admin' | 'guest';

/**
 * Interface for route groups
 */
export interface RouteGroup {
  [key: string]: RouteConfig;
}
