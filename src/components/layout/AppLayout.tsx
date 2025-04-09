
import React, { ReactNode, useEffect } from 'react';
import AppFooter from './AppFooter';
import Header from './Header';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
  headerProps?: {
    transparent?: boolean;
    className?: string;
  };
  footerProps?: {
    className?: string;
  };
  contentClassName?: string;
  className?: string;
  hideSocialProof?: boolean;
  withoutPadding?: boolean;
  hideFooter?: boolean;
}

/**
 * Standard layout for application pages with consistent header and footer
 */
const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  fullWidth = false,
  headerProps,
  footerProps,
  contentClassName,
  className,
  hideFooter = false,
  withoutPadding = false,
  hideSocialProof = false
}) => {
  useEffect(() => {
    console.log("AppLayout mounted");
    
    return () => console.log("AppLayout unmounted");
  }, []);
  
  return (
    <div className={cn("flex min-h-screen flex-col bg-white dark:bg-navy-950", className)}>
      <Header 
        transparent={headerProps?.transparent} 
        className={headerProps?.className} 
      />
      
      <main className={cn(
        "flex-grow w-full pt-16", // Add padding top for header
        contentClassName
      )}>
        <div className={cn(
          "w-full mx-auto",
          !fullWidth && "container px-4 sm:px-6 lg:px-8",
          !withoutPadding && "py-8"
        )}>
          {children}
        </div>
      </main>
      
      {!hideFooter && <AppFooter className={footerProps?.className} />}
    </div>
  );
};

export default AppLayout;
