
import React from 'react';
import AppLayout from '../../components/layout/AppLayout';
import AdvisorProfile from '../../pages/AdvisorProfile';
import ConsumerProfile from '../../pages/ConsumerProfile';
import FirmProfile from '../../pages/FirmProfile';

// Profile route definitions
export const profileRoutes = {
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
    element: <AppLayout><ConsumerProfile /></AppLayout>
  },
  firmProfile: {
    path: '/firm-profile',
    element: <AppLayout><FirmProfile /></AppLayout>
  },
};
