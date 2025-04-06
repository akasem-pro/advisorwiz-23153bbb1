
import { ReactNode } from 'react';

/**
 * Route configuration interface
 */
export interface RouteConfig {
  path: string;
  element: ReactNode;
  meta?: {
    publicRoute?: boolean;
    requiresAuth?: boolean;
    allowedRoles?: string[];
    [key: string]: any;
  };
}
