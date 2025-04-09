
import React, { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './features/auth/context/AuthProvider';
import { FeedbackProvider } from './context/FeedbackContext';
import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes';
import PageErrorBoundary from './components/error/PageErrorBoundary';
import './App.css';

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
  useEffect(() => {
    console.log("App component mounted");
    return () => console.log("App component unmounted");
  }, []);

  return (
    <PageErrorBoundary fallback={<AppErrorFallback />}>
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <FeedbackProvider>
              <div className="app-container bg-white dark:bg-navy-950">
                <AppRoutes />
                <Toaster position="top-right" richColors />
              </div>
            </FeedbackProvider>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </PageErrorBoundary>
  );
};

export default App;
