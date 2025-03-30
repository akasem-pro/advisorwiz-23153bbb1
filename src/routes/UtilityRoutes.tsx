import React from 'react';
import { Route } from 'react-router-dom';
import VerifyIntegrationsPage from '../pages/VerifyIntegrations';
import AccessibilityTestPage from '../pages/AccessibilityTestPage';

const UtilityRoutes = [
  <Route 
    key="verify-integrations" 
    path="/verify-integrations" 
    element={<VerifyIntegrationsPage />} 
  />,
  <Route 
    key="accessibility-test" 
    path="/accessibility-test" 
    element={<AccessibilityTestPage />} 
  />,
  // Other utility routes can be added here
];

export default UtilityRoutes;
