
import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './features/auth/context/AuthProvider';
import { UserProvider } from './context/UserContext';
import AppLayout from './components/layout/AppLayout';
import MobileLayout from './components/layout/MobileLayout';
import { PageLoadingFallback } from './components/LazyComponents';
import { trackWebVitals } from './utils/performance/webVitals';
import './App.css';

// Core pages - load immediately
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ForConsumers = lazy(() => import('./pages/ForConsumers'));
const ForAdvisors = lazy(() => import('./pages/ForAdvisors'));
const ForFirms = lazy(() => import('./pages/ForFirms'));
const Blog = lazy(() => import('./pages/Blog'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const AdvisorProfile = lazy(() => import('./pages/AdvisorProfile'));
const MatchingInterface = lazy(() => import('./pages/MatchingInterface'));
const AdvisorDashboard = lazy(() => import('./pages/AdvisorDashboard'));
const ConsumerDashboard = lazy(() => import('./pages/ConsumerDashboard'));
const FirmDashboard = lazy(() => import('./pages/FirmDashboard'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const Schedule = lazy(() => import('./pages/Schedule'));
const Chat = lazy(() => import('./pages/Chat'));
const ConsumerProfile = lazy(() => import('./pages/ConsumerProfile'));
const FirmProfile = lazy(() => import('./pages/FirmProfile'));
const Settings = lazy(() => import('./pages/Settings'));
const LeadManagementPage = lazy(() => import('./pages/LeadManagementPage'));
const Resources = lazy(() => import('./pages/Resources'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const Careers = lazy(() => import('./pages/Careers'));

function App() {
  const location = useLocation();
  
  // Initialize performance tracking
  useEffect(() => {
    trackWebVitals();
  }, []);
  
  // Determine if this is a mobile route
  const isMobileRoute = location.pathname.startsWith('/m/');
  
  return (
    <AuthProvider>
      <UserProvider>
        <Routes>
          {/* Mobile Routes */}
          <Route path="/m" element={<MobileLayout />}>
            <Route index element={
              <Suspense fallback={<PageLoadingFallback />}>
                <LandingPage />
              </Suspense>
            } />
            {/* Add other mobile routes here */}
          </Route>
          
          {/* Authentication Routes (no layout) */}
          <Route path="/login" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          
          {/* Main Web Routes */}
          <Route element={<AppLayout />}>
            <Route path="/" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <Home />
              </Suspense>
            } />
            <Route path="/about" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <AboutUs />
              </Suspense>
            } />
            <Route path="/for-consumers" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <ForConsumers />
              </Suspense>
            } />
            <Route path="/for-advisors" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <ForAdvisors />
              </Suspense>
            } />
            <Route path="/for-firms" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <ForFirms />
              </Suspense>
            } />
            <Route path="/blog" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <Blog />
              </Suspense>
            } />
            <Route path="/contact" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <ContactUs />
              </Suspense>
            } />
            <Route path="/pricing" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <Pricing />
              </Suspense>
            } />
            <Route path="/terms" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <Terms />
              </Suspense>
            } />
            <Route path="/privacy" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <Privacy />
              </Suspense>
            } />
            <Route path="/advisor/:id" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <AdvisorProfile />
              </Suspense>
            } />
            <Route path="/match" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <MatchingInterface />
              </Suspense>
            } />
            <Route path="/dashboard/advisor" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <AdvisorDashboard />
              </Suspense>
            } />
            <Route path="/dashboard/consumer" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <ConsumerDashboard />
              </Suspense>
            } />
            <Route path="/dashboard/firm" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <FirmDashboard />
              </Suspense>
            } />
            <Route path="/onboarding" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <Onboarding />
              </Suspense>
            } />
            <Route path="/schedule" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <Schedule />
              </Suspense>
            } />
            <Route path="/chat" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <Chat />
              </Suspense>
            } />
            <Route path="/profile/consumer" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <ConsumerProfile />
              </Suspense>
            } />
            <Route path="/profile/firm" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <FirmProfile />
              </Suspense>
            } />
            <Route path="/settings" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <Settings />
              </Suspense>
            } />
            <Route path="/leads" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <LeadManagementPage />
              </Suspense>
            } />
            <Route path="/resources" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <Resources />
              </Suspense>
            } />
            <Route path="/sitemap" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <Sitemap />
              </Suspense>
            } />
            <Route path="/careers" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <Careers />
              </Suspense>
            } />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
