
import React, { ReactNode } from 'react';
import Header from './Header';
import MobileNavbar from './MobileNavbar';
import BaseLayout from './BaseLayout';

interface MobileLayoutProps {
  children: ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <BaseLayout
      header={<Header />}
      mobileNavbar={<MobileNavbar />}
      contentClassName="pt-40 pb-20 px-4 sm:px-6 mx-auto w-full"
    >
      {children}
    </BaseLayout>
  );
};

export default MobileLayout;
