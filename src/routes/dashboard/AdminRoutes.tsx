
import { lazy, Suspense } from 'react';
import { PageLoadingFallback } from '../../components/LazyComponents';
import AuthGuard from '../../components/auth/AuthGuard';
import AppLayout from '../../components/layout/AppLayout';

// Lazy loaded dashboard pages
const AdminAnalytics = lazy(() => import('../../pages/AdminAnalytics'));

// Define admin routes
const AdminRoutes = [
  {
    props: {
      path: "/admin/analytics",
      element: (
        <AuthGuard userTypes={['admin']}>
          <Suspense fallback={<PageLoadingFallback />}>
            <AppLayout><AdminAnalytics /></AppLayout>
          </Suspense>
        </AuthGuard>
      )
    }
  }
];

export default AdminRoutes;
