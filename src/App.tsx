
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './features/auth/context/AuthProvider';
import { UserProvider } from './context/UserContext';
import { trackWebVitals } from './utils/performance/webVitals';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'sonner';
import './App.css';

function App() {
  const location = useLocation();
  
  // Initialize performance tracking
  useEffect(() => {
    trackWebVitals();
  }, []);
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <AppRoutes />
          <Toaster position="top-right" />
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
