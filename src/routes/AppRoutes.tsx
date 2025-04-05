
import { Routes, Route, Navigate } from 'react-router-dom';
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
      {AuthRoutes}
      
      {/* Include Main Routes */}
      <Route path="/*" element={<MainRoutes />} />
      
      {/* Handle 404 for all unmatched routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
