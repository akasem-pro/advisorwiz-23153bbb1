
import React, { ReactNode } from 'react';
import Header from './Header';
import MobileNavbar from './MobileNavbar';
import BaseLayout from './BaseLayout';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: ReactNode;
  contentClassName?: string;
  showSocialProof?: boolean;
  showTrustBadges?: boolean;
  withoutPadding?: boolean;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'none';
  animationDuration?: 'fast' | 'normal' | 'slow';
  skipToContentId?: string;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children,
  contentClassName,
  showSocialProof = false,
  showTrustBadges = true,
  withoutPadding = true, // Set default to true to remove padding
  animation = 'fade',
  animationDuration = 'normal',
  skipToContentId = 'mobile-content'
}) => {
  return (
    <BaseLayout
      header={<Header />}
      mobileNavbar={<MobileNavbar />}
      contentClassName={cn("pt-16 pb-16 px-2 sm:px-2 mx-auto w-full", contentClassName)} // Reduced padding
      showSocialProof={showSocialProof}
      showTrustBadges={showTrustBadges}
      withoutPadding={withoutPadding}
      animation={animation}
      animationDuration={animationDuration}
      skipToContentId={skipToContentId}
    >
      {children}
    </BaseLayout>
  );
};

export default MobileLayout;
