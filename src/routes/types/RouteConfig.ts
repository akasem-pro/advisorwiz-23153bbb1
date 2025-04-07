
import { ReactNode } from 'react';

export interface RouteConfig {
  path: string;
  element: ReactNode;
  meta?: {
    requiresAuth?: boolean;
    title?: string;
    allowedRoles?: string[];
    [key: string]: any;
  };
}
