
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
  hideFooter?: boolean;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children,
  contentClassName,
  showSocialProof = false,
  showTrustBadges = false, // Default to false to avoid duplication
  withoutPadding = true,
  animation = 'fade',
  animationDuration = 'normal',
  skipToContentId = 'mobile-content',
  hideFooter = false
}) => {
  return (
    <BaseLayout
      header={<Header />}
      footer={hideFooter ? null : undefined} // If hideFooter is true, explicitly pass null, otherwise let BaseLayout handle it
      mobileNavbar={<MobileNavbar />}
      contentClassName={cn("pt-14 pb-14", contentClassName)}
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
