
import React from 'react';
import { RouteItem } from './routeConfig';
import VerifyIntegrationsPage from '../pages/VerifyIntegrations';
import AccessibilityTestPage from '../pages/AccessibilityTestPage';
import AppLayout from '../components/layout/AppLayout';

const UtilityRoutes: RouteItem[] = [
  {
    path: "/verify-integrations",
    element: (
      <AppLayout>
        <VerifyIntegrationsPage />
      </AppLayout>
    )
  },
  {
    path: "/accessibility-test",
    element: (
      <AppLayout>
        <AccessibilityTestPage />
      </AppLayout>
    )
  }
  // Other utility routes can be added here
];

export default UtilityRoutes;
