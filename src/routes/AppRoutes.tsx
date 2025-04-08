
import React from 'react';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import DashboardRoutes from './DashboardRoutes';
import AuthGuard from '../components/auth/AuthGuard';
import NotFound from '../pages/NotFound';
import AppLayout from '../components/layout/AppLayout';
import Chat from '../pages/Chat';
import Messages from '../pages/Messages';
import Appointments from '../pages/Appointments';
import Billing from '../pages/Billing';
import Settings from '../pages/Settings';
import Matches from '../pages/Matches';
import Notifications from '../pages/Notifications';
import Resources from '../pages/Resources';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  
  console.log("AppRoutes rendering with path:", location.pathname);
  
  return (
    <div className="app-routes-container w-full h-full min-h-screen">
      <Routes>
        {/* Include MainRoutes for public pages */}
        <MainRoutes />
        
        {/* User specific routes with auth guard */}
        <Route path="/messages" element={
          <AuthGuard>
            <AppLayout>
              <Messages />
            </AppLayout>
          </AuthGuard>
        } />
        
        <Route path="/appointments" element={
          <AuthGuard>
            <AppLayout>
              <Appointments />
            </AppLayout>
          </AuthGuard>
        } />
        
        <Route path="/billing" element={
          <AuthGuard>
            <AppLayout>
              <Billing />
            </AppLayout>
          </AuthGuard>
        } />
        
        <Route path="/settings" element={
          <AuthGuard>
            <AppLayout>
              <Settings />
            </AppLayout>
          </AuthGuard>
        } />
        
        <Route path="/matches" element={
          <AuthGuard>
            <AppLayout>
              <Matches />
            </AppLayout>
          </AuthGuard>
        } />
        
        <Route path="/notifications" element={
          <AuthGuard>
            <AppLayout>
              <Notifications />
            </AppLayout>
          </AuthGuard>
        } />
        
        <Route path="/resources" element={
          <AppLayout>
            <Resources />
          </AppLayout>
        } />
        
        <Route path="/chat/*" element={
          <AuthGuard>
            <AppLayout>
              <Chat />
            </AppLayout>
          </AuthGuard>
        } />
        
        {/* Include DashboardRoutes */}
        {DashboardRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
