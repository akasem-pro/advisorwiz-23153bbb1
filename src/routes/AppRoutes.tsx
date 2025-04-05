
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import AppLayout from '../components/layout/AppLayout';
import DashboardRoutes from './DashboardRoutes';
import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';
import UtilityRoutes from './UtilityRoutes';
import MobileRoutes from './MobileRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home route */}
      <Route path="/" element={<AppLayout><Home /></AppLayout>} />
      
      {/* Include Dashboard Routes */}
      {DashboardRoutes.map((route, index) => (
        <Route key={`dashboard-route-${index}`} {...route.props} />
      ))}
      
      {/* Include Auth Routes */}
      {AuthRoutes.map((route, index) => (
        <Route key={`auth-route-${index}`} {...route} />
      ))}
      
      {/* Include Utility Routes */}
      {UtilityRoutes.map((route, index) => (
        <Route key={`utility-route-${index}`} {...route} />
      ))}
      
      {/* Include Mobile Routes when needed */}
      {MobileRoutes.map((route, index) => (
        <Route key={`mobile-route-${index}`} {...route} />
      ))}
      
      {/* Main Routes should be rendered within their own Routes component, not as a fallback */}
      <Route path="*" element={<MainRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
