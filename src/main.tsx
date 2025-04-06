
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { initializeAppAnalytics } from './services/analytics';
import { initWebVitalsTracking } from './services/analytics/providers/webVitalsProvider';

// Initialize analytics
initializeAppAnalytics({
  googleAnalyticsId: import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-EXAMPLE', // Replace with your actual ID
  debug: process.env.NODE_ENV === 'development',
  samplingRate: 1.0, // Track all events
  batchSize: 10,
  batchIntervalMs: 2000
}).then(() => {
  // Initialize Web Vitals tracking after analytics is ready
  initWebVitalsTracking();
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
