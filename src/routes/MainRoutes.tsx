
import React from 'react';
import { Route } from 'react-router-dom';
import Blog from '../pages/Blog';
import ForAdvisors from '../pages/ForAdvisors';
import ForFirms from '../pages/ForFirms';
import ForConsumers from '../pages/ForConsumers';
import Pricing from '../pages/Pricing';
import AdvisorProfile from '../pages/AdvisorProfile';
import ConsumerProfile from '../pages/ConsumerProfile';
import FirmProfile from '../pages/FirmProfile';
import AppLayout from '../components/layout/AppLayout';

const MainRoutes: React.FC = () => {
  console.log("MainRoutes rendering");
  
  return (
    <>
      {/* Public routes not already defined in AppRoutes */}
      <Route path="/for-advisors" element={<AppLayout><ForAdvisors /></AppLayout>} />
      <Route path="/for-firms" element={<AppLayout><ForFirms /></AppLayout>} />
      <Route path="/for-consumers" element={<AppLayout><ForConsumers /></AppLayout>} />
      <Route path="/pricing" element={<AppLayout><Pricing /></AppLayout>} />
      <Route path="/blog/*" element={<AppLayout><Blog /></AppLayout>} />
      
      {/* Profile routes */}
      <Route path="/profile" element={<AppLayout><AdvisorProfile /></AppLayout>} />
      <Route path="/advisor-profile" element={<AppLayout><AdvisorProfile /></AppLayout>} />
      <Route path="/consumer-profile" element={<AppLayout><ConsumerProfile /></AppLayout>} />
      <Route path="/firm-profile" element={<AppLayout><FirmProfile /></AppLayout>} />
    </>
  );
};

export default MainRoutes;
