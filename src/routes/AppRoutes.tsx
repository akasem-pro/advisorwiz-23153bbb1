
import { Routes, Route, Outlet } from 'react-router-dom';
import { Fragment } from 'react';
import AppLayout from '../components/layout/AppLayout';
import MobileLayout from '../components/layout/MobileLayout';
import NotFound from '../pages/NotFound';
import SignIn from '../pages/SignIn';
import OnboardingTour from '../components/onboarding/OnboardingTour';
import MainRoutes from './MainRoutes';
import DashboardRoutes from './DashboardRoutes';
import MobileRoutes from './MobileRoutes';

const AppRoutes = () => {
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
        <Route path="/login" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        
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
