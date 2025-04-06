import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
import { useIsMobile } from '../hooks/use-mobile';
import MobileLayout from '../components/layout/MobileLayout';

// Lazily load the security and accessibility page
const LazySecurityAndAccessibilityPage = lazy(() => import('../pages/SecurityAndAccessibilityPage'));

const MainRoutes = () => {
  const isMobile = useIsMobile();
  
  // Select the appropriate layout based on device type
  const PageLayout = isMobile ? MobileLayout : AppLayout;
  
  console.log('MainRoutes rendering with path:', window.location.pathname);
  
  return (
    <Routes>
      {/* Main marketing pages */}
      <Route path="/about" element={<PageLayout><AboutUs /></PageLayout>} />
      <Route path="/for-advisors" element={<PageLayout><ForAdvisors /></PageLayout>} />
      <Route path="/for-firms" element={<PageLayout><ForFirms /></PageLayout>} />
      <Route path="/for-consumers" element={<PageLayout><ForConsumers /></PageLayout>} />
      <Route path="/pricing" element={<PageLayout><Pricing /></PageLayout>} />
      <Route path="/sitemap" element={<PageLayout><Sitemap /></PageLayout>} />
      <Route path="/contact" element={<PageLayout><ContactUs /></PageLayout>} />
      <Route path="/blog/*" element={<PageLayout><Blog /></PageLayout>} />
      
      {/* Other specialized pages */}
      <Route 
        path="/security-accessibility" 
        element={
          <PageLayout>
            <Suspense fallback={<ComponentLoadingFallback />}>
              <LazySecurityAndAccessibilityPage />
            </Suspense>
          </PageLayout>
        } 
      />
      
      {/* Fallback for any unmatched routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
