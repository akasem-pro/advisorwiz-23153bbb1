
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AnimatedRoute from '../ui/AnimatedRoute';
import Header from './Header';
import MobileNavbar from './MobileNavbar';
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
      <main className="flex-1 pt-16 pb-20 px-4 sm:px-6 mx-auto w-full">
        <AnimatedRoute animation="fade">
          <Outlet />
        </AnimatedRoute>
      </main>
      <MobileNavbar />
    </div>
  );
};

export default MobileLayout;
