
import React from 'react';
import { Route } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';

/**
 * This component is now unused as all routes are defined in AppRoutes.tsx
 * Keeping it for backward compatibility, but it doesn't have any functional routes
 */
const MainRoutes: React.FC = () => {
  console.log("MainRoutes component deprecated - routes moved to AppRoutes.tsx");
  return <></>;
};

export default MainRoutes;
