import React from 'react';
import { Outlet } from 'react-router-dom';
import AnimatedRoute from '../ui/AnimatedRoute';
import Header from './Header';
import MobileNavbar from './MobileNavbar';

const MobileLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 pt-16 pb-16 px-4 max-w-md mx-auto w-full">
        <AnimatedRoute animation="fade">
          <Outlet />
        </AnimatedRoute>
      </main>
      <MobileNavbar />
    </div>
  );
};

export default MobileLayout;
