
import { Routes, Route, Outlet, Navigate, useNavigationType } from 'react-router-dom';
import { useEffect, useTransition } from 'react';
import AppLayout from '../components/layout/AppLayout';
import MobileLayout from '../components/layout/MobileLayout';
import NotFound from '../pages/NotFound';
import MainRoutes from './MainRoutes';
import DashboardRoutes from './DashboardRoutes';
import MobileRoutes from './MobileRoutes';
import AuthRoutes from './AuthRoutes';
import UtilityRoutes from './UtilityRoutes';
import { useLocation } from 'react-router-dom';
import Terms from '../pages/Terms';

// Redirects for auth paths and legacy dashboard paths
const redirectRoutes = [
  { path: '/login', to: '/signin' },
  { path: '/sign-in', to: '/signin' },
  { path: '/sign-up', to: '/signup' },
  { path: '/onboarding', to: '/signup' },
  // Add redirects for legacy dashboard paths
  { path: '/advisor-dashboard', to: '/dashboard/advisor' },
  { path: '/consumer-dashboard', to: '/dashboard/consumer' },
  { path: '/firm-dashboard', to: '/dashboard/firm' }
];

const AppRoutes = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Use startTransition for route changes to prevent suspension issues
    startTransition(() => {
      window.scrollTo(0, 0);
      console.log('Route changed:', location.pathname);
      const pageClass = 'page-' + (location.pathname.split('/')[1] || 'home');
      
      // Clean up previous page classes
      document.body.className = document.body.className
        .split(' ')
        .filter(cls => !cls.startsWith('page-'))
        .join(' ');
        
      // Add new page class
      document.body.classList.add(pageClass);
    });
    
    // Return cleanup function
    return () => {
      // Cleanup handled in the next effect
    };
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/m" element={<MobileLayout><Outlet /></MobileLayout>}>
          {MobileRoutes}
        </Route>
        
        {AuthRoutes}
        
        {redirectRoutes.map((redirect, index) => (
          <Route 
            key={`redirect-${index}`} 
            path={redirect.path} 
            element={<Navigate to={redirect.to} replace />} 
          />
        ))}
        
        {/* Main content routes */}
        <Route path="/" element={<AppLayout><Outlet /></AppLayout>}>
          {/* Directly use MainRoutes as they no longer include AppLayout wrapper */}
          {MainRoutes}
        </Route>
        
        {/* Handle terms page separately for testing */}
        <Route path="/terms" element={<AppLayout><Terms /></AppLayout>} />
        
        {/* Dashboard routes */}
        {DashboardRoutes}
        
        {UtilityRoutes}
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
