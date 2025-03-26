
import React from 'react';
import { Home, MessageCircle, Calendar, Settings, Search, User, BellRing } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { getDashboardLink } from '../dashboard/dashboardNavigation';
import { useNavigation } from '../../hooks/use-navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import UserMenu from './UserMenu';

const MobileNavbar: React.FC = () => {
  const { userType } = useUser();
  const { navigateTo, currentPath } = useNavigation();
  
  const dashboardLink = getDashboardLink(userType);
  
  const navItems = [
    { label: 'Home', icon: Home, link: dashboardLink },
    { label: 'Messages', icon: MessageCircle, link: '/chat' },
    { label: 'Schedule', icon: Calendar, link: '/schedule' },
    { label: 'Search', icon: Search, link: '/matches' },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-navy-800 border-t border-slate-200 dark:border-navy-700 z-30">
      <div className="grid grid-cols-5 h-14">
        <TooltipProvider>
          {navItems.map((item) => {
            const isActive = currentPath === item.link;
            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <button
                    className={`flex flex-col items-center justify-center text-xs ${
                      isActive 
                      ? 'text-teal-500 dark:text-teal-400' 
                      : 'text-slate-600 dark:text-slate-400'
                    }`}
                    onClick={() => navigateTo(item.link)}
                  >
                    <item.icon className="h-5 w-5 mb-1" />
                    <span>{item.label}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
          
          {/* Profile Menu in Mobile Nav */}
          <Popover>
            <PopoverTrigger asChild>
              <button 
                className={`flex flex-col items-center justify-center text-xs ${
                  ['/consumer-profile', '/advisor-profile', '/firm-profile'].includes(currentPath)
                  ? 'text-teal-500 dark:text-teal-400' 
                  : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <User className="h-5 w-5 mb-1" />
                <span>Profile</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0" align="end">
              <UserMenu 
                getUserName={() => userType === 'consumer' ? 'Consumer' : userType === 'advisor' ? 'Advisor' : 'Firm Admin'}
                getInitials={() => userType && userType[0] ? userType[0].toUpperCase() : 'U'}
                getProfileImage={() => ''}
              />
            </PopoverContent>
          </Popover>
        </TooltipProvider>
      </div>
    </nav>
  );
};

export default MobileNavbar;
