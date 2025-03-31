
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/main.css'
import { ThemeProvider } from './context/ThemeContext'
import { Toaster } from './components/ui/sonner'
import { initPerformanceOptimizations } from './utils/performanceTracking'
import { initPreloadStrategy } from './utils/preloadStrategy'

// Initialize performance optimizations once before rendering
// This consolidates all performance-related initializations
initPerformanceOptimizations();

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
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    initPreloadStrategy();
  }, { timeout: 1000 });
} else {
  setTimeout(() => {
    initPreloadStrategy();
  }, 1000);
}
