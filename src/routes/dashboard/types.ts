
import { ReactNode } from 'react';

export interface DashboardRouteType {
  path?: string;
  element?: ReactNode;
  props?: {
    path: string;
    element: ReactNode;
  };
}
