
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getAllRoutes } from './config';
import NotFound from '../pages/NotFound';
import { PageLoadingFallback } from '../components/LazyComponents';
import PageErrorBoundary from '../components/error/PageErrorBoundary';

const MainRoutes: React.FC = () => {
  const routes = getAllRoutes();
  
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
      
      {/* Redirects for old routes or common misspellings */}
      <Route path="/signup" element={<Navigate to="/sign-up" replace />} />
      <Route path="/login" element={<Navigate to="/sign-in" replace />} />
      
      {/* Catch-all route for 404 - must be last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
