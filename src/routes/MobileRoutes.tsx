
import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { PageLoadingFallback } from '../components/LazyComponents';

// Lazy loaded mobile pages
const LandingPage = lazy(() => import('../pages/LandingPage'));

// MobileRoutes should return Route elements, not use Routes
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
