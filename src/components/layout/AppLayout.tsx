
import React, { ReactNode } from 'react';
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
  console.log("AppLayout rendering with children:", !!children);
  
  return (
    <div className={cn("flex min-h-screen flex-col bg-white dark:bg-navy-950", className)}>
      <Header 
        transparent={headerProps?.transparent} 
        className={headerProps?.className} 
      />
      
      <div className={cn(
        "flex-grow flex flex-col w-full",
        contentClassName
      )}>
        <div className={cn(
          "w-full mx-auto flex-grow",
          !fullWidth && "container px-4 sm:px-6 lg:px-8",
          !withoutPadding && "py-8"
        )}>
          {children}
        </div>
      </div>
      
      {!hideFooter && <AppFooter className={footerProps?.className} />}
    </div>
  );
};

export default AppLayout;
