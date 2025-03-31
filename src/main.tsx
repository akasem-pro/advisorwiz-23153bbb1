
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
  // Safe request idle callback wrapper
  const safeRequestIdleCallback = (callback: () => void, timeout = 1000) => {
    try {
      if ('requestIdleCallback' in window) {
        return window.requestIdleCallback(callback, { timeout });
      } else {
        return setTimeout(callback, 50);
      }
    } catch (err) {
      console.error('Error in requestIdleCallback fallback:', err);
      return setTimeout(callback, 100);
    }
  };

  // We need to use a more generic type that can handle both browser and node environments
  type CallbackId = number | NodeJS.Timeout;
  
  // Store callback IDs for cleanup
  let performanceImportId: CallbackId | null = null;
  let preloadImportId: CallbackId | null = null;

  // Import performance optimization utilities after initial render
  performanceImportId = safeRequestIdleCallback(() => {
    import('./utils/performanceTracking')
      .then(({ initPerformanceOptimizations }) => {
        initPerformanceOptimizations();
      })
      .catch(error => {
        console.error('Failed to load performance tracking:', error);
      });
  });
  
  // Import and initialize preload strategy
  preloadImportId = safeRequestIdleCallback(() => {
    import('./utils/preloadStrategy')
      .then(({ initPreloadStrategy }) => {
        initPreloadStrategy();
      })
      .catch(error => {
        console.error('Failed to initialize preload strategy:', error);
      });
  }, 1500);

  // Clean up callbacks on page unload
  window.addEventListener('unload', () => {
    if (performanceImportId !== null) {
      if ('requestIdleCallback' in window && typeof performanceImportId === 'number') {
        window.cancelIdleCallback(performanceImportId);
      } else {
        clearTimeout(performanceImportId);
      }
    }
    
    if (preloadImportId !== null) {
      if ('requestIdleCallback' in window && typeof preloadImportId === 'number') {
        window.cancelIdleCallback(preloadImportId);
      } else {
        clearTimeout(preloadImportId);
      }
    }
  });
}
