
import { Routes, Route } from 'react-router-dom';
import { getAllRoutes } from './routeConfig';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import DashboardRoutes from './DashboardRoutes';

const AppRoutes = () => {
  console.log("AppRoutes component rendering");
  
  // Get all routes from the centralized configuration
  const allRoutes = getAllRoutes();
  
  // Also include routes from MainRoutes, AuthRoutes, and DashboardRoutes for compatibility
  const mainRouteElements = MainRoutes || [];
  const authRouteElements = AuthRoutes || [];
  const dashboardRouteElements = DashboardRoutes || [];
  
  return (
    <Routes>
      {/* Routes from centralized configuration */}
      {allRoutes.map((route, index) => (
        <Route 
          key={`route-config-${index}`} 
          path={route.path} 
          element={route.element} 
        />
      ))}
      
      {/* Include routes from MainRoutes for compatibility */}
      {mainRouteElements.length > 0 && mainRouteElements.props && mainRouteElements.props.children && 
        React.Children.map(mainRouteElements.props.children, (child, index) => (
          child.props && <Route key={`main-route-${index}`} {...child.props} />
        ))
      }
      
      {/* Include routes from AuthRoutes for compatibility */}
      {authRouteElements.map && authRouteElements.map((route, index) => (
        <Route 
          key={`auth-route-${index}`} 
          path={route.path} 
          element={route.element} 
        />
      ))}
      
      {/* Include routes from DashboardRoutes for compatibility */}
      {dashboardRouteElements.map && dashboardRouteElements.map((route, index) => (
        <Route 
          key={`dashboard-route-${index}`} 
          {...route.props} 
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
