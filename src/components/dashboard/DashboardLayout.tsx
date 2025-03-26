
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

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title, 
  subtitle 
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
      <div className="min-h-screen bg-slate-50 dark:bg-navy-900 flex">
        <Sidebar 
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          userType={userType}
          navigationItems={navigationItems}
          handleLogout={handleLogout}
        />

        <div 
          className={`transition-all duration-300 ease-in-out ${
            sidebarCollapsed ? 'ml-20' : 'ml-64'
          } flex-1`}
        >
          <DashboardHeader 
            title={title} 
            subtitle={subtitle}
            userType={userType}
            sidebarCollapsed={sidebarCollapsed}
          />
          
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </AnimatedRoute>
  );
};

export default DashboardLayout;
