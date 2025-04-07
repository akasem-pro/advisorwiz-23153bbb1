
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MainRoutes from './MainRoutes';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  
  // Log routing for debugging
  useEffect(() => {
    console.log("AppRoutes - Current route:", location.pathname);
  }, [location]);
  
  return <MainRoutes />;
};

export default AppRoutes;
