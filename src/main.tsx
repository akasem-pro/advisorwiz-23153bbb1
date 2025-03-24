
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './styles/main.css'
import { ThemeProvider } from './context/ThemeContext'
import { initPerformanceOptimizations } from './utils/performanceTracking'
import { Toaster } from 'sonner'

// Initialize performance optimizations
initPerformanceOptimizations();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
      <Toaster position="top-right" closeButton richColors />
    </ThemeProvider>
  </BrowserRouter>
);
