
import { Route, Routes } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import MobileLayout from '../components/layout/MobileLayout';
import NotFound from '../pages/NotFound';
import MainRoutes from './MainRoutes';
import DashboardRoutes from './DashboardRoutes';
import MobileRoutes from './MobileRoutes';
import AuthRoutes from './AuthRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Mobile Routes */}
      <Route path="/m" element={<MobileLayout><Outlet /></MobileLayout>}>
        {/* Use MobileRoutes directly inside the parent Route */}
        <MobileRoutes />
      </Route>
      
      {/* Authentication Routes (no layout) */}
      <AuthRoutes />
      
      {/* Main Web Routes */}
      <Route path="/" element={<AppLayout><Outlet /></AppLayout>}>
        <MainRoutes />
        <DashboardRoutes />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
