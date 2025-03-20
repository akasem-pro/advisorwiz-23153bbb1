
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import AppFooter from './AppFooter';
import AnimatedRoute from '../ui/AnimatedRoute';
import { Toaster } from '../ui/toaster';
import { initializeTagManager, trackPageView } from '../../utils/tagManager';

interface AppLayoutProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'none';
  withHeader?: boolean;
  withFooter?: boolean;
  pageTitle?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  animation = 'fade',
  withHeader = true,
  withFooter = true,
  pageTitle
}) => {
  const Content = () => <>{children}</>;
  const location = useLocation();
  
  // Initialize tag manager on component mount and track page view
  useEffect(() => {
    // Initialize Tag Manager
    initializeTagManager();
    
    // Track page view with custom title if provided
    const title = pageTitle || document.title || 'AdvisorWiz';
    trackPageView(title, location.pathname);
  }, [location.pathname, pageTitle]);
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {withHeader && <Header />}
      
      <main className="flex-grow">
        {animation !== 'none' ? (
          <AnimatedRoute animation={animation as 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale'}>
            <Content />
          </AnimatedRoute>
        ) : (
          <Content />
        )}
      </main>
      
      {withFooter && <AppFooter />}
      <Toaster />
    </div>
  );
};

export default AppLayout;
