
import { lazy, Suspense } from 'react';
import { PageLoadingFallback } from '../../components/LazyComponents';
import AuthGuard from '../../components/auth/AuthGuard';
import AppLayout from '../../components/layout/AppLayout';

// Lazy loaded dashboard pages
const ConsumerDashboard = lazy(() => import('../../pages/ConsumerDashboard'));

// Define consumer routes
const ConsumerRoutes = [
  {
    props: {
      path: "/consumer-dashboard",
      element: (
        <AuthGuard userTypes={['consumer']}>
          <Suspense fallback={<PageLoadingFallback />}>
            <AppLayout><ConsumerDashboard /></AppLayout>
          </Suspense>
        </AuthGuard>
      )
    }
  }
];

export default ConsumerRoutes;
