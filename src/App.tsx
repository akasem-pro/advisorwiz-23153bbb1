
import React, { useState, useEffect, useTransition, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProviderRefactored } from './context/UserProviderRefactored';
import { AuthProvider } from './features/auth/context/AuthProvider';
import AppRoutes from './routes/AppRoutes';

function App() {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Track mounted state to prevent updates after unmount
    let isMounted = true;
    
    // Simulate loading delay, but use a smaller delay to improve perceived performance
    const timer = setTimeout(() => {
      // Wrap the state update in startTransition
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        if (isMounted) {
          startTransition(() => {
            setLoading(false);
          });
        }
      } else {
        // If document isn't ready yet, wait for it
        const readyStateHandler = () => {
          if (isMounted) {
            startTransition(() => {
              setLoading(false);
            });
          }
        };
        document.addEventListener('DOMContentLoaded', readyStateHandler);
        
        // If DOMContentLoaded doesn't fire for some reason, still show the app
        const backupTimer = setTimeout(() => {
          if (isMounted) {
            startTransition(() => {
              setLoading(false);
            });
          }
        }, 1000);
        
        // Clean up both the event listener and the backup timer
        return () => {
          clearTimeout(backupTimer);
          document.removeEventListener('DOMContentLoaded', readyStateHandler);
        };
      }
    }, 300); // Reduced from 500ms to 300ms

    // Proper cleanup function
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  // Optimized loading spinner that doesn't cause layout shifts
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-50 dark:bg-navy-900 z-50">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <UserProviderRefactored>
        <Router>
          <Suspense fallback={
            <div className="fixed inset-0 flex items-center justify-center bg-slate-50 dark:bg-navy-900 z-50">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-teal-500"></div>
            </div>
          }>
            <AppRoutes />
          </Suspense>
        </Router>
      </UserProviderRefactored>
    </AuthProvider>
  );
}

export default App;
