
import { ReactNode } from 'react';

export interface DashboardRouteType {
  path?: string;
  element?: ReactNode;
  props?: {
    path: string;
    element: ReactNode;
  };
}

// Helper type guards for DashboardRouteType
export function hasDirect(route: DashboardRouteType): boolean {
  return route.path !== undefined && route.element !== undefined;
}

export function hasProps(route: DashboardRouteType): boolean {
  return route.props !== undefined && 
         typeof route.props === 'object' && 
         'path' in route.props && 
         'element' in route.props;
}
