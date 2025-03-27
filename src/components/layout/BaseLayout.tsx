
import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AnimatedRoute from '../ui/AnimatedRoute';
import TrustBadges from '../ui/TrustBadges';
import FloatingSupportButton from '../support/FloatingSupportButton';
import { initializeTagManager, trackPageView } from '../../utils/tagManager';
import { cn } from '@/lib/utils';
import Footer from './Footer';

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
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'none';
  animationDuration?: 'fast' | 'normal' | 'slow';
  headerClassName?: string;
  mainClassName?: string;
  withoutPadding?: boolean;
  skipToContentId?: string;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  header,
  footer,
  showSocialProof = false,
  showTrustBadges = true,
  fullWidth = false,
  className = '',
  contentClassName = '',
  mobileNavbar,
  animation = 'fade',
  animationDuration = 'normal',
  headerClassName = '',
  mainClassName = '',
  withoutPadding = true,
  skipToContentId
}) => {
  const location = useLocation();
  
  useEffect(() => {
    initializeTagManager();
    const pageTitle = document.title || 'AdvisorWiz';
    trackPageView(pageTitle, location.pathname);
  }, [location]);

  const getAnimationDurationClass = () => {
    switch (animationDuration) {
      case 'fast': return 'duration-200';
      case 'slow': return 'duration-500';
      default: return 'duration-300';
    }
  };

  const renderContent = () => (
    <div className={cn(
      "min-h-screen flex flex-col bg-slate-50 dark:bg-navy-950 text-navy-900 dark:text-slate-100",
      className
    )}>
      {skipToContentId && (
        <a href={`#${skipToContentId}`} className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-white focus:text-navy-900 focus:border focus:border-navy-600">
          Skip to content
        </a>
      )}
      
      <header className={cn("z-50", headerClassName)}>
        {header}
      </header>
      
      <main className={cn(
        "flex-grow",
        !withoutPadding && contentClassName,
        mainClassName
      )} id={skipToContentId}>
        <div className={cn(
          withoutPadding ? '' : contentClassName
        )}>
          {children}
        </div>
        
        {showTrustBadges && (
          <div className={cn(
            fullWidth ? 'w-full' : 'container mx-auto',
            'my-2'
          )}>
            <TrustBadges className="justify-center" />
          </div>
        )}
      </main>
      
      <FloatingSupportButton />
      {/* Render the Footer component by default unless explicitly passed something */}
      {footer === undefined ? <Footer /> : footer}
      {mobileNavbar}
    </div>
  );

  if (animation === 'none') {
    return renderContent();
  }

  return (
    <AnimatedRoute 
      animation={animation} 
      className={getAnimationDurationClass()}
    >
      {renderContent()}
    </AnimatedRoute>
  );
};

export default BaseLayout;
