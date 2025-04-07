
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
}) => {
  console.log("AppLayout rendering with children:", !!children);
  
  return (
    <div className={cn("flex min-h-screen flex-col bg-white dark:bg-navy-950", className)}>
      <Header 
        transparent={headerProps?.transparent} 
        className={headerProps?.className} 
      />
      
      <main className={cn(
        "flex-grow flex flex-col",
        contentClassName
      )}>
        <div className={cn(
          "container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow",
          fullWidth && "max-w-none px-0 sm:px-0 lg:px-0"
        )}>
          {children}
        </div>
      </main>
      
      <AppFooter className={footerProps?.className} />
    </div>
  );
};

export default AppLayout;
