
import { Routes, Route, Outlet } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
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
          {/* Spread the mobile routes directly */}
          {MobileRoutes.map(route => (
            <Fragment key={route.key}>{route}</Fragment>
          ))}
        </Route>
        
        {/* Authentication Routes (no layout) */}
        {AuthRoutes.map(route => (
          <Fragment key={route.key}>{route}</Fragment>
        ))}
        
        {/* Contact page */}
        <Route path="/contact" element={<ContactUs />} />
        
        {/* Utility Routes - includes verification page and other utility pages */}
        {UtilityRoutes.map(route => (
          <Fragment key={route.key}>{route}</Fragment>
        ))}
        
        {/* Admin and utility pages with AppLayout */}
        <Route element={<AppLayout><Outlet /></AppLayout>}>
          {/* Direct routes that need AppLayout */}
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
        
        {/* Main Web Routes */}
        <Route path="/" element={<Outlet />}>
          {/* Spread the main routes and dashboard routes arrays */}
          {MainRoutes.map(route => (
            <Fragment key={route.key}>{route}</Fragment>
          ))}
          {DashboardRoutes.map(route => (
            <Fragment key={route.key}>{route}</Fragment>
          ))}
        </Route>
        
        {/* Not Found Route - must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
