
import React from 'react';
import AppLayout from '../../components/layout/AppLayout';
import NotFound from '../../pages/NotFound';
import Resources from '../../pages/Resources';
import { RouteConfig } from './types';

// Resources and utility routes
export const utilityRoutes: Record<string, RouteConfig> = {
  // Resources and utility routes
  resources: {
    path: '/resources',
    element: <AppLayout><Resources /></AppLayout>
  },
  messages: {
    path: '/messages',
    element: <AppLayout><div>Messages Page</div></AppLayout>
  },
  appointments: {
    path: '/appointments',
    element: <AppLayout><div>Appointments Page</div></AppLayout>
  },
  billing: {
    path: '/billing',
    element: <AppLayout><div>Billing Page</div></AppLayout>
  },
  
  // Fallback route
  notFound: {
    path: '*',
    element: <NotFound />
  }
};
