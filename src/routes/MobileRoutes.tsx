
import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { PageLoadingFallback } from '../components/LazyComponents';

// Lazy loaded mobile pages
const LandingPage = lazy(() => import('../pages/LandingPage'));

// Export the mobile routes to be used in AppRoutes
const MobileRoutes = [
  <Route 
    key="mobile-landing" 
    index 
    element={
      <Suspense fallback={<PageLoadingFallback />}>
        <LandingPage />
      </Suspense>
    } 
  />
];

export default MobileRoutes;
