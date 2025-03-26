
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

/**
 * Dashboard routes definition - this component returns Route elements
 * to be used within a parent Route component.
 * 
 * Note: This component is kept for reference but is not directly used in AppRoutes.
 * The routes are defined inline in AppRoutes.tsx.
 */
const DashboardRoutes = () => {
  return (
    <>
      <Route path="dashboard/advisor" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <AdvisorDashboard />
        </Suspense>
      } />
      <Route path="dashboard/consumer" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <ConsumerDashboard />
        </Suspense>
      } />
      <Route path="dashboard/firm" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <FirmDashboard />
        </Suspense>
      } />
      <Route path="schedule" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <Schedule />
        </Suspense>
      } />
      <Route path="chat" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <Chat />
        </Suspense>
      } />
      <Route path="profile/consumer" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <ConsumerProfile />
        </Suspense>
      } />
      <Route path="profile/firm" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <FirmProfile />
        </Suspense>
      } />
      <Route path="settings" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <Settings />
        </Suspense>
      } />
      <Route path="leads" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <LeadManagementPage />
        </Suspense>
      } />
    </>
  );
};

export default DashboardRoutes;
