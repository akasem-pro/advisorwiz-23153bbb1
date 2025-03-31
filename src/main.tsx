
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/main.css'
import { ThemeProvider } from './context/ThemeContext'
import { Toaster } from './components/ui/sonner'

// Create React root with concurrent mode
const root = ReactDOM.createRoot(document.getElementById('root')!);

// Critical first render
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      <Toaster position="top-right" />
    </ThemeProvider>
  </React.StrictMode>,
);

// Initialize preloading after first render is complete
// This ensures we don't block the main thread during initial load
if (typeof window !== 'undefined') {
  // Import performance optimization utilities after initial render
  import('./utils/performanceTracking').then(({ initPerformanceOptimizations }) => {
    initPerformanceOptimizations();
  }).catch(error => {
    console.error('Failed to load performance tracking:', error);
  });

  // Import and initialize preload strategy
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      import('./utils/preloadStrategy').then(({ initPreloadStrategy }) => {
        initPreloadStrategy();
      }).catch(error => {
        console.error('Failed to initialize preload strategy:', error);
      });
    }, { timeout: 1000 });
  } else {
    setTimeout(() => {
      import('./utils/preloadStrategy').then(({ initPreloadStrategy }) => {
        initPreloadStrategy();
      }).catch(error => {
        console.error('Failed to initialize preload strategy:', error);
      });
    }, 1000);
  }
}
