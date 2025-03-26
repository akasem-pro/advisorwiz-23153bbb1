
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
import AccessibilityTestPage from '../pages/AccessibilityTestPage';
import { useLocation } from 'react-router-dom';

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
      <OnboardingTour />
      
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
        
        {/* Accessibility test page */}
        <Route path="/accessibility-test" element={<AccessibilityTestPage />} />
        
        {/* Main Web Routes */}
        <Route path="/" element={<AppLayout><Outlet /></AppLayout>}>
          {/* Spread the main routes and dashboard routes arrays */}
          {MainRoutes.map(route => (
            <Fragment key={route.key}>{route}</Fragment>
          ))}
          {DashboardRoutes.map(route => (
            <Fragment key={route.key}>{route}</Fragment>
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
