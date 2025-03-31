
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/main.css'
import { ThemeProvider } from './context/ThemeContext'
import { Toaster } from './components/ui/sonner'
import { initEnhancedPerformanceTracking } from './utils/performance/enhancedPerformanceTracking'

// Initialize enhanced performance tracking
initEnhancedPerformanceTracking();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      <Toaster 
        position="top-right" 
        closeButton={true} 
        richColors={true} 
        toastOptions={{
          accessibility: {
            role: "status",
            ariaLive: "polite"
          }
        }}
      />
    </ThemeProvider>
  </React.StrictMode>,
)
