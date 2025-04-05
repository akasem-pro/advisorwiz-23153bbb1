
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Simple direct rendering without try-catch to identify issues more clearly
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
