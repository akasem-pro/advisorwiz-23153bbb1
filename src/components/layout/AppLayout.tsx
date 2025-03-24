
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AnimatedRoute from '../ui/AnimatedRoute';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default AppLayout;
