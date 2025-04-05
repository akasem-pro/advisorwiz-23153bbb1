
import React from 'react';
import AppLayout from '../../components/layout/AppLayout';
import NotFound from '../../pages/NotFound';

// Utility/miscellaneous route definitions
export const utilityRoutes = {
  resources: {
    path: '/resources',
    element: <AppLayout><div>Resources Page</div></AppLayout>
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
