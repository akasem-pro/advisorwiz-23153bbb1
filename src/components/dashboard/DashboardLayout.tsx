
import React, { ReactNode, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import AnimatedRoute from '../ui/AnimatedRoute';
import { useIsMobile } from '../../hooks/use-mobile';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import MobileDashboard from './MobileDashboard';
import { getNavigationItems } from './dashboardNavigation';
import { useNavigation } from '../../hooks/use-navigation';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  actionButtons?: ReactNode;
  contentClassName?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title, 
  subtitle,
  actionButtons,
  contentClassName
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { userType, isAuthenticated, setIsAuthenticated, setUserType } = useUser();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const location = useLocation();
  const { navigateTo } = useNavigation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    navigateTo('/');
  };

  const navigationItems = getNavigationItems(userType);

  if (isMobile) {
    return (
      <MobileDashboard 
        title={title} 
        subtitle={subtitle}
        userType={userType}
      >
        {children}
      </MobileDashboard>
    );
  }

  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen bg-slate-50 dark:bg-navy-950 flex text-navy-900 dark:text-slate-100">
        <Sidebar 
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          userType={userType}
          navigationItems={navigationItems}
          handleLogout={handleLogout}
        />

        <div 
          className={cn(
            "transition-all duration-300 ease-in-out flex-1",
            sidebarCollapsed ? 'ml-16' : 'ml-56'
          )}
        >
          <DashboardHeader 
            title={title} 
            subtitle={subtitle}
            userType={userType}
            sidebarCollapsed={sidebarCollapsed}
            actionButtons={actionButtons}
          />
          
          <main className={cn(
            "p-5 bg-slate-50 dark:bg-navy-950",
            contentClassName
          )}>
            {children}
          </main>
        </div>
      </div>
    </AnimatedRoute>
  );
};

export default DashboardLayout;
