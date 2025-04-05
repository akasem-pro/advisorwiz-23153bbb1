import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import AppLayout from '../components/layout/AppLayout';
import DashboardRoutes from './DashboardRoutes';
import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';
import UtilityRoutes from './UtilityRoutes';
import MobileRoutes from './MobileRoutes';
import { lazy, Suspense } from 'react';
import { PageLoadingFallback } from '../components/LazyComponents';
import NotFound from '../pages/NotFound';
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

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home route */}
      <Route path="/" element={<AppLayout><Home /></AppLayout>} />
      
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
            <Suspense fallback={<PageLoadingFallback />}>
              <LazySecurityAndAccessibilityPage />
            </Suspense>
          </AppLayout>
        } 
      />
      
      {/* Include Dashboard Routes */}
      {DashboardRoutes.map((route, index) => (
        <Route key={`dashboard-route-${index}`} {...route.props} />
      ))}
      
      {/* Include Auth Routes */}
      {AuthRoutes.map((route, index) => (
        <Route key={`auth-route-${index}`} path={route.path} element={route.element} />
      ))}
      
      {/* Include Utility Routes */}
      {UtilityRoutes.map((route, index) => (
        <Route key={`utility-route-${index}`} path={route.props.path} element={route.props.element} />
      ))}
      
      {/* Include Mobile Routes when needed */}
      {MobileRoutes.map((route, index) => (
        <Route key={`mobile-route-${index}`} path={route.props?.path || ''} element={route.props?.element} />
      ))}
      
      {/* 404 fallback route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
