import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AnimatedRoute from '../ui/AnimatedRoute';
import TrustBadges from '../ui/TrustBadges';
import FloatingSupportButton from '../support/FloatingSupportButton';
import { trackPageView } from '../../services/analytics/analyticsService';
import { cn } from '@/lib/utils';
import AppFooter from './AppFooter';

export interface BaseLayoutProps {
  children: ReactNode;
  header: ReactNode;
  footer?: ReactNode | null;
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
  hideFooter?: boolean;
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
  skipToContentId,
  hideFooter = false
}) => {
  const location = useLocation();
  
  // Handle analytics
  useEffect(() => {
    const pageTitle = document.title || 'AdvisorWiz';
    
    // Track page view with the improved analytics service
    trackPageView(pageTitle, location.pathname);
    
  }, [location]);

  // Animation duration class
  const getDurationClass = () => {
    switch (animationDuration) {
      case 'fast': return 'duration-200';
      case 'slow': return 'duration-500';
      default: return 'duration-300';
    }
  };
  
  // Determine what footer to render
  // If hideFooter is true or footer is explicitly set to null, don't render footer
  const renderFooter = !hideFooter && footer !== null;
  const footerElement = renderFooter ? (footer || <AppFooter />) : null;

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
      
      {/* Footer rendering */}
      {footerElement}
      
      {mobileNavbar}
    </div>
  );

  if (animation === 'none') {
    return renderContent();
  }

  return (
    <AnimatedRoute 
      animation={animation} 
      className={getDurationClass()}
    >
      {renderContent()}
    </AnimatedRoute>
  );
};

export default BaseLayout;
