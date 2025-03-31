
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
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  hideSocialProof = false,
  fullWidth = false,
  className = '',
  showTrustBadges = false,
  contentClassName,
  withoutPadding = false,
  animation = 'none',
  animationDuration = 'normal',
  skipToContentId = 'main-content',
  hideFooter = false
}) => {
  console.log("AppLayout rendering with children:", children ? "Children exists" : "No children");
  
  return (
    <BaseLayout
      header={<Header />}
      footer={hideFooter ? null : undefined}
      showSocialProof={!hideSocialProof}
      showTrustBadges={showTrustBadges}
      fullWidth={fullWidth}
      className={className}
      contentClassName={cn("pt-24 md:pt-28", contentClassName)}
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
