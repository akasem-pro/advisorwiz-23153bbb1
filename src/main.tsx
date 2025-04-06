
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initPerformanceMonitoring } from './utils/performance';
import { setupErrorHandling } from './utils/errorHandling';

// Initialize error handling and performance monitoring
try {
  console.log("Starting application initialization...");
  setupErrorHandling();
  initPerformanceMonitoring();
  console.log("Application services initialized");
} catch (error) {
  console.warn("Failed to initialize application services:", error);
}

// Simple direct rendering with better error handling
const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    console.log("Rendering application to DOM...");
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    console.log("Application successfully rendered");
  } catch (error) {
    console.error("Failed to render application:", error);
    // Display a user-friendly error message
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h2>Something went wrong</h2>
        <p>We're sorry, but the application failed to load. Please try refreshing the page.</p>
        <button onclick="window.location.reload()" style="padding: 8px 16px; margin-top: 20px;">
          Refresh Page
        </button>
      </div>
    `;
  }
} else {
  console.error("Root element not found");
}
