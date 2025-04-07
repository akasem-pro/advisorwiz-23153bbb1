
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MainRoutes from './MainRoutes';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  
  // Enhanced logging for debugging
  useEffect(() => {
    console.log("AppRoutes - Current route:", location.pathname);
    console.log("AppRoutes - Rendering MainRoutes component");
    
    // Add more detailed logging to help diagnose the blank page issue
    console.log("AppRoutes - Document title:", document.title);
    console.log("AppRoutes - Is document visible:", !document.hidden);
    console.log("AppRoutes - Window location:", window.location.href);
    
    // Force navigation to home page if we're at the root and having issues
    if (location.pathname === '/') {
      console.log("AppRoutes - On root path, ensuring landing page renders");
    }
  }, [location]);
  
  return (
    <div className="app-routes-container w-full h-full min-h-screen">
      <MainRoutes />
    </div>
  );
};

export default AppRoutes;
