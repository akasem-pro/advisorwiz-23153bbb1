
import { ReactNode } from 'react';

export interface RouteConfig {
  path: string;
  element: ReactNode;
  meta?: {
    title?: string;
    description?: string;
    requiresAuth?: boolean;
    [key: string]: any;
  };
}
