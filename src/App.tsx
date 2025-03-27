
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './features/auth/context/AuthProvider';
import { UserProvider } from './context/UserContext';
import { trackWebVitals } from './utils/performance/webVitals';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'sonner';

// Import new global styles
import './styles/main.css';

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
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 5000,
              className: "font-sans text-sm dark:bg-navy-800 dark:text-slate-200 bg-white text-navy-900 shadow-md border dark:border-navy-700 border-slate-200"
            }}
          />
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
