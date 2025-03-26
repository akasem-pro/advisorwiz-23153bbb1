
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
  contentClassName?: string;
  withoutPadding?: boolean;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale';
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  hideSocialProof = false,
  fullWidth = false,
  className = '',
  showTrustBadges = true,
  contentClassName,
  withoutPadding = false,
  animation = 'fade'
}) => {
  return (
    <BaseLayout
      header={<Header />}
      footer={<Footer />}
      showSocialProof={!hideSocialProof}
      showTrustBadges={showTrustBadges}
      fullWidth={fullWidth}
      className={className}
      contentClassName={cn("pt-32 md:pt-36", contentClassName)}
      withoutPadding={withoutPadding}
      animation={animation}
    >
      {children}
    </BaseLayout>
  );
};

export default AppLayout;
