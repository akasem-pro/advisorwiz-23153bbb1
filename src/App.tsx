
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProviderRefactored } from './context/UserProviderRefactored';
import { AuthProvider } from './features/auth/context/AuthProvider';
import AppRoutes from './routes/AppRoutes';
import { CookieManager } from './components/cookie';
import { TrackingManager } from './components/analytics';
import { TrackingConfig } from './utils/analytics/trackers';
import { ThemeProvider } from './context/ThemeContext';

// Tracking configuration for multiple services
const trackingConfig: TrackingConfig = {
  googleAnalytics: {
    measurementId: 'G-J7MEK2Q7YY',
    consentMode: true,
    debug: process.env.NODE_ENV === 'development',
  },
  metaPixel: {
    pixelId: '123456789012345',
    advanced: {
      debug: process.env.NODE_ENV === 'development'
    }
  },
  pinterestTag: {
    tagId: '2612345678901',
    debug: process.env.NODE_ENV === 'development'
  },
  googleAdSense: {
    adClient: 'ca-pub-1234567890123456',
    options: {
      pageLevelAds: true
    }
  }
};

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
    <Router>
      <ThemeProvider>
        <UserProviderRefactored>
          <AuthProvider>
            <AppRoutes />
            <CookieManager />
            <TrackingManager config={trackingConfig} />
          </AuthProvider>
        </UserProviderRefactored>
      </ThemeProvider>
    </Router>
  );
}

export default App;
