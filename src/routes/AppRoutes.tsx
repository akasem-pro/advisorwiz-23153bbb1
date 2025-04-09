
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import AppLayout from '../components/layout/AppLayout';
import AuthGuard from '../components/auth/AuthGuard';
import LandingPage from '../pages/LandingPage';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import Onboarding from '../pages/Onboarding';
import SignIn from '../pages/SignIn';
import Messages from '../pages/Messages';
import Chat from '../pages/Chat';
import Appointments from '../pages/Appointments';
import Billing from '../pages/Billing';
import Settings from '../pages/Settings';
import Matches from '../pages/Matches';
import Notifications from '../pages/Notifications';
import Resources from '../pages/Resources';
import Blog from '../pages/Blog';
import ForAdvisors from '../pages/ForAdvisors';
import ForFirms from '../pages/ForFirms';
import ForConsumers from '../pages/ForConsumers';
import Pricing from '../pages/Pricing';
import AdvisorProfile from '../pages/AdvisorProfile';
import ConsumerProfile from '../pages/ConsumerProfile';
import FirmProfile from '../pages/FirmProfile';

const AppRoutes: React.FC = () => {
  console.log("AppRoutes rendering");
  
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AppLayout><AboutUs /></AppLayout>} />
      <Route path="/contact" element={<AppLayout><ContactUs /></AppLayout>} />
      <Route path="/resources" element={<AppLayout><Resources /></AppLayout>} />
      <Route path="/sign-up" element={<Onboarding />} />
      <Route path="/signup" element={<Navigate to="/sign-up" replace />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/signin" element={<Navigate to="/sign-in" replace />} />
      <Route path="/login" element={<Navigate to="/sign-in" replace />} />
      
      {/* Marketing pages */}
      <Route path="/for-advisors" element={<AppLayout><ForAdvisors /></AppLayout>} />
      <Route path="/for-firms" element={<AppLayout><ForFirms /></AppLayout>} />
      <Route path="/for-consumers" element={<AppLayout><ForConsumers /></AppLayout>} />
      <Route path="/pricing" element={<AppLayout><Pricing /></AppLayout>} />
      <Route path="/blog/*" element={<AppLayout><Blog /></AppLayout>} />
      
      {/* Profile routes */}
      <Route path="/profile" element={<AppLayout><AdvisorProfile /></AppLayout>} />
      <Route path="/advisor-profile" element={<AppLayout><AdvisorProfile /></AppLayout>} />
      <Route path="/consumer-profile" element={<AppLayout><ConsumerProfile /></AppLayout>} />
      <Route path="/firm-profile" element={<AppLayout><FirmProfile /></AppLayout>} />
      
      {/* Protected routes */}
      <Route path="/messages" element={
        <AuthGuard>
          <AppLayout>
            <Messages />
          </AppLayout>
        </AuthGuard>
      } />
      
      <Route path="/chat/*" element={
        <AuthGuard>
          <AppLayout>
            <Chat />
          </AppLayout>
        </AuthGuard>
      } />
      
      <Route path="/appointments" element={
        <AuthGuard>
          <AppLayout>
            <Appointments />
          </AppLayout>
        </AuthGuard>
      } />
      
      <Route path="/billing" element={
        <AuthGuard>
          <AppLayout>
            <Billing />
          </AppLayout>
        </AuthGuard>
      } />
      
      <Route path="/settings" element={
        <AuthGuard>
          <AppLayout>
            <Settings />
          </AppLayout>
        </AuthGuard>
      } />
      
      <Route path="/matches" element={
        <AuthGuard>
          <AppLayout>
            <Matches />
          </AppLayout>
        </AuthGuard>
      } />
      
      <Route path="/notifications" element={
        <AuthGuard>
          <AppLayout>
            <Notifications />
          </AppLayout>
        </AuthGuard>
      } />

      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
