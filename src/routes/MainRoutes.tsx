
import React from 'react';
import { Route } from 'react-router-dom';
import { OptimizedMainRoutes } from './OptimizedRoutes';

// Use OptimizedMainRoutes directly without wrapping in AppLayout
// since that's now handled by AppRoutes.tsx
const MainRoutes = OptimizedMainRoutes.map((route) => {
  const { element, ...rest } = route.props;
  
  return (
    <Route
      key={rest.path}
      {...rest}
      element={element}
    />
  );
});

export default MainRoutes;
