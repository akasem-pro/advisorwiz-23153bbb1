
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import AccessibilityTestPage from '../pages/AccessibilityTestPage';
import { lazy, Suspense } from 'react';
import { ComponentLoadingFallback } from '../components/LazyComponents';

// Lazily load the security and accessibility page
const LazySecurityAndAccessibilityPage = lazy(() => import('../pages/SecurityAndAccessibilityPage'));

// Since some pages don't exist yet, we'll create simple placeholder components
const DashboardPage = () => <div>Dashboard Page</div>;
const UserProfilePage = () => <div>User Profile Page</div>;
const SettingsPage = () => <div>Settings Page</div>;
const AdminPage = () => <div>Admin Page</div>;
const OnboardingPage = () => <div>Onboarding Page</div>;
const AdvisorProfilePage = () => <div>Advisor Profile Page</div>;

const MainRoutes = () => {
  const isAdmin = true; // Replace with actual admin check

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/advisor-profile/:advisorId" element={<AdvisorProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/accessibility-test" element={<AccessibilityTestPage />} />
      {isAdmin && <Route path="/admin" element={<AdminPage />} />}
      <Route 
        path="/security-accessibility" 
        element={
          <Suspense fallback={<ComponentLoadingFallback />}>
            <LazySecurityAndAccessibilityPage />
          </Suspense>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
