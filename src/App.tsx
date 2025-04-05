
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './components/auth/AuthContext';
import { FeedbackProvider } from './context/FeedbackContext';
import { Toaster } from './components/ui/sonner';
import './App.css';

const App: React.FC = () => {
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
