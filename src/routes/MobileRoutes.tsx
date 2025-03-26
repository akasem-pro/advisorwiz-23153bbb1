
import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { PageLoadingFallback } from '../components/LazyComponents';

// Lazy loaded mobile pages
const LandingPage = lazy(() => import('../pages/LandingPage'));
const MobileDashboard = lazy(() => import('../pages/MobileDashboard'));

/**
 * MobileRoutes defines routes for the mobile version of the application.
 * Note: This component returns Route elements to be used within a parent Route.
 */
const MobileRoutes = () => {
  return (
    <>
      <Route index element={
        <Suspense fallback={<PageLoadingFallback />}>
          <LandingPage />
        </Suspense>
      } />
    </>
  );
};

export default MobileRoutes;
