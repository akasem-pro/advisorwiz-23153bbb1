
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Wrap in try-catch for better error reporting
try {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} catch (error) {
  console.error('Failed to render application:', error);
  // Display a fallback error message
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center;">
      <h2>Something went wrong</h2>
      <p>The application failed to load. Please check the console for errors.</p>
    </div>
  `;
}
