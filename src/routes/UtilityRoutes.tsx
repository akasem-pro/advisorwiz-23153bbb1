import React from 'react';
import { Route } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import VerifyIntegrationsPage from '../pages/VerifyIntegrations';
import AccessibilityTestPage from '../pages/AccessibilityTestPage';

const UtilityRoutes = [
  <Route 
    key="verify-integrations" 
    path="/verify-integrations" 
    element={
      <AppLayout>
        <VerifyIntegrationsPage />
      </AppLayout>
    } 
  />,
  <Route 
    key="accessibility-test" 
    path="/accessibility-test" 
    element={
      <AppLayout>
        <AccessibilityTestPage />
      </AppLayout>
    } 
  />,
  // Other utility routes can be added here
];

export default UtilityRoutes;
