
import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { PageLoadingFallback } from '../components/LazyComponents';

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

// Export dashboard routes as an array of Route components
const DashboardRoutes = [
  // Support for both dashboard path patterns
  <Route key="advisor-dashboard" path="dashboard/advisor" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <AdvisorDashboard />
    </Suspense>
  } />,
  <Route key="advisor-dashboard-alt" path="advisor-dashboard" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <AdvisorDashboard />
    </Suspense>
  } />,
  <Route key="consumer-dashboard" path="dashboard/consumer" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <ConsumerDashboard />
    </Suspense>
  } />,
  <Route key="consumer-dashboard-alt" path="consumer-dashboard" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <ConsumerDashboard />
    </Suspense>
  } />,
  <Route key="firm-dashboard" path="dashboard/firm" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <FirmDashboard />
    </Suspense>
  } />,
  <Route key="firm-dashboard-alt" path="firm-dashboard" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <FirmDashboard />
    </Suspense>
  } />,
  <Route key="schedule" path="schedule" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <Schedule />
    </Suspense>
  } />,
  <Route key="chat" path="chat" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <Chat />
    </Suspense>
  } />,
  <Route key="consumer-profile" path="consumer-profile" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <ConsumerProfile />
    </Suspense>
  } />,
  <Route key="advisor-profile-dashboard" path="advisor-profile" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <AdvisorProfile />
    </Suspense>
  } />,
  <Route key="firm-profile" path="firm-profile" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <FirmProfile />
    </Suspense>
  } />,
  <Route key="settings" path="settings" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <Settings />
    </Suspense>
  } />,
  <Route key="leads" path="leads" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <LeadManagementPage />
    </Suspense>
  } />,
  <Route key="analytics" path="analytics" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <Analytics />
    </Suspense>
  } />,
  <Route key="team" path="team" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <Team />
    </Suspense>
  } />
];

export default DashboardRoutes;
