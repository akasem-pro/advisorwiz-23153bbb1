
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './components/auth/AuthContext';
import { initAnalytics } from './services/analytics/analyticsService';
import { initPerformanceMonitoring } from './services/performance/performanceService';
import { setupErrorHandling } from './utils/errorHandling';
import { Toaster } from 'sonner';
import './App.css';

const App: React.FC = () => {
  useEffect(() => {
    // Initialize analytics, performance monitoring, and asynchronous error handling
    initAnalytics();
    initPerformanceMonitoring();
    setupErrorHandling();
  }, []);

  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <AppRoutes />
            <Toaster position="top-right" richColors />
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
