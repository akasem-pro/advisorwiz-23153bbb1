
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import IndexPage from './pages/index';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ConsumerProfilePage from './pages/ConsumerProfilePage';
import AdvisorProfilePage from './pages/AdvisorProfilePage';
import AdvisorList from './pages/AdvisorList';
import ChatPage from './pages/ChatPage';
import SchedulerPage from './pages/SchedulerPage';
import CallPage from './pages/CallPage';
import MobileLayout from './components/layout/MobileLayout';
import LeadManagementPage from './pages/LeadManagementPage';
import FirmProfile from './pages/FirmProfile';
import Dashboard from './pages/Dashboard';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile/consumer" element={<ConsumerProfilePage />} />
          <Route path="/profile/advisor" element={<AdvisorProfilePage />} />
          <Route path="/advisors" element={<AdvisorList />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/scheduler" element={<SchedulerPage />} />
          <Route path="/call/:roomId" element={<CallPage />} />
          <Route path="/mobile/*" element={<MobileLayout />} />
          <Route path="/lead-management" element={<LeadManagementPage />} />
          <Route path="/firm-profile/:id?" element={<FirmProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
