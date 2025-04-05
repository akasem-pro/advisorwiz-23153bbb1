
import { lazy, Suspense } from 'react';
import { PageLoadingFallback } from '../../components/LazyComponents';
import AuthGuard from '../../components/auth/AuthGuard';
import AppLayout from '../../components/layout/AppLayout';

// Lazy loaded dashboard pages
const AdvisorDashboard = lazy(() => import('../../pages/AdvisorDashboard'));
const LeadManagementPage = lazy(() => import('../../pages/LeadManagementPage'));
const Analytics = lazy(() => import('../../pages/Analytics'));

// Define advisor routes
const AdvisorRoutes = [
  {
    props: {
      path: "/advisor-dashboard",
      element: (
        <AuthGuard userTypes={['advisor', 'firm_admin']}>
          <Suspense fallback={<PageLoadingFallback />}>
            <AppLayout><AdvisorDashboard /></AppLayout>
          </Suspense>
        </AuthGuard>
      )
    }
  },
  {
    props: {
      path: "/leads",
      element: (
        <AuthGuard>
          <Suspense fallback={<PageLoadingFallback />}>
            <AppLayout><LeadManagementPage /></AppLayout>
          </Suspense>
        </AuthGuard>
      )
    }
  },
  {
    props: {
      path: "/analytics",
      element: (
        <AuthGuard>
          <Suspense fallback={<PageLoadingFallback />}>
            <AppLayout><Analytics /></AppLayout>
          </Suspense>
        </AuthGuard>
      )
    }
  }
];

export default AdvisorRoutes;
