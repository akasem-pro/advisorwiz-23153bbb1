
import { Routes, Route, Outlet } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import MobileLayout from '../components/layout/MobileLayout';
import NotFound from '../pages/NotFound';
import SignIn from '../pages/SignIn';
import MainRoutes from './MainRoutes';
import DashboardRoutes from './DashboardRoutes';
import MobileRoutes from './MobileRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Mobile Routes wrapped in MobileLayout */}
      <Route path="/m" element={<MobileLayout><Outlet /></MobileLayout>}>
        <MobileRoutes />
      </Route>
      
      {/* Authentication Routes (no layout) */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      
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
