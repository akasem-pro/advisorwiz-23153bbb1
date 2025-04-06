
import React from 'react';
import AppLayout from '../../components/layout/AppLayout';
import AdvisorProfile from '../../pages/AdvisorProfile';
import ConsumerProfile from '../../pages/ConsumerProfile';
import FirmProfile from '../../pages/FirmProfile';
import { RouteConfig } from './types';

// Profile routes configuration
export const profileRoutes: Record<string, RouteConfig> = {
  // Profile routes (accessible to both authenticated and unauthenticated users)
  profile: {
    path: '/profile',
    element: <AppLayout><AdvisorProfile /></AppLayout>
  },
  advisorProfile: {
    path: '/advisor-profile',
    element: <AppLayout><AdvisorProfile /></AppLayout>
  },
  consumerProfile: {
    path: '/consumer-profile',
    element: <AppLayout><ConsumerProfile /></AppLayout>,
    meta: {
      publicRoute: true // Ensure this is accessible without authentication
    }
  },
  firmProfile: {
    path: '/firm-profile',
    element: <AppLayout><FirmProfile /></AppLayout>
  },
};
