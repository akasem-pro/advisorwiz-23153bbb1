
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import ConsumerProfile from './pages/ConsumerProfile';
import AdvisorProfile from './pages/AdvisorProfile';
import FirmProfile from './pages/FirmProfile';
import ConsumerDashboard from './pages/ConsumerDashboard';
import AdvisorDashboard from './pages/AdvisorDashboard';
import FirmDashboard from './pages/FirmDashboard';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './features/auth/context/AuthProvider';
import Home from './pages/Home';
import ForFirms from './pages/ForFirms';
import Pricing from './pages/Pricing';
import ContactUs from './pages/ContactUs';
import Sitemap from './pages/Sitemap';
import Blog from './pages/Blog';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import ForAdvisors from './pages/ForAdvisors';
import ForConsumers from './pages/ForConsumers';
import Careers from './pages/Careers';
import AboutUs from './pages/AboutUs';
import Resources from './pages/Resources';
import RealtimeSubscriptionProvider from './components/providers/RealtimeSubscriptionProvider';
import Settings from './pages/Settings';
import AuthGuard from './components/auth/AuthGuard';
import UserOnboardingTour from './components/onboarding/UserOnboardingTour';
import AccessibilityTestPage from './pages/AccessibilityTestPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <RealtimeSubscriptionProvider>
          {/* Add the UserOnboardingTour component */}
          <UserOnboardingTour />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/for-firms" element={<ForFirms />} />
            <Route path="/for-advisors" element={<ForAdvisors />} />
            <Route path="/for-consumers" element={<ForConsumers />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Blog />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/resources" element={<Resources />} />
            
            {/* Admin Routes */}
            <Route path="/admin/accessibility" element={
              <AuthGuard>
                <AccessibilityTestPage />
              </AuthGuard>
            } />
            
            {/* Protected Profile Routes */}
            <Route path="/consumer-profile" element={
              <AuthGuard>
                <ConsumerProfile />
              </AuthGuard>
            } />
            <Route path="/advisor-profile" element={
              <AuthGuard>
                <AdvisorProfile />
              </AuthGuard>
            } />
            <Route path="/firm-profile" element={
              <AuthGuard>
                <FirmProfile />
              </AuthGuard>
            } />
            
            {/* Protected Dashboard Routes */}
            <Route path="/consumer-dashboard" element={
              <AuthGuard>
                <ConsumerDashboard />
              </AuthGuard>
            } />
            <Route path="/advisor-dashboard" element={
              <AuthGuard>
                <AdvisorDashboard />
              </AuthGuard>
            } />
            <Route path="/firm-dashboard" element={
              <AuthGuard>
                <FirmDashboard />
              </AuthGuard>
            } />
            
            {/* Settings Route */}
            <Route path="/settings" element={
              <AuthGuard>
                <Settings />
              </AuthGuard>
            } />
            
            {/* Fallback Route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </RealtimeSubscriptionProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
