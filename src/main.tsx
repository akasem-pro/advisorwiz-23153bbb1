
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './styles/main.css'
import { ThemeProvider } from './context/ThemeContext'
import { Toaster } from 'sonner'
import { initPerformanceOptimizations } from './utils/performanceTracking'

// Initialize performance optimizations with enhanced features
initPerformanceOptimizations();

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
