import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import UserProfilePage from '../pages/UserProfilePage';
import SettingsPage from '../pages/SettingsPage';
import AdminPage from '../pages/AdminPage';
import NotFoundPage from '../pages/NotFoundPage';
import OnboardingPage from '../pages/OnboardingPage';
import AdvisorProfilePage from '../pages/AdvisorProfilePage';
import AccessibilityTestPage from '../pages/AccessibilityTestPage';
import SecurityAndAccessibilityPage from '../pages/SecurityAndAccessibilityPage';

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
