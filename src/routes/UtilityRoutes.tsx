
import { Route } from 'react-router-dom';
import VerifyIntegrationsPage from '../pages/VerifyIntegrations';

// Export utility routes as an array of Route components
const UtilityRoutes = [
  <Route key="verify-integrations" path="/verify-integrations" element={<VerifyIntegrationsPage />} />
];

export default UtilityRoutes;
