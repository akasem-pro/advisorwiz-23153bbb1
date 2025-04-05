
import { lazy, Suspense, ReactNode } from 'react';
import { RouteProps } from 'react-router-dom';
import { PageLoadingFallback } from '../components/LazyComponents';
import AuthGuard from '../components/auth/AuthGuard';

// Lazy loaded dashboard pages
const AdvisorDashboard = lazy(() => import('../pages/AdvisorDashboard'));
const ConsumerDashboard = lazy(() => import('../pages/ConsumerDashboard'));
const FirmDashboard = lazy(() => import('../pages/FirmDashboard'));
const Schedule = lazy(() => import('../pages/Schedule'));
const Chat = lazy(() => import('../pages/Chat'));
const ConsumerProfile = lazy(() => import('../pages/ConsumerProfile'));
const FirmProfile = lazy(() => import('../pages/FirmProfile'));
const Settings = lazy(() => import('../pages/Settings'));
const LeadManagementPage = lazy(() => import('../pages/LeadManagementPage'));
const AdvisorProfile = lazy(() => import('../pages/AdvisorProfile'));
const Analytics = lazy(() => import('../pages/Analytics'));
const Team = lazy(() => import('../pages/Team'));
const AdminAnalytics = lazy(() => import('../pages/AdminAnalytics'));

// Define the route object type
interface DashboardRouteType {
  props: RouteProps;
}

// Create dashboard routes array with proper typing
const DashboardRoutes: DashboardRouteType[] = [
  {
    props: {
      path: "dashboard",
      element: <div>Dashboard Home</div>
    }
  },
  
  {
    props: {
      path: "advisor-dashboard",
      element: (
        <AuthGuard userTypes={['advisor', 'firm_admin']}>
          <Suspense fallback={<PageLoadingFallback />}>
            <AdvisorDashboard />
          </Suspense>
        </AuthGuard>
      )
    }
  },
  
  {
    props: {
      path: "consumer-dashboard",
      element: (
        <AuthGuard userTypes={['consumer']}>
          <Suspense fallback={<PageLoadingFallback />}>
            <ConsumerDashboard />
          </Suspense>
        </AuthGuard>
      )
    }
  },
  
  {
    props: {
      path: "firm-dashboard",
      element: (
        <AuthGuard userTypes={['firm_admin']}>
          <Suspense fallback={<PageLoadingFallback />}>
            <FirmDashboard />
          </Suspense>
        </AuthGuard>
      )
    }
  },
  
  {
    props: {
      path: "admin/analytics",
      element: (
        <AuthGuard userTypes={['admin']}>
          <Suspense fallback={<PageLoadingFallback />}>
            <AdminAnalytics />
          </Suspense>
        </AuthGuard>
      )
    }
  },
  
  {
    props: {
      path: "schedule",
      element: (
        <AuthGuard>
          <Suspense fallback={<PageLoadingFallback />}>
            <Schedule />
          </Suspense>
        </AuthGuard>
      )
    }
  },
  
  {
    props: {
      path: "chat",
      element: (
        <AuthGuard>
          <Suspense fallback={<PageLoadingFallback />}>
            <Chat />
          </Suspense>
        </AuthGuard>
      )
    }
  },
  
  {
    props: {
      path: "consumer-profile",
      element: (
        <AuthGuard>
          <Suspense fallback={<PageLoadingFallback />}>
            <ConsumerProfile />
          </Suspense>
        </AuthGuard>
      )
    }
  },
  
  {
    props: {
      path: "advisor-profile",
      element: (
        <AuthGuard>
          <Suspense fallback={<PageLoadingFallback />}>
            <AdvisorProfile />
          </Suspense>
        </AuthGuard>
      )
    }
  },
  
  {
    props: {
      path: "firm-profile",
      element: (
        <AuthGuard>
          <Suspense fallback={<PageLoadingFallback />}>
            <FirmProfile />
          </Suspense>
        </AuthGuard>
      )
    }
  },
  
  {
    props: {
      path: "settings",
      element: (
        <AuthGuard>
          <Suspense fallback={<PageLoadingFallback />}>
            <Settings />
          </Suspense>
        </AuthGuard>
      )
    }
  },
  
  {
    props: {
      path: "leads",
      element: (
        <AuthGuard>
          <Suspense fallback={<PageLoadingFallback />}>
            <LeadManagementPage />
          </Suspense>
        </AuthGuard>
      )
    }
  },
  
  {
    props: {
      path: "analytics",
      element: (
        <AuthGuard>
          <Suspense fallback={<PageLoadingFallback />}>
            <Analytics />
          </Suspense>
        </AuthGuard>
      )
    }
  },
  
  {
    props: {
      path: "team",
      element: (
        <AuthGuard>
          <Suspense fallback={<PageLoadingFallback />}>
            <Team />
          </Suspense>
        </AuthGuard>
      )
    }
  }
];

export default DashboardRoutes;
