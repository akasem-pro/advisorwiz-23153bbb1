
import React from 'react';
import Header from './Header';
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
  hideFooter?: boolean;
  showFooter?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  hideSocialProof = false,
  fullWidth = false,
  className = '',
  showTrustBadges = false,
  contentClassName,
  withoutPadding = true,
  animation = 'fade',
  animationDuration = 'normal',
  skipToContentId = 'main-content',
  hideFooter = false,
  showFooter = false
}) => {
  // Override hideFooter if showFooter is explicitly true
  const finalHideFooter = showFooter ? false : hideFooter;

  return (
    <BaseLayout
      header={<Header />}
      footer={finalHideFooter ? null : undefined}
      showSocialProof={!hideSocialProof}
      showTrustBadges={showTrustBadges}
      fullWidth={fullWidth}
      className={className}
      contentClassName={cn("pt-16 md:pt-24", contentClassName)}
      withoutPadding={withoutPadding}
      animation={animation}
      animationDuration={animationDuration}
      skipToContentId={skipToContentId}
      hideFooter={finalHideFooter}
    >
      {children}
    </BaseLayout>
  );
};

export default AppLayout;
