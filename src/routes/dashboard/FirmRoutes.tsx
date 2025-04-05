
import { lazy, Suspense } from 'react';
import { PageLoadingFallback } from '../../components/LazyComponents';
import AuthGuard from '../../components/auth/AuthGuard';
import AppLayout from '../../components/layout/AppLayout';

// Lazy loaded dashboard pages
const FirmDashboard = lazy(() => import('../../pages/FirmDashboard'));
const Team = lazy(() => import('../../pages/Team'));

// Define firm routes
const FirmRoutes = [
  {
    props: {
      path: "/firm-dashboard",
      element: (
        <AuthGuard userTypes={['firm_admin']}>
          <Suspense fallback={<PageLoadingFallback />}>
            <AppLayout><FirmDashboard /></AppLayout>
          </Suspense>
        </AuthGuard>
      )
    }
  },
  {
    props: {
      path: "/team",
      element: (
        <AuthGuard>
          <Suspense fallback={<PageLoadingFallback />}>
            <AppLayout><Team /></AppLayout>
          </Suspense>
        </AuthGuard>
      )
    }
  }
];

export default FirmRoutes;
