
import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Onboarding from '../pages/Onboarding';
import SignIn from '../pages/SignIn';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import AdvisorProfile from '../pages/AdvisorProfile';
import ConsumerProfile from '../pages/ConsumerProfile';
import FirmProfile from '../pages/FirmProfile';
import Blog from '../pages/Blog';
import ForAdvisors from '../pages/ForAdvisors';
import ForFirms from '../pages/ForFirms';
import ForConsumers from '../pages/ForConsumers';
import Pricing from '../pages/Pricing';

const MainRoutes: React.FC = () => {
  console.log("MainRoutes rendering");
  
  return (
    <>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-up" element={<Onboarding />} />
      <Route path="/signup" element={<Onboarding />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/for-advisors" element={<ForAdvisors />} />
      <Route path="/for-firms" element={<ForFirms />} />
      <Route path="/for-consumers" element={<ForConsumers />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/blog/*" element={<Blog />} />
      
      {/* Profile routes */}
      <Route path="/profile" element={<AdvisorProfile />} />
      <Route path="/advisor-profile" element={<AdvisorProfile />} />
      <Route path="/consumer-profile" element={<ConsumerProfile />} />
      <Route path="/firm-profile" element={<FirmProfile />} />
    </>
  );
};

export default MainRoutes;
