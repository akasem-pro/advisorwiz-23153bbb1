import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

import OfflineIndicator from '../ui/OfflineIndicator';

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-navy-900">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <OfflineIndicator />
    </div>
  );
};

export default AppLayout;
