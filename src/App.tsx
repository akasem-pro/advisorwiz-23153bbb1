import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProviderRefactored } from './context/UserProviderRefactored';
import { AuthProvider } from './features/auth/context/AuthProvider';
import AppRoutes from './routes/AppRoutes';
import { initGA4 } from './utils/analytics/ga4Integration';

// Initialize GA4 with your measurement ID
// This should be called before the App function
const GA4_MEASUREMENT_ID = 'G-J7MEK2Q7YY'; // Replace with your actual GA4 measurement ID
initGA4(GA4_MEASUREMENT_ID);

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
    <UserProviderRefactored>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </UserProviderRefactored>
  );
}

export default App;
