
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './styles/main.css'
import { ThemeProvider } from './context/ThemeContext'
import { Toaster } from 'sonner'
import { initEnhancedPerformanceTracking } from './utils/performance/enhancedPerformanceTracking'

// Initialize enhanced performance tracking
initEnhancedPerformanceTracking();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
        <Toaster position="top-right" closeButton richColors />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
