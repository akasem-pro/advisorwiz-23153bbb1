import React from 'react';
import VerifyIntegrationsPage from '../pages/VerifyIntegrations';
import AccessibilityTestPage from '../pages/AccessibilityTestPage';
import AppLayout from '../components/layout/AppLayout';

const UtilityRoutes = [
  {
    props: {
      path: "verify-integrations",
      element: (
        <AppLayout>
          <VerifyIntegrationsPage />
        </AppLayout>
      )
    }
  },
  {
    props: {
      path: "accessibility-test",
      element: (
        <AppLayout>
          <AccessibilityTestPage />
        </AppLayout>
      )
    }
  }
  // Other utility routes can be added here
];

export default UtilityRoutes;
