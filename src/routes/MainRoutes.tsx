
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Onboarding from '../pages/Onboarding';
import SignIn from '../pages/SignIn';
import NotFound from '../pages/NotFound';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { PageLoadingFallback } from '../components/LazyComponents';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import AdvisorProfile from '../pages/AdvisorProfile';
import ConsumerProfile from '../pages/ConsumerProfile';
import FirmProfile from '../pages/FirmProfile';
import Resources from '../pages/Resources';
import Matches from '../pages/Matches';
import Notifications from '../pages/Notifications';
import Blog from '../pages/Blog';
import Settings from '../pages/Settings';
import Billing from '../pages/Billing';
import Messages from '../pages/Messages';
import Appointments from '../pages/Appointments';
import ForAdvisors from '../pages/ForAdvisors';
import ForFirms from '../pages/ForFirms';
import ForConsumers from '../pages/ForConsumers';
import Pricing from '../pages/Pricing';

const MainRoutes: React.FC = () => {
  console.log("MainRoutes rendering");
  
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-up" element={<Onboarding />} />
      <Route path="/signup" element={<Onboarding />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/login" element={<Navigate to="/sign-in" replace />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/for-advisors" element={<ForAdvisors />} />
      <Route path="/for-firms" element={<ForFirms />} />
      <Route path="/for-consumers" element={<ForConsumers />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/blog/*" element={<Blog />} />
      
      {/* Profile routes */}
      <Route path="/profile" element={<AdvisorProfile />} />
      <Route path="/advisor-profile" element={<AdvisorProfile />} />
      <Route path="/consumer-profile" element={<ConsumerProfile />} />
      <Route path="/firm-profile" element={<FirmProfile />} />
      
      {/* User routes */}
      <Route path="/messages" element={<Messages />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/billing" element={<Billing />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/resources" element={<Resources />} />
      
      {/* Dashboard routes */}
      <Route 
        path="/advisor-dashboard" 
        element={
          <React.Suspense fallback={<PageLoadingFallback />}>
            <DashboardLayout>
              <div className="p-6">Advisor Dashboard</div>
            </DashboardLayout>
          </React.Suspense>
        } 
      />
      
      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
