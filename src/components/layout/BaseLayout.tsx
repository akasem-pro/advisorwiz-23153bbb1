
import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AnimatedRoute from '../ui/AnimatedRoute';
import SocialProofBar from '../ui/SocialProofBar';
import TrustBadges from '../ui/TrustBadges';
import FloatingSupportButton from '../support/FloatingSupportButton';
import { initializeTagManager, trackPageView } from '../../utils/tagManager';
import { cn } from '@/lib/utils';

export interface BaseLayoutProps {
  children: ReactNode;
  header: ReactNode;
  footer?: ReactNode;
  showSocialProof?: boolean;
  showTrustBadges?: boolean;
  fullWidth?: boolean;
  className?: string;
  contentClassName?: string;
  mobileNavbar?: ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale';
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  header,
  footer,
  showSocialProof = true,
  showTrustBadges = true,
  fullWidth = false,
  className = '',
  contentClassName = '',
  mobileNavbar,
  animation = 'fade'
}) => {
  const location = useLocation();
  
  useEffect(() => {
    // Initialize Tag Manager
    initializeTagManager();
    
    // Track initial page view
    const pageTitle = document.title || 'AdvisorWiz';
    trackPageView(pageTitle, location.pathname);
  }, [location]);

  return (
    <AnimatedRoute animation={animation}>
      <div className={cn(
        "min-h-screen flex flex-col bg-slate-50 dark:bg-navy-950 text-navy-900 dark:text-slate-100",
        className
      )}>
        {header}
        
        {showSocialProof && <SocialProofBar />}
        
        <main className={cn("flex-grow", contentClassName)}>
          {children}
          
          {showTrustBadges && (
            <div className={cn(
              fullWidth ? 'w-full px-4' : 'container mx-auto px-4',
              'my-8'
            )}>
              <TrustBadges className="justify-center" />
            </div>
          )}
        </main>
        
        <FloatingSupportButton />
        {footer}
        {mobileNavbar}
      </div>
    </AnimatedRoute>
  );
};

export default BaseLayout;
