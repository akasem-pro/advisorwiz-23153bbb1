
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProviderRefactored } from './context/UserProviderRefactored';
import { AuthProvider } from './features/auth/context/AuthProvider';
import AppRoutes from './routes/AppRoutes';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <UserProviderRefactored>
        <Router>
          <AppRoutes />
        </Router>
      </UserProviderRefactored>
    </AuthProvider>
  );
}

export default App;
