
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AnimatedRoute from '../ui/AnimatedRoute';
import Header from './Header';
import MobileNavbar from './MobileNavbar';
import SocialProofBar from '../ui/SocialProofBar';
import TrustBadges from '../ui/TrustBadges';
import FloatingSupportButton from '../support/FloatingSupportButton';
import { initializeTagManager, trackPageView } from '../../utils/tagManager';

const MobileLayout: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Initialize Tag Manager
    initializeTagManager();
    
    // Track initial page view
    const pageTitle = document.title || 'AdvisorWiz Mobile';
    trackPageView(pageTitle, location.pathname);
  }, [location]);
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <SocialProofBar />
      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 mx-auto w-full">
        <AnimatedRoute animation="fade">
          <Outlet />
        </AnimatedRoute>
        
        <div className="my-8">
          <TrustBadges compact className="justify-center" />
        </div>
      </main>
      <FloatingSupportButton />
      <MobileNavbar />
    </div>
  );
};

export default MobileLayout;
