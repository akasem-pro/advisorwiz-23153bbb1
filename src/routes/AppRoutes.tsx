
import { Routes, Route } from 'react-router-dom';
import { getAllRoutes } from './routeConfig';

const AppRoutes = () => {
  console.log("AppRoutes component rendering");
  
  // Get all routes from the centralized configuration
  const allRoutes = getAllRoutes();
  
  return (
    <Routes>
      {allRoutes.map((route, index) => (
        <Route 
          key={`route-${index}`} 
          path={route.path} 
          element={route.element} 
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
