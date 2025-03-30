
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProviderRefactored } from './context/UserProviderRefactored';
import { AuthProvider } from './features/auth/context/AuthProvider';
import AppLayout from './components/layout/AppLayout';
import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Disclaimer from './pages/Disclaimer';
import Cookies from './pages/Cookies';
import NotFound from './pages/NotFound';
import AuthRoutes from './routes/AuthRoutes';
import ConsumerDashboard from './pages/ConsumerDashboard';
import AdvisorDashboard from './pages/AdvisorDashboard';
import FirmDashboard from './pages/FirmDashboard';
import AuthGuard from './components/auth/AuthGuard';
import { useUser } from './context/UserContext';
import Onboarding from './pages/Onboarding';
import UtilityRoutes from './routes/UtilityRoutes';

function App() {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useUser();

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <UserProviderRefactored>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<AppLayout><LandingPage /></AppLayout>} />
              <Route path="/about" element={<AppLayout><AboutUs /></AppLayout>} />
              <Route path="/contact" element={<AppLayout><ContactUs /></AppLayout>} />
              <Route path="/terms" element={<AppLayout><Terms /></AppLayout>} />
              <Route path="/privacy" element={<AppLayout><Privacy /></AppLayout>} />
              <Route path="/disclaimer" element={<AppLayout><Disclaimer /></AppLayout>} />
              <Route path="/cookies" element={<AppLayout><Cookies /></AppLayout>} />
              
              {/* Auth Routes */}
              {AuthRoutes}
              
              {/* Protected Routes */}
              <Route path="/consumer-dashboard" element={<AuthGuard userTypes={['consumer']}><AppLayout><ConsumerDashboard /></AppLayout></AuthGuard>} />
              <Route path="/advisor-dashboard" element={<AuthGuard userTypes={['advisor']}><AppLayout><AdvisorDashboard /></AppLayout></AuthGuard>} />
              <Route path="/firm-dashboard" element={<AuthGuard userTypes={['firm_admin']}><AppLayout><FirmDashboard /></AppLayout></AuthGuard>} />
              
              {/* Add Utility Routes */}
              {UtilityRoutes}

              {/* Not Found Route */}
              <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
            </Routes>
          </Router>
        </AuthProvider>
      </UserProviderRefactored>
    </ThemeProvider>
  );
}

export default App;
