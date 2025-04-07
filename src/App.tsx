
import React from 'react';
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
