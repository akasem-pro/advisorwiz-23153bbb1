
import { lazy, Suspense } from 'react';
import { PageLoadingFallback } from '../../components/LazyComponents';
import AuthGuard from '../../components/auth/AuthGuard';
import AppLayout from '../../components/layout/AppLayout';

// Lazy loaded dashboard pages
const Schedule = lazy(() => import('../../pages/Schedule'));
const Chat = lazy(() => import('../../pages/Chat'));
const Settings = lazy(() => import('../../pages/Settings'));

// Define common routes accessible to all authenticated users
const CommonRoutes = [
  {
    props: {
      path: "/dashboard",
      element: (
        <AuthGuard>
          <AppLayout>
            <div>Dashboard Home</div>
          </AppLayout>
        </AuthGuard>
      )
    }
  },
  {
    props: {
      path: "/schedule",
      element: (
        <AuthGuard>
          <Suspense fallback={<PageLoadingFallback />}>
            <AppLayout><Schedule /></AppLayout>
          </Suspense>
        </AuthGuard>
      )
    }
  },
  {
    props: {
      path: "/chat",
      element: (
        <AuthGuard>
          <Suspense fallback={<PageLoadingFallback />}>
            <AppLayout><Chat /></AppLayout>
          </Suspense>
        </AuthGuard>
      )
    }
  },
  {
    props: {
      path: "/settings",
      element: (
        <AuthGuard>
          <Suspense fallback={<PageLoadingFallback />}>
            <AppLayout><Settings /></AppLayout>
          </Suspense>
        </AuthGuard>
      )
    }
  }
];

export default CommonRoutes;
