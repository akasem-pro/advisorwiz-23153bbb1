
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BaseLayout from './BaseLayout';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
  hideSocialProof?: boolean;
  fullWidth?: boolean;
  className?: string;
  showTrustBadges?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  hideSocialProof = false,
  fullWidth = false,
  className = '',
  showTrustBadges = true
}) => {
  return (
    <BaseLayout
      header={<Header />}
      footer={<Footer />}
      showSocialProof={!hideSocialProof}
      showTrustBadges={showTrustBadges}
      fullWidth={fullWidth}
      className={className}
      contentClassName="pt-32 md:pt-36"
    >
      {children}
    </BaseLayout>
  );
};

export default AppLayout;
