
import React from 'react';
import { Home, MessageCircle, Calendar, Settings, Search, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { getDashboardLink } from '../dashboard/dashboardNavigation';

const MobileNavbar: React.FC = () => {
  const { userType } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  
  const dashboardLink = getDashboardLink(userType);
  
  const navItems = [
    { label: 'Home', icon: Home, link: dashboardLink },
    { label: 'Messages', icon: MessageCircle, link: '/chat' },
    { label: 'Schedule', icon: Calendar, link: '/schedule' },
    { label: 'Search', icon: Search, link: '/matches' },
    { label: 'Profile', icon: User, link: userType === 'consumer' 
      ? '/consumer-profile' 
      : userType === 'advisor' 
        ? '/advisor-profile' 
        : '/firm-profile' 
    },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-navy-800 border-t border-slate-200 dark:border-navy-700 z-30">
      <div className="grid grid-cols-5 h-14">
        {navItems.map((item) => {
          const isActive = location.pathname === item.link;
          return (
            <button
              key={item.label}
              className={`flex flex-col items-center justify-center text-xs ${
                isActive 
                ? 'text-teal-500 dark:text-teal-400' 
                : 'text-slate-600 dark:text-slate-400'
              }`}
              onClick={() => navigate(item.link)}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavbar;
