
import React, { ReactNode, useState } from 'react';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';
import PageErrorBoundary from '../error/PageErrorBoundary';
import { Home, Calendar, MessageSquare, Settings, Users, PieChart, Target } from 'lucide-react';

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Default navigation items for the sidebar
  const navigationItems = [
    { label: 'Dashboard', icon: Home, link: '/advisor-dashboard' },
    { label: 'Analytics', icon: PieChart, link: '/analytics' },
    { label: 'Schedule', icon: Calendar, link: '/schedule' },
    { label: 'Messages', icon: MessageSquare, link: '/chat' },
    { label: 'Leads', icon: Target, link: '/leads' },
    { label: 'Team', icon: Users, link: '/team' },
    { label: 'Settings', icon: Settings, link: '/settings' }
  ];
  
  // Mock function for logout
  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <PageErrorBoundary>
      <div className={cn("flex min-h-screen bg-slate-50 dark:bg-navy-950", className)}>
        <Sidebar 
          sidebarCollapsed={sidebarCollapsed} 
          setSidebarCollapsed={setSidebarCollapsed} 
          userType="advisor"
          navigationItems={navigationItems}
          handleLogout={handleLogout}
        />
        
        <div className={cn(
          "flex-1 flex flex-col overflow-hidden",
          sidebarCollapsed ? "ml-20" : "ml-64"
        )}>
          <DashboardHeader 
            title={title || 'Analytics'} 
            subtitle={subtitle || 'Performance metrics and key indicators'} 
            actionButtons={actionButtons}
            userType="advisor"
            sidebarCollapsed={sidebarCollapsed}
          />
          
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
