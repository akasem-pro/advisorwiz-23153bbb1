
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './components/auth/AuthContext';
import { FeedbackProvider } from './context/FeedbackContext';
import { initAnalytics } from './services/analytics/analyticsService';
import { initPerformanceMonitoring } from './utils/performance';
import { setupErrorHandling } from './utils/errorHandling';
import { initMatchingWorker } from './services/matching/workerService';
import { Toaster } from './components/ui/sonner';
import './App.css';

const App: React.FC = () => {
  useEffect(() => {
    // Initialize analytics, performance monitoring, and asynchronous error handling
    try {
      console.log("Initializing app services...");
      
      // Initialize services with error handling for each
      try {
        initAnalytics();
      } catch (error) {
        console.error("Error initializing analytics:", error);
      }
      
      try {
        initPerformanceMonitoring();
      } catch (error) {
        console.error("Error initializing performance monitoring:", error);
      }
      
      try {
        setupErrorHandling();
      } catch (error) {
        console.error("Error setting up error handling:", error);
      }
      
      // Initialize matching worker if supported
      if (typeof Worker !== 'undefined') {
        try {
          initMatchingWorker();
        } catch (error) {
          console.error("Error initializing matching worker:", error);
        }
      }
      
      console.log("App services initialized successfully");
    } catch (error) {
      console.error("Error during app initialization:", error);
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
