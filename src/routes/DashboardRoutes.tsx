import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
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

// Export dashboard routes as an array of Route components
const DashboardRoutes = [
  // Support for both dashboard path patterns
  <Route key="advisor-dashboard" path="dashboard/advisor" element={
    <AuthGuard userTypes={['advisor', 'firm_admin']}>
      <Suspense fallback={<PageLoadingFallback />}>
        <AdvisorDashboard />
      </Suspense>
    </AuthGuard>
  } />,
  <Route key="advisor-dashboard-alt" path="advisor-dashboard" element={
    <AuthGuard userTypes={['advisor', 'firm_admin']}>
      <Suspense fallback={<PageLoadingFallback />}>
        <AdvisorDashboard />
      </Suspense>
    </AuthGuard>
  } />,
  <Route key="consumer-dashboard" path="dashboard/consumer" element={
    <AuthGuard userTypes={['consumer']}>
      <Suspense fallback={<PageLoadingFallback />}>
        <ConsumerDashboard />
      </Suspense>
    </AuthGuard>
  } />,
  <Route key="consumer-dashboard-alt" path="consumer-dashboard" element={
    <AuthGuard userTypes={['consumer']}>
      <Suspense fallback={<PageLoadingFallback />}>
        <ConsumerDashboard />
      </Suspense>
    </AuthGuard>
  } />,
  <Route key="firm-dashboard" path="dashboard/firm" element={
    <AuthGuard userTypes={['firm_admin']}>
      <Suspense fallback={<PageLoadingFallback />}>
        <FirmDashboard />
      </Suspense>
    </AuthGuard>
  } />,
  <Route key="firm-dashboard-alt" path="firm-dashboard" element={
    <AuthGuard userTypes={['firm_admin']}>
      <Suspense fallback={<PageLoadingFallback />}>
        <FirmDashboard />
      </Suspense>
    </AuthGuard>
  } />,
  <Route key="admin-analytics" path="admin/analytics" element={
    <AuthGuard userTypes={['admin']}>
      <Suspense fallback={<PageLoadingFallback />}>
        <AdminAnalytics />
      </Suspense>
    </AuthGuard>
  } />,
  <Route key="schedule" path="schedule" element={
    <AuthGuard>
      <Suspense fallback={<PageLoadingFallback />}>
        <Schedule />
      </Suspense>
    </AuthGuard>
  } />,
  <Route key="chat" path="chat" element={
    <AuthGuard>
      <Suspense fallback={<PageLoadingFallback />}>
        <Chat />
      </Suspense>
    </AuthGuard>
  } />,
  <Route key="consumer-profile" path="consumer-profile" element={
    <AuthGuard>
      <Suspense fallback={<PageLoadingFallback />}>
        <ConsumerProfile />
      </Suspense>
    </AuthGuard>
  } />,
  <Route key="advisor-profile-dashboard" path="advisor-profile" element={
    <AuthGuard>
      <Suspense fallback={<PageLoadingFallback />}>
        <AdvisorProfile />
      </Suspense>
    </AuthGuard>
  } />,
  <Route key="firm-profile" path="firm-profile" element={
    <AuthGuard>
      <Suspense fallback={<PageLoadingFallback />}>
        <FirmProfile />
      </Suspense>
    </AuthGuard>
  } />,
  <Route key="settings" path="settings" element={
    <AuthGuard>
      <Suspense fallback={<PageLoadingFallback />}>
        <Settings />
      </Suspense>
    </AuthGuard>
  } />,
  <Route key="leads" path="leads" element={
    <AuthGuard>
      <Suspense fallback={<PageLoadingFallback />}>
        <LeadManagementPage />
      </Suspense>
    </AuthGuard>
  } />,
  <Route key="analytics" path="analytics" element={
    <AuthGuard>
      <Suspense fallback={<PageLoadingFallback />}>
        <Analytics />
      </Suspense>
    </AuthGuard>
  } />,
  <Route key="team" path="team" element={
    <AuthGuard>
      <Suspense fallback={<PageLoadingFallback />}>
        <Team />
      </Suspense>
    </AuthGuard>
  } />
];

export default DashboardRoutes;
