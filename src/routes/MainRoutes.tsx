
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getAllRoutes } from './config';
import NotFound from '../pages/NotFound';
import { PageLoadingFallback } from '../components/LazyComponents';
import PageErrorBoundary from '../components/error/PageErrorBoundary';
import { useAnalytics } from '../hooks/useAnalytics';

const MainRoutes: React.FC = () => {
  const routes = getAllRoutes();
  
  // Track page views for analytics
  useAnalytics({ trackScrollDepth: true, trackTimeOnPage: true });
  
  console.log("MainRoutes - Loading with routes:", routes.map(r => r.path).join(', '));
  
  return (
    <Routes>
      {/* Map all configured routes */}
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <PageErrorBoundary>
              <Suspense fallback={<PageLoadingFallback />}>
                {route.element}
              </Suspense>
            </PageErrorBoundary>
          }
        />
      ))}
      
      {/* Common redirects for alternate route paths */}
      <Route path="/signup" element={<Navigate to="/sign-up" replace />} />
      <Route path="/login" element={<Navigate to="/sign-in" replace />} />
      <Route path="/dashboard" element={<Navigate to="/advisor-dashboard" replace />} />
      
      {/* Catch-all route for 404 - must be last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
