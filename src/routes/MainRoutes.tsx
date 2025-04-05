
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import AppLayout from '../components/layout/AppLayout';
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
  return (
    <Routes>
      <Route path="/" element={<AppLayout><Home /></AppLayout>} />
      <Route path="/about" element={<AppLayout><AboutUs /></AppLayout>} />
      <Route path="/for-advisors" element={<AppLayout><ForAdvisors /></AppLayout>} />
      <Route path="/for-firms" element={<AppLayout><ForFirms /></AppLayout>} />
      <Route path="/for-consumers" element={<AppLayout><ForConsumers /></AppLayout>} />
      <Route path="/pricing" element={<AppLayout><Pricing /></AppLayout>} />
      <Route path="/sitemap" element={<AppLayout><Sitemap /></AppLayout>} />
      <Route path="/accessibility-test" element={<AppLayout><AccessibilityTestPage /></AppLayout>} />
      <Route 
        path="/security-accessibility" 
        element={
          <AppLayout>
            <Suspense fallback={<ComponentLoadingFallback />}>
              <LazySecurityAndAccessibilityPage />
            </Suspense>
          </AppLayout>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
