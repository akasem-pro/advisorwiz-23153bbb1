
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
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'none';
  animationDuration?: 'fast' | 'normal' | 'slow';
  skipToContentId?: string;
  hideFooter?: boolean; // Added prop to optionally hide footer
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  hideSocialProof = false,
  fullWidth = false,
  className = '',
  showTrustBadges = true,
  contentClassName,
  withoutPadding = true, // Set default to true to remove padding
  animation = 'fade',
  animationDuration = 'normal',
  skipToContentId = 'main-content',
  hideFooter = false // Default to showing footer
}) => {
  return (
    <BaseLayout
      header={<Header />}
      footer={hideFooter ? undefined : <Footer />}
      showSocialProof={!hideSocialProof}
      showTrustBadges={showTrustBadges}
      fullWidth={fullWidth}
      className={className}
      contentClassName={cn("pt-24 md:pt-28", contentClassName)} // Increased top padding
      withoutPadding={withoutPadding}
      animation={animation}
      animationDuration={animationDuration}
      skipToContentId={skipToContentId}
    >
      {children}
    </BaseLayout>
  );
};

export default AppLayout;
