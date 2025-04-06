import { lazy, Suspense, ReactNode } from 'react';
import { RouteProps } from 'react-router-dom';
import { PageLoadingFallback } from '../components/LazyComponents';
import AuthGuard from '../components/auth/AuthGuard';
import AppLayout from '../components/layout/AppLayout';

// Lazy loaded dashboard pages
const AdvisorDashboard = lazy(() => import('../pages/AdvisorDashboard'));
const ConsumerDashboard = lazy(() => import('../pages/ConsumerDashboard'));
const FirmDashboard = lazy(() => import('../pages/FirmDashboard'));
const Schedule = lazy(() => import('../pages/Schedule'));
const Chat = lazy(() => import('../pages/Chat'));
const Settings = lazy(() => import('../pages/Settings'));
const LeadManagementPage = lazy(() => import('../pages/LeadManagementPage'));
const Analytics = lazy(() => import('../pages/Analytics'));
const Team = lazy(() => import('../pages/Team'));
const AdminAnalytics = lazy(() => import('../pages/AdminAnalytics'));

// Define the route object type
interface DashboardRouteType {
  path: string;
  element: React.ReactNode;
}

// Create dashboard routes array with proper typing
const DashboardRoutes: DashboardRouteType[] = [
  {
    path: "/dashboard",
    element: (
      <AuthGuard>
        <AppLayout>
          <div>Dashboard Home</div>
        </AppLayout>
      </AuthGuard>
    )
  },
  
  {
    path: "/advisor-dashboard",
    element: (
      <AuthGuard userTypes={['advisor', 'firm_admin']}>
        <Suspense fallback={<PageLoadingFallback />}>
          <AppLayout><AdvisorDashboard /></AppLayout>
        </Suspense>
      </AuthGuard>
    )
  },
  
  {
    path: "/consumer-dashboard",
    element: (
      <AuthGuard userTypes={['consumer']}>
        <Suspense fallback={<PageLoadingFallback />}>
          <AppLayout><ConsumerDashboard /></AppLayout>
        </Suspense>
      </AuthGuard>
    )
  },
  
  {
    path: "/firm-dashboard",
    element: (
      <AuthGuard userTypes={['firm_admin']}>
        <Suspense fallback={<PageLoadingFallback />}>
          <AppLayout><FirmDashboard /></AppLayout>
        </Suspense>
      </AuthGuard>
    )
  },
  
  {
    path: "/admin/analytics",
    element: (
      <AuthGuard userTypes={['admin']}>
        <Suspense fallback={<PageLoadingFallback />}>
          <AppLayout><AdminAnalytics /></AppLayout>
        </Suspense>
      </AuthGuard>
    )
  },
  
  {
    path: "/schedule",
    element: (
      <AuthGuard>
        <Suspense fallback={<PageLoadingFallback />}>
          <AppLayout><Schedule /></AppLayout>
        </Suspense>
      </AuthGuard>
    )
  },
  
  {
    path: "/chat",
    element: (
      <AuthGuard>
        <Suspense fallback={<PageLoadingFallback />}>
          <AppLayout><Chat /></AppLayout>
        </Suspense>
      </AuthGuard>
    )
  },
  
  {
    path: "settings",
    element: (
      <AuthGuard>
        <Suspense fallback={<PageLoadingFallback />}>
          <AppLayout><Settings /></AppLayout>
        </Suspense>
      </AuthGuard>
    )
  },
  
  {
    path: "leads",
    element: (
      <AuthGuard>
        <Suspense fallback={<PageLoadingFallback />}>
          <AppLayout><LeadManagementPage /></AppLayout>
        </Suspense>
      </AuthGuard>
    )
  },
  
  {
    path: "analytics",
    element: (
      <AuthGuard>
        <Suspense fallback={<PageLoadingFallback />}>
          <AppLayout><Analytics /></AppLayout>
        </Suspense>
      </AuthGuard>
    )
  },
  
  {
    path: "team",
    element: (
      <AuthGuard>
        <Suspense fallback={<PageLoadingFallback />}>
          <AppLayout><Team /></AppLayout>
        </Suspense>
      </AuthGuard>
    )
  }
];

export default DashboardRoutes;
