
import React, { ErrorInfo, Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './features/auth/context/AuthProvider';
import { FeedbackProvider } from './context/FeedbackContext';
import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes';
import { initAppOptimizations } from './utils/appOptimizations';
import './App.css';

// Initialize app optimizations
initAppOptimizations();

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("App level error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const AppErrorFallback: React.FC<{ error?: Error | null }> = ({ error }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Oops, something went wrong</h1>
      <p className="mb-4">We're sorry, but we encountered an error loading the application.</p>
      {error && (
        <div className="bg-gray-100 p-4 rounded mb-4 overflow-auto max-h-32">
          <p className="font-mono text-sm">{error.message}</p>
        </div>
      )}
      <button
        onClick={() => window.location.reload()}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Refresh the page
      </button>
    </div>
  </div>
);

const App: React.FC = () => {
  console.log("App component rendering");
  
  return (
    <ErrorBoundary fallback={<AppErrorFallback />}>
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <FeedbackProvider>
              <div className="app-container">
                <AppRoutes />
                <Toaster position="top-right" richColors />
              </div>
            </FeedbackProvider>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
