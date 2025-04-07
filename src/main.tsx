
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { setupAnalytics, setupWebVitalsTracking } from './services/analytics';
import { setupErrorHandling } from './utils/errorHandling';

// Initialize error handling first
setupErrorHandling();

// Initialize analytics with proper error handling
const initApp = async () => {
  try {
    await setupAnalytics({
      googleAnalyticsId: import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-EXAMPLE',
      debug: process.env.NODE_ENV === 'development',
      sampling: 1.0,
      batchSize: 10,
      batchIntervalMs: 2000
    });
    
    // Initialize Web Vitals tracking after analytics is ready
    setupWebVitalsTracking();
  } catch (error) {
    console.error('Failed to initialize analytics:', error);
    // Continue rendering the app even if analytics fails
  }

  // Render the app
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
};

// Start the app
initApp();
