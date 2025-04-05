
import { lazy, Suspense } from 'react';
import { PageLoadingFallback } from '../components/LazyComponents';

// Lazy loaded mobile pages
const LandingPage = lazy(() => import('../pages/LandingPage'));

// Export the mobile routes to be used in AppRoutes
const MobileRoutes = [
  {
    props: {
      path: "mobile-landing",
      element: (
        <Suspense fallback={<PageLoadingFallback />}>
          <LandingPage />
        </Suspense>
      )
    }
  }
];

export default MobileRoutes;
