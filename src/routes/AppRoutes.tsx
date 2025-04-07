
import React from 'react';
import { useLocation } from 'react-router-dom';
import MainRoutes from './MainRoutes';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  
  // Simple logging for route changes
  console.log("AppRoutes - Current route:", location.pathname);
  
  return (
    <div className="app-routes-container w-full h-full min-h-screen">
      <MainRoutes />
    </div>
  );
};

export default AppRoutes;
