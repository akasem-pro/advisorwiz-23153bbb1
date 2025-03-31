
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './components/auth/AuthContext';
import { initAnalytics } from './services/analytics/analyticsService';
import { initPerformanceMonitoring } from './services/performance/performanceService';
import { Toaster } from 'sonner';
import './App.css';

const App: React.FC = () => {
  useEffect(() => {
    // Initialize analytics and performance monitoring
    initAnalytics();
    initPerformanceMonitoring();
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
