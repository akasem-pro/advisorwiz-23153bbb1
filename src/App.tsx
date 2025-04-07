
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './features/auth/context/AuthProvider';
import { FeedbackProvider } from './context/FeedbackContext';
import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes';
import { initAppOptimizations } from './utils/appOptimizations';
import './App.css';

// Initialize app optimizations
initAppOptimizations();

const App: React.FC = () => {
  console.log("App component rendering");
  
  return (
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
  );
};

export default App;
