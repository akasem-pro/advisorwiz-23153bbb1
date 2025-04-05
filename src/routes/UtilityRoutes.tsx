import React from 'react';
import VerifyIntegrationsPage from '../pages/VerifyIntegrations';
import AccessibilityTestPage from '../pages/AccessibilityTestPage';
import AppLayout from '../components/layout/AppLayout';

const UtilityRoutes = [
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
