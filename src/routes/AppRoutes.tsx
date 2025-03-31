
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';
import MobileLayout from '../components/layout/MobileLayout';
import NotFound from '../pages/NotFound';
import MainRoutes from './MainRoutes';
import DashboardRoutes from './DashboardRoutes';
import MobileRoutes from './MobileRoutes';
import AuthRoutes from './AuthRoutes';
import UtilityRoutes from './UtilityRoutes';
import { useLocation } from 'react-router-dom';
import ContactUs from '../pages/ContactUs';
import Team from '../pages/Team';
import Blog from '../pages/Blog';
import Careers from '../pages/Careers';
import Resources from '../pages/Resources';
import DownloadApp from '../pages/DownloadApp';
import Sitemap from '../pages/Sitemap';
import Schedule from '../pages/Schedule';
import Chat from '../pages/Chat';
import ConsumerProfile from '../pages/ConsumerProfile';

// Group route definitions for better organization
const contentPageRoutes = [
  { path: 'contact', element: <ContactUs /> },
  { path: 'team', element: <Team /> },
  { path: 'blog/*', element: <Blog /> },
  { path: 'careers', element: <Careers /> },
  { path: 'resources', element: <Resources /> },
  { path: 'download', element: <DownloadApp /> },
  { path: 'sitemap', element: <Sitemap /> },
  { path: 'schedule', element: <Schedule /> },
  { path: 'chat', element: <Chat /> },
  { path: 'consumer-profile', element: <ConsumerProfile /> }
];

// Auth redirect routes
const redirectRoutes = [
  { path: '/login', to: '/signin' },
  { path: '/sign-in', to: '/signin' },
  { path: '/sign-up', to: '/signup' },
  { path: '/onboarding', to: '/signup' }
];

const AppRoutes = () => {
  const location = useLocation();

  // Track page route changes for analytics
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // You could add analytics tracking here
    console.log('Route changed:', location.pathname);
    
    // Apply page-specific body classes if needed
    const pageClass = 'page-' + (location.pathname.split('/')[1] || 'home');
    document.body.classList.add(pageClass);
    
    return () => {
      // Clean up any page-specific body classes
      document.body.classList.remove(pageClass);
    };
  }, [location.pathname]);

  return (
    <>
      {/* Global onboarding tour - context-aware based on route */}
      <div className="relative z-[9999]">
        <OnboardingTour />
      </div>
      
      <Routes>
        {/* Mobile Routes wrapped in MobileLayout */}
        <Route path="/m" element={<MobileLayout><Outlet /></MobileLayout>}>
          {MobileRoutes}
        </Route>
        
        {/* Authentication Routes (no layout) */}
        {AuthRoutes}
        
        {/* Redirects for old auth routes */}
        {redirectRoutes.map((redirect, index) => (
          <Route 
            key={`redirect-${index}`} 
            path={redirect.path} 
            element={<Navigate to={redirect.to} replace />} 
          />
        ))}
        
        {/* Content pages */}
        <Route path="/" element={<Outlet />}>
          {/* Content page routes with consistent layout */}
          {contentPageRoutes.map((routeProps, index) => (
            <Route 
              key={`content-${index}`} 
              path={routeProps.path} 
              element={
                <AppLayout hideFooter={true}>
                  {routeProps.element}
                </AppLayout>
              } 
            />
          ))}
          
          {/* Main Web Routes */}
          {MainRoutes}
          {DashboardRoutes}
        </Route>
        
        {/* Utility Routes with their own layouts */}
        {UtilityRoutes}
        
        {/* Not Found Route - must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
