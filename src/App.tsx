
import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './features/auth/context/AuthProvider';
import { FeedbackProvider } from './context/FeedbackContext';
import { Toaster } from './components/ui/sonner';
import { initAppOptimizations } from './utils/appOptimizations';
import './App.css';

// Simple error boundary component
class ErrorBoundaryComponent extends React.Component<{children: React.ReactNode}> {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: any, info: any) {
    console.error("App error boundary caught error:", error, info);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="mb-4">We're sorry, but something went wrong. Please try refreshing the page.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Initialize app optimizations
if (typeof window !== 'undefined') {
  try {
    initAppOptimizations();
  } catch (error) {
    console.warn('Failed to initialize app optimizations:', error);
  }
}

const App: React.FC = () => {
  console.log("App component rendering");
  
  return (
    <ErrorBoundaryComponent>
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <UserProvider>
              <FeedbackProvider>
                <Suspense fallback={<div>Loading...</div>}>
                  <AppRoutes />
                  <Toaster position="top-right" richColors />
                </Suspense>
              </FeedbackProvider>
            </UserProvider>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </ErrorBoundaryComponent>
  );
};

export default App;
