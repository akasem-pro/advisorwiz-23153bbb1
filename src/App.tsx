
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import ConsumerProfile from './pages/ConsumerProfile';
import AdvisorProfile from './pages/AdvisorProfile';
import FirmProfile from './pages/FirmProfile';
import ConsumerDashboard from './pages/ConsumerDashboard';
import AdvisorDashboard from './pages/AdvisorDashboard';
import FirmDashboard from './pages/FirmDashboard';
import { UserProvider } from './context/UserProvider';
import { AuthProvider } from './features/auth/context/AuthProvider';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          
          {/* Protected Profile Routes */}
          <Route path="/consumer-profile" element={<ConsumerProfile />} />
          <Route path="/advisor-profile" element={<AdvisorProfile />} />
          <Route path="/firm-profile" element={<FirmProfile />} />
          
          {/* Protected Dashboard Routes */}
          <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
          <Route path="/advisor-dashboard" element={<AdvisorDashboard />} />
          <Route path="/firm-dashboard" element={<FirmDashboard />} />
          
          {/* Fallback Route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
