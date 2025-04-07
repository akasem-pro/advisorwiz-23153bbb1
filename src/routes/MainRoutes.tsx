
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getAllRoutes } from './config';
import NotFound from '../pages/NotFound';
import LandingPage from '../pages/LandingPage';
import Onboarding from '../pages/Onboarding';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { PageLoadingFallback } from '../components/LazyComponents';

const MainRoutes: React.FC = () => {
  try {
    const routes = getAllRoutes();
    
    console.log("MainRoutes - Loading routes:", routes.map(r => r.path).join(', '));
    
    return (
      <Routes>
        {/* Root route with direct component */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Direct routes for sign-up with both path variants */}
        <Route path="/sign-up" element={<Onboarding />} />
        <Route path="/signup" element={<Onboarding />} />
        
        {/* Map other configured routes except for explicitly handled ones */}
        {routes.filter(route => 
          route.path !== '/' && 
          route.path !== '/sign-up' && 
          route.path !== '/signup'
        ).map((route) => {
          // Check if this is a dashboard route that needs the dashboard layout
          const isDashboardRoute = route.path.startsWith('/advisor-dashboard') || 
                                 route.path === '/analytics' || 
                                 route.path === '/admin-analytics' ||
                                 route.path === '/schedule' || 
                                 route.path === '/chat' || 
                                 route.path === '/leads' || 
                                 route.path === '/team' ||
                                 route.path === '/settings';
          
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <React.Suspense fallback={<PageLoadingFallback />}>
                  {isDashboardRoute ? (
                    <DashboardLayout>
                      {route.element}
                    </DashboardLayout>
                  ) : (
                    route.element
                  )}
                </React.Suspense>
              }
            />
          );
        })}
        
        {/* Common redirects */}
        <Route path="/login" element={<Navigate to="/sign-in" replace />} />
        <Route path="/signin" element={<Navigate to="/sign-in" replace />} />
        <Route path="/dashboard" element={<Navigate to="/advisor-dashboard" replace />} />
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  } catch (error) {
    console.error("Error rendering MainRoutes:", error);
    // Return a fallback UI in case of error
    return (
      <div className="p-8 text-center">
        <h1 className="text-xl font-bold mb-4">Something went wrong</h1>
        <p>We're having trouble loading the page. Please try refreshing.</p>
        <pre className="mt-4 p-4 bg-gray-100 rounded text-left overflow-auto">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      </div>
    );
  }
};

export default MainRoutes;
