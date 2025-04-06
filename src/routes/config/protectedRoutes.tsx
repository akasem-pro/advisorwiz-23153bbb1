
import React, { lazy } from 'react';
import AuthGuard from '../../components/auth/AuthGuard';
import AppLayout from '../../components/layout/AppLayout';
import { PageLoadingFallback } from '../../components/LazyComponents';
import Matches from '../../pages/Matches';
import Notifications from '../../pages/Notifications';
import CallClient from '../../pages/CallClient';
import CallClientSelect from '../../pages/CallClientSelect';
import ClientDetail from '../../pages/ClientDetail';
import Resources from '../../pages/Resources';
import { RouteConfig } from './types';

// Lazy loaded components
const AdvisorDashboard = lazy(() => import('../../pages/AdvisorDashboard'));
const ConsumerDashboard = lazy(() => import('../../pages/ConsumerDashboard'));
const FirmDashboard = lazy(() => import('../../pages/FirmDashboard'));
const Schedule = lazy(() => import('../../pages/Schedule'));
const Chat = lazy(() => import('../../pages/Chat'));
const Settings = lazy(() => import('../../pages/Settings'));
const LeadManagementPage = lazy(() => import('../../pages/LeadManagementPage'));
const Analytics = lazy(() => import('../../pages/Analytics'));
const Team = lazy(() => import('../../pages/Team'));
const AdminAnalytics = lazy(() => import('../../pages/AdminAnalytics'));

// Protected routes configuration
export const protectedRoutes: Record<string, RouteConfig> = {
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
  
  // Add the matches route
  matches: {
    path: '/matches',
    element: (
      <AuthGuard>
        <AppLayout><Matches /></AppLayout>
      </AuthGuard>
    )
  },
  
  // Add the notifications route
  notifications: {
    path: '/notifications',
    element: (
      <AuthGuard>
        <AppLayout><Notifications /></AppLayout>
      </AuthGuard>
    )
  },
  
  // Add the call client route
  call: {
    path: '/call/:clientId',
    element: (
      <AuthGuard>
        <CallClient />
      </AuthGuard>
    )
  },
  
  // Add the call client select route
  callSelect: {
    path: '/call/select',
    element: (
      <AuthGuard>
        <CallClientSelect />
      </AuthGuard>
    )
  },
  
  // Add client detail route
  clientDetail: {
    path: '/client/:clientId',
    element: (
      <AuthGuard userTypes={['advisor', 'firm_admin']}>
        <ClientDetail />
      </AuthGuard>
    )
  },
};
