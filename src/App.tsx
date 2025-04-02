
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './components/auth/AuthContext';
import { FeedbackProvider } from './context/FeedbackContext';
import { initAnalytics } from './services/analytics/analyticsService';
import { initPerformanceMonitoring } from './services/performance/performanceService';
import { setupErrorHandling } from './utils/errorHandling';
import { initMatchingWorker } from './services/matching/workerService';
import { Toaster } from './components/ui/sonner';
import './App.css';

const App: React.FC = () => {
  useEffect(() => {
    // Initialize analytics, performance monitoring, and asynchronous error handling
    initAnalytics();
    initPerformanceMonitoring();
    setupErrorHandling();
    
    // Initialize matching worker if supported
    if (typeof Worker !== 'undefined') {
      initMatchingWorker();
    }
  }, []);

  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <FeedbackProvider>
              <AppRoutes />
              <Toaster position="top-right" richColors />
            </FeedbackProvider>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
