
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initPerformanceMonitoring } from './utils/performance';

// Initialize performance monitoring
try {
  initPerformanceMonitoring();
} catch (error) {
  console.warn("Failed to initialize performance monitoring:", error);
}

// Simple direct rendering
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error("Root element not found");
}
