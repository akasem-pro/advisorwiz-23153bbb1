
import React from 'react';
import { Route } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { OptimizedMainRoutes } from './OptimizedRoutes';

// Convert OptimizedMainRoutes to appropriate format with AppLayout wrapper
const MainRoutes = OptimizedMainRoutes.map((route) => {
  // Clone the route but modify the element to be wrapped in AppLayout
  const { element, ...rest } = route.props;
  
  // Return the modified route with AppLayout wrapper
  return (
    <Route
      key={rest.path}
      {...rest}
      element={element} // No longer wrapping with AppLayout here since it's done in AppRoutes
    />
  );
});

export default MainRoutes;
