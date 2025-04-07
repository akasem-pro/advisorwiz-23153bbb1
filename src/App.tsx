
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './features/auth/context/AuthProvider';
import { FeedbackProvider } from './context/FeedbackContext';
import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes';
import { initAppOptimizations } from './utils/appOptimizations';
import OptimizedAppRoot from './components/performance/OptimizedAppRoot';
import './App.css';

// Initialize app optimizations
initAppOptimizations();

const App: React.FC = () => {
  console.log("App component rendering");
  
  useEffect(() => {
    console.log("App mounted");
    // Log the current path to help with debugging
    console.log("Current path:", window.location.pathname);
    
    // Add more detailed debugging for the blank page issue
    console.log("Window location:", window.location.href);
    console.log("Document ready state:", document.readyState);
    
    // Listen for document ready state changes
    const handleReadyStateChange = () => {
      console.log("Document ready state changed:", document.readyState);
    };
    
    document.addEventListener('readystatechange', handleReadyStateChange);
    
    return () => {
      document.removeEventListener('readystatechange', handleReadyStateChange);
    };
  }, []);
  
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <FeedbackProvider>
              <OptimizedAppRoot>
                <AppRoutes />
                <Toaster position="top-right" richColors />
              </OptimizedAppRoot>
            </FeedbackProvider>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
