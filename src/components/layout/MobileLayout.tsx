
import React, { ReactNode, useEffect, useRef } from 'react';
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
  showFooter?: boolean;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children,
  contentClassName,
  showSocialProof = false,
  showTrustBadges = false,
  withoutPadding = true,
  animation = 'fade',
  animationDuration = 'normal',
  skipToContentId = 'mobile-content',
  hideFooter = true,
  showFooter = false
}) => {
  const mountTime = useRef(Date.now());
  
  // Debug rendering
  useEffect(() => {
    console.log('MobileLayout rendering with children:', !!children);
    console.log('MobileLayout showFooter:', showFooter);
    console.log('MobileLayout contentClassName:', contentClassName);
    
    // Additional debug logging
    const mountDuration = Date.now() - mountTime.current;
    console.log(`MobileLayout mounted after ${mountDuration}ms`);
    
    // Log DOM structure
    setTimeout(() => {
      const container = document.querySelector('.mobile-content-container');
      if (container) {
        console.log('MobileLayout container children:', container.childNodes.length);
      } else {
        console.warn('MobileLayout container not found in DOM');
      }
    }, 100);
  }, [children, showFooter, contentClassName]);

  // Override hideFooter if showFooter is explicitly true
  const finalHideFooter = showFooter ? false : hideFooter;

  return (
    <BaseLayout
      header={<Header />}
      footer={finalHideFooter ? null : undefined} // Pass null to completely hide footer, undefined to use default
      mobileNavbar={<MobileNavbar />}
      contentClassName={cn("pt-16 pb-20 min-h-screen", contentClassName)} // Adjusted padding for better visibility
      showSocialProof={showSocialProof}
      showTrustBadges={showTrustBadges}
      withoutPadding={withoutPadding}
      animation={animation}
      animationDuration={animationDuration}
      skipToContentId={skipToContentId}
      hideFooter={finalHideFooter}
    >
      <div id={skipToContentId} className="mobile-content-container">
        {children || <div className="p-4 text-center">Loading content...</div>}
      </div>
    </BaseLayout>
  );
};

export default MobileLayout;
