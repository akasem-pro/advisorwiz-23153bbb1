
import React, { ReactNode } from 'react';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';
import PageErrorBoundary from '../error/PageErrorBoundary';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actionButtons?: ReactNode;
  breadcrumb?: ReactNode;
  className?: string;
  contentClassName?: string;
  fullWidth?: boolean;
}

/**
 * Standard layout for dashboard pages with consistent header, navigation, and error handling
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
  actionButtons,
  breadcrumb,
  className,
  contentClassName,
  fullWidth = false,
}) => {
  return (
    <PageErrorBoundary>
      <div className={cn("flex min-h-screen bg-slate-50 dark:bg-navy-950", className)}>
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader title={title} subtitle={subtitle} actionButtons={actionButtons} />
          
          <main className="flex-1 overflow-auto p-4 md:p-6">
            {breadcrumb && (
              <div className="mb-4">
                {breadcrumb}
              </div>
            )}
            
            <div className={cn(
              "mx-auto",
              contentClassName,
              !fullWidth && "max-w-7xl"
            )}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </PageErrorBoundary>
  );
};

export default DashboardLayout;
