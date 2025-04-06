import React from 'react';
import { lazy } from 'react';
import AppLayout from '../components/layout/AppLayout';
import AuthGuard from '../components/auth/AuthGuard';
import { PageLoadingFallback } from '../components/LazyComponents';

// Pages
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import ForAdvisors from '../pages/ForAdvisors';
import ForFirms from '../pages/ForFirms';
import ForConsumers from '../pages/ForConsumers';
import Pricing from '../pages/Pricing';
import Sitemap from '../pages/Sitemap';
import ContactUs from '../pages/ContactUs';
import Blog from '../pages/Blog';
import NotFound from '../pages/NotFound';
import AdvisorProfile from '../pages/AdvisorProfile';
import ConsumerProfile from '../pages/ConsumerProfile';
import FirmProfile from '../pages/FirmProfile';
import SignIn from '../pages/SignIn';
import Onboarding from '../pages/Onboarding';
import Resources from '../pages/Resources';

// Lazy loaded components
const LazySecurityAndAccessibilityPage = lazy(() => import('../pages/SecurityAndAccessibilityPage'));
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

// Route definitions
export const routes = {
  // Public routes
  home: {
    path: '/',
    element: <AppLayout><Home /></AppLayout>
  },
  about: {
    path: '/about',
    element: <AppLayout><AboutUs /></AppLayout>
  },
  forAdvisors: {
    path: '/for-advisors',
    element: <AppLayout><ForAdvisors /></AppLayout>
  },
  forFirms: {
    path: '/for-firms',
    element: <AppLayout><ForFirms /></AppLayout>
  },
  forConsumers: {
    path: '/for-consumers',
    element: <AppLayout><ForConsumers /></AppLayout>
  },
  pricing: {
    path: '/pricing',
    element: <AppLayout><Pricing /></AppLayout>
  },
  sitemap: {
    path: '/sitemap',
    element: <AppLayout><Sitemap /></AppLayout>
  },
  contact: {
    path: '/contact',
    element: <AppLayout><ContactUs /></AppLayout>
  },
  blog: {
    path: '/blog/*',
    element: <AppLayout><Blog /></AppLayout>
  },
  securityAccessibility: {
    path: '/security-accessibility',
    element: (
      <AppLayout>
        <React.Suspense fallback={<PageLoadingFallback />}>
          <LazySecurityAndAccessibilityPage />
        </React.Suspense>
      </AppLayout>
    )
  },
  
  // Profile routes (accessible to both authenticated and unauthenticated users)
  profile: {
    path: '/profile',
    element: <AppLayout><AdvisorProfile /></AppLayout>
  },
  advisorProfile: {
    path: '/advisor-profile',
    element: <AppLayout><AdvisorProfile /></AppLayout>
  },
  consumerProfile: {
    path: '/consumer-profile',
    element: <AppLayout><ConsumerProfile /></AppLayout>
  },
  firmProfile: {
    path: '/firm-profile',
    element: <AppLayout><FirmProfile /></AppLayout>
  },
  
  // Auth routes
  signin: {
    path: '/signin',
    element: <SignIn />
  },
  signup: {
    path: '/signup',
    element: <Onboarding />
  },
  
  // Protected dashboard routes
  advisorDashboard: {
    path: '/advisor-dashboard',
    element: (
      <AuthGuard userTypes={['advisor', 'firm_admin']}>
        <React.Suspense fallback={<PageLoadingFallback />}>
          <AppLayout><AdvisorDashboard /></AppLayout>
        </React.Suspense>
      </AuthGuard>
    )
  },
  consumerDashboard: {
    path: '/consumer-dashboard',
    element: (
      <AuthGuard userTypes={['consumer']}>
        <React.Suspense fallback={<PageLoadingFallback />}>
          <AppLayout><ConsumerDashboard /></AppLayout>
        </React.Suspense>
      </AuthGuard>
    )
  },
  firmDashboard: {
    path: '/firm-dashboard',
    element: (
      <AuthGuard userTypes={['firm_admin']}>
        <React.Suspense fallback={<PageLoadingFallback />}>
          <AppLayout><FirmDashboard /></AppLayout>
        </React.Suspense>
      </AuthGuard>
    )
  },
  adminAnalytics: {
    path: '/admin/analytics',
    element: (
      <AuthGuard userTypes={['admin']}>
        <React.Suspense fallback={<PageLoadingFallback />}>
          <AppLayout><AdminAnalytics /></AppLayout>
        </React.Suspense>
      </AuthGuard>
    )
  },
  schedule: {
    path: '/schedule',
    element: (
      <AuthGuard>
        <React.Suspense fallback={<PageLoadingFallback />}>
          <AppLayout><Schedule /></AppLayout>
        </React.Suspense>
      </AuthGuard>
    )
  },
  chat: {
    path: '/chat',
    element: (
      <AuthGuard>
        <React.Suspense fallback={<PageLoadingFallback />}>
          <AppLayout><Chat /></AppLayout>
        </React.Suspense>
      </AuthGuard>
    )
  },
  settings: {
    path: '/settings',
    element: (
      <AuthGuard>
        <React.Suspense fallback={<PageLoadingFallback />}>
          <AppLayout><Settings /></AppLayout>
        </React.Suspense>
      </AuthGuard>
    )
  },
  leads: {
    path: '/leads',
    element: (
      <AuthGuard>
        <React.Suspense fallback={<PageLoadingFallback />}>
          <AppLayout><LeadManagementPage /></AppLayout>
        </React.Suspense>
      </AuthGuard>
    )
  },
  analytics: {
    path: '/analytics',
    element: (
      <AuthGuard>
        <React.Suspense fallback={<PageLoadingFallback />}>
          <AppLayout><Analytics /></AppLayout>
        </React.Suspense>
      </AuthGuard>
    )
  },
  team: {
    path: '/team',
    element: (
      <AuthGuard>
        <React.Suspense fallback={<PageLoadingFallback />}>
          <AppLayout><Team /></AppLayout>
        </React.Suspense>
      </AuthGuard>
    )
  },
  
  // Resources and utility routes
  resources: {
    path: '/resources',
    element: <AppLayout><Resources /></AppLayout>
  },
  messages: {
    path: '/messages',
    element: <AppLayout><div>Messages Page</div></AppLayout>
  },
  appointments: {
    path: '/appointments',
    element: <AppLayout><div>Appointments Page</div></AppLayout>
  },
  billing: {
    path: '/billing',
    element: <AppLayout><div>Billing Page</div></AppLayout>
  },
  
  // Fallback route
  notFound: {
    path: '*',
    element: <NotFound />
  }
};

// Helper function to get route element by path
export const getRouteByPath = (path: string) => {
  return Object.values(routes).find(route => route.path === path);
};

// Helper function to get all routes as an array
export const getAllRoutes = () => {
  console.log("Getting all routes");
  return Object.values(routes);
};
