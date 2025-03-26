
import { Route, Routes } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import MobileLayout from '../components/layout/MobileLayout';
import NotFound from '../pages/NotFound';
import MainRoutes from './MainRoutes';
import DashboardRoutes from './DashboardRoutes';
import AuthRoutes from './AuthRoutes';
import { lazy, Suspense } from 'react';
import { PageLoadingFallback } from '../components/LazyComponents';

// Lazy loaded mobile pages
const LandingPage = lazy(() => import('../pages/LandingPage'));

const AppRoutes = () => {
  return (
    <Routes>
      {/* Mobile Routes */}
      <Route path="/m" element={<MobileLayout><Outlet /></MobileLayout>}>
        <Route index element={
          <Suspense fallback={<PageLoadingFallback />}>
            <LandingPage />
          </Suspense>
        } />
        {/* Add more mobile routes here as needed */}
      </Route>
      
      {/* Authentication Routes (no layout) */}
      <AuthRoutes />
      
      {/* Main Web Routes */}
      <Route path="/" element={<AppLayout><Outlet /></AppLayout>}>
        <MainRoutes />
        <DashboardRoutes />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
