
import React, { ReactNode, useEffect, useState, useTransition, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import AnimatedRoute from '../ui/AnimatedRoute';
import TrustBadges from '../ui/TrustBadges';
import FloatingSupportButton from '../support/FloatingSupportButton';
import { initializeTagManager, trackPageView } from '../../utils/tagManager';
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
  withoutPadding = false,
  skipToContentId
}) => {
  const location = useLocation();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isPending, startTransition] = useTransition();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Handle analytics with debouncing
  useEffect(() => {
    let isMounted = true;
    
    // Wrap analytics initialization in startTransition to prevent suspension issues
    startTransition(() => {
      try {
        // Initialize tag manager only once
        if (isInitialLoad && isMounted) {
          initializeTagManager();
          setIsInitialLoad(false);
        }
        
        // Debounce page view tracking to avoid performance impact
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        
        timerRef.current = setTimeout(() => {
          if (isMounted) {
            const pageTitle = document.title || 'AdvisorWiz';
            trackPageView(pageTitle, location.pathname);
          }
        }, 300);
      } catch (error) {
        console.error("Error in analytics:", error);
      }
    });
    
    // Proper cleanup function that cancels the timer and prevents state updates after unmounting
    return () => { 
      isMounted = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [location, isInitialLoad]);
  
  // Safer approach to managing content visibility
  const [contentVisible, setContentVisible] = useState(false);
  
  useEffect(() => {
    let isMounted = true;
    let visibilityTimer: ReturnType<typeof setTimeout> | null = null;
    
    // Use startTransition for content visibility to avoid suspension
    visibilityTimer = setTimeout(() => {
      if (isMounted) {
        startTransition(() => {
          setContentVisible(true);
        });
      }
    }, 0);
    
    // Proper cleanup function
    return () => {
      isMounted = false;
      if (visibilityTimer) {
        clearTimeout(visibilityTimer);
      }
    };
  }, []);

  // Animation duration class - memoized to prevent unnecessary recalculations
  const durationClass = React.useMemo(() => {
    switch (animationDuration) {
      case 'fast': return "duration-200";
      case 'slow': return "duration-500";
      default: return "duration-300";
    }
  }, [animationDuration]);
  
  // Determine what footer to render - memoized to prevent rerenders
  const footerElement = React.useMemo(() => 
    footer === null ? null : (footer || <AppFooter />),
  [footer]);

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
        withoutPadding ? '' : mainClassName
      )} id={skipToContentId}>
        <div className={cn(
          "container mx-auto px-4 py-8", // Added default container and padding
          withoutPadding ? '' : contentClassName
        )}>
          {contentVisible ? children : (
            // Add a placeholder while content is loading
            <div className="animate-pulse flex space-x-4 h-64">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-4 bg-slate-200 dark:bg-navy-700 rounded w-3/4"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-4 bg-slate-200 dark:bg-navy-700 rounded col-span-2"></div>
                    <div className="h-4 bg-slate-200 dark:bg-navy-700 rounded col-span-1"></div>
                  </div>
                  <div className="h-4 bg-slate-200 dark:bg-navy-700 rounded"></div>
                </div>
              </div>
            </div>
          )}
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
      
      {/* Only render FloatingSupportButton after initial load */}
      {!isInitialLoad && contentVisible && (
        <React.Suspense fallback={null}>
          <FloatingSupportButton />
        </React.Suspense>
      )}
      
      {/* Single footer rendering logic */}
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
      className={durationClass}
    >
      {renderContent()}
    </AnimatedRoute>
  );
};

export default React.memo(BaseLayout);
