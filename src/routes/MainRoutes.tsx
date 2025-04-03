
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import AccessibilityTestPage from '../pages/AccessibilityTestPage';
import { lazy, Suspense } from 'react';
import { ComponentLoadingFallback } from '../components/LazyComponents';
import AboutUs from '../pages/AboutUs';
import ForAdvisors from '../pages/ForAdvisors';
import ForFirms from '../pages/ForFirms';
import ForConsumers from '../pages/ForConsumers';
import Pricing from '../pages/Pricing';
import Sitemap from '../pages/Sitemap';

// Lazily load the security and accessibility page
const LazySecurityAndAccessibilityPage = lazy(() => import('../pages/SecurityAndAccessibilityPage'));

const MainRoutes = () => {
  const isAdmin = true; // Replace with actual admin check

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard" element={<div>Dashboard Page</div>} />
      <Route path="profile" element={<div>User Profile Page</div>} />
      <Route path="advisor-profile/:advisorId" element={<div>Advisor Profile Page</div>} />
      <Route path="settings" element={<div>Settings Page</div>} />
      <Route path="onboarding" element={<div>Onboarding Page</div>} />
      <Route path="accessibility-test" element={<AccessibilityTestPage />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="for-advisors" element={<ForAdvisors />} />
      <Route path="for-firms" element={<ForFirms />} />
      <Route path="for-consumers" element={<ForConsumers />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="sitemap" element={<Sitemap />} />
      {isAdmin && <Route path="admin" element={<div>Admin Page</div>} />}
      <Route 
        path="security-accessibility" 
        element={
          <Suspense fallback={<ComponentLoadingFallback />}>
            <LazySecurityAndAccessibilityPage />
          </Suspense>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
