
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';
import MobileLayout from '../components/layout/MobileLayout';
import NotFound from '../pages/NotFound';
import SignIn from '../pages/SignIn';
import OnboardingTour from '../components/onboarding/OnboardingTour';
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

const AppRoutes = () => {
  const location = useLocation();

  // Track page route changes for analytics or other purposes
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // You could add analytics tracking here
    console.log('Route changed:', location.pathname);
    
    // Apply page-specific body classes if needed
    document.body.classList.add('page-' + location.pathname.split('/')[1] || 'home');
    
    return () => {
      // Clean up any page-specific body classes
      document.body.classList.remove('page-' + location.pathname.split('/')[1] || 'home');
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
        <Route path="/login" element={<Navigate to="/signin" replace />} />
        <Route path="/sign-in" element={<Navigate to="/signin" replace />} />
        <Route path="/sign-up" element={<Navigate to="/signup" replace />} />
        <Route path="/onboarding" element={<Navigate to="/signup" replace />} />
        
        {/* Content pages */}
        <Route element={<AppLayout><Outlet /></AppLayout>}>
          {/* Direct routes with AppLayout */}
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog/*" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/download" element={<DownloadApp />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/consumer-profile" element={<ConsumerProfile />} />
        </Route>
        
        {/* Utility Routes with their own layouts */}
        {UtilityRoutes}
        
        {/* Main Web Routes */}
        <Route path="/" element={<Outlet />}>
          {MainRoutes}
          {DashboardRoutes}
        </Route>
        
        {/* Not Found Route - must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
