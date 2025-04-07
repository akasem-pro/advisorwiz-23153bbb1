
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Onboarding from '../pages/Onboarding';
import SignIn from '../pages/SignIn';
import NotFound from '../pages/NotFound';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { PageLoadingFallback } from '../components/LazyComponents';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';

const MainRoutes: React.FC = () => {
  console.log("MainRoutes rendering");
  
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-up" element={<Onboarding />} />
      <Route path="/signup" element={<Onboarding />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/login" element={<Navigate to="/sign-in" replace />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      
      {/* Dashboard routes */}
      <Route 
        path="/advisor-dashboard" 
        element={
          <React.Suspense fallback={<PageLoadingFallback />}>
            <DashboardLayout>
              <div className="p-6">Advisor Dashboard</div>
            </DashboardLayout>
          </React.Suspense>
        } 
      />
      
      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
