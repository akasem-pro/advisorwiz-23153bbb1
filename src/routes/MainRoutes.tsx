
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Since these pages don't exist yet, we'll create simple placeholder components
const HomePage = () => <div>Home Page</div>;
const DashboardPage = () => <div>Dashboard Page</div>;
const UserProfilePage = () => <div>User Profile Page</div>;
const SettingsPage = () => <div>Settings Page</div>;
const AdminPage = () => <div>Admin Page</div>;
const NotFoundPage = () => <div>Not Found Page</div>;
const OnboardingPage = () => <div>Onboarding Page</div>;
const AdvisorProfilePage = () => <div>Advisor Profile Page</div>;
const AccessibilityTestPage = () => <div>Accessibility Test Page</div>;
const SecurityAndAccessibilityPage = () => <div>Security And Accessibility Page</div>;

const MainRoutes = () => {
  const isAdmin = true; // Replace with actual admin check

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/advisor-profile/:advisorId" element={<AdvisorProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/accessibility-test" element={<AccessibilityTestPage />} />
      {isAdmin && <Route path="/admin" element={<AdminPage />} />}
      <Route path="/security-accessibility" element={<SecurityAndAccessibilityPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default MainRoutes;
