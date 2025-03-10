
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';

// Pages
import Index from './pages/Index';
import Onboarding from './pages/Onboarding';
import AdvisorProfile from './pages/AdvisorProfile';
import ConsumerProfile from './pages/ConsumerProfile';
import MatchingInterface from './pages/MatchingInterface';
import Chat from './pages/Chat';
import Schedule from './pages/Schedule';
import NotFound from './pages/NotFound';
import FirmProfile from './pages/FirmProfile';
import ForFirms from './pages/ForFirms';
import ForAdvisors from './pages/ForAdvisors';
import ForConsumers from './pages/ForConsumers';
import Pricing from './pages/Pricing';
import ContactUs from './pages/ContactUs';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/advisor-profile" element={<AdvisorProfile />} />
            <Route path="/consumer-profile" element={<ConsumerProfile />} />
            <Route path="/matches" element={<MatchingInterface />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/firm-profile" element={<FirmProfile />} />
            <Route path="/firm/:id" element={<FirmProfile />} />
            <Route path="/for-firms" element={<ForFirms />} />
            <Route path="/for-advisors" element={<ForAdvisors />} />
            <Route path="/for-consumers" element={<ForConsumers />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
