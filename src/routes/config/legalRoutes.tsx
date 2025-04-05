
import React from 'react';
import AppLayout from '../../components/layout/AppLayout';

// Legal pages
import Terms from '../../pages/Terms';
import Privacy from '../../pages/Privacy';
import Disclaimer from '../../pages/Disclaimer';
import Cookies from '../../pages/Cookies';
import Careers from '../../pages/Careers';

// Legal route definitions
export const legalRoutes = {
  terms: {
    path: '/terms',
    element: <AppLayout><Terms /></AppLayout>
  },
  privacy: {
    path: '/privacy',
    element: <AppLayout><Privacy /></AppLayout>
  },
  disclaimer: {
    path: '/disclaimer',
    element: <AppLayout><Disclaimer /></AppLayout>
  },
  cookies: {
    path: '/cookies',
    element: <AppLayout><Cookies /></AppLayout>
  },
  careers: {
    path: '/careers',
    element: <AppLayout><Careers /></AppLayout>
  },
};
