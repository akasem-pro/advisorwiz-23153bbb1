
import { Routes, Route } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import DashboardRoutes from './DashboardRoutes';
import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';

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
      
      {/* Include Main Routes */}
      <Route path="*" element={<MainRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
