import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import AppLayout from '../components/layout/AppLayout';
import { lazy, Suspense } from 'react';
import { ComponentLoadingFallback } from '../components/LazyComponents';
import AboutUs from '../pages/AboutUs';
import ForAdvisors from '../pages/ForAdvisors';
import ForFirms from '../pages/ForFirms';
import ForConsumers from '../pages/ForConsumers';
import Pricing from '../pages/Pricing';
import Sitemap from '../pages/Sitemap';
import ContactUs from '../pages/ContactUs';
import Blog from '../pages/Blog';

// Lazily load the security and accessibility page
const LazySecurityAndAccessibilityPage = lazy(() => import('../pages/SecurityAndAccessibilityPage'));

const MainRoutes = () => {
  return (
    <Routes>
      {/* Main marketing pages */}
      <Route path="/about" element={<AppLayout><AboutUs /></AppLayout>} />
      <Route path="/for-advisors" element={<AppLayout><ForAdvisors /></AppLayout>} />
      <Route path="/for-firms" element={<AppLayout><ForFirms /></AppLayout>} />
      <Route path="/for-consumers" element={<AppLayout><ForConsumers /></AppLayout>} />
      <Route path="/pricing" element={<AppLayout><Pricing /></AppLayout>} />
      <Route path="/sitemap" element={<AppLayout><Sitemap /></AppLayout>} />
      <Route path="/contact" element={<AppLayout><ContactUs /></AppLayout>} />
      <Route path="/blog/*" element={<AppLayout><Blog /></AppLayout>} />
      
      {/* Other specialized pages */}
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
      
      {/* Fallback for any unmatched routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
