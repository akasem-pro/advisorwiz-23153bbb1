
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BellRing, HelpCircle, Menu, X } from 'lucide-react';
import { UserType } from '../../context/UserContext';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useIsMobile } from '../../hooks/use-mobile';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  userType: UserType;
  sidebarCollapsed: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  title, 
  subtitle, 
  userType,
  sidebarCollapsed
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New message from client", read: false },
    { id: 2, text: "Appointment scheduled for tomorrow", read: false },
    { id: 3, text: "Profile view by potential client", read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const getProfileLink = () => {
    if (userType === 'consumer') return '/consumer-profile';
    if (userType === 'advisor') return '/advisor-profile';
    if (userType === 'firm_admin') return '/firm-profile';
    return '/';
  };
  
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      // Mark as read when opening
      setTimeout(() => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
      }, 3000);
    }
  };
  
  const handleHelpClick = () => {
    toast.info("Help & Support", { 
      description: "Our support team is available 24/7 to assist you.",
      action: {
        label: "Contact",
        onClick: () => navigate('/contact')
      }
    });
  };
  
  return (
    <header className="bg-white dark:bg-navy-800 border-b border-slate-200 dark:border-navy-700 sticky top-0 z-20 transition-all">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        <div className="flex items-center">
          {isMobile && (
            <Button variant="ghost" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            </Button>
          )}
          <div>
            <h1 className="text-lg font-medium text-navy-900 dark:text-slate-100">{title}</h1>
            {subtitle && <p className="text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>}
          </div>
        </div>
        
        <div className="flex items-center space-x-1 md:space-x-4">
          {!isMobile && !searchOpen ? (
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-navy-600 dark:bg-navy-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-40 md:w-64"
                aria-label="Search"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 h-5 w-5" />
            </div>
          ) : isMobile && !searchOpen ? (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
            >
              <Search className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            </Button>
          ) : isMobile && searchOpen ? (
            <div className="absolute inset-0 bg-white dark:bg-navy-800 z-30 flex items-center px-4">
              <input 
                type="text" 
                placeholder="Search..." 
                className="flex-1 pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-navy-600 dark:bg-navy-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                autoFocus
                aria-label="Search"
              />
              <Search className="absolute left-7 text-slate-400 dark:text-slate-500 h-5 w-5" />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSearchOpen(false)}
                className="ml-2"
                aria-label="Close search"
              >
                <X className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              </Button>
            </div>
          ) : null}
          
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleNotifications}
              className="relative"
              aria-label={`Notifications${unreadNotificationsCount > 0 ? ` (${unreadNotificationsCount} unread)` : ''}`}
            >
              <BellRing className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              {unreadNotificationsCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white text-xs"
                  aria-hidden="true"
                >
                  {unreadNotificationsCount}
                </Badge>
              )}
            </Button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-navy-800 rounded-lg shadow-lg border border-slate-200 dark:border-navy-700 overflow-hidden z-30">
                <div className="p-3 border-b border-slate-200 dark:border-navy-700 flex justify-between items-center">
                  <h3 className="font-medium">Notifications</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs h-auto py-1"
                  >
                    Mark all as read
                  </Button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div>
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-3 border-b border-slate-100 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors ${!notification.read ? 'bg-teal-50 dark:bg-teal-900/20' : ''}`}
                        >
                          <p className="text-sm text-slate-800 dark:text-slate-200">{notification.text}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Just now</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-slate-500 dark:text-slate-400">
                      No notifications
                    </div>
                  )}
                </div>
                <div className="p-2 border-t border-slate-200 dark:border-navy-700 text-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-teal-600 dark:text-teal-400 text-xs w-full"
                    onClick={() => navigate('/notifications')}
                  >
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleHelpClick}
            aria-label="Help and support"
          >
            <HelpCircle className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </Button>
          
          <Button 
            variant="ghost"
            size="icon"
            className="ml-1 md:ml-4 focus:ring-2 focus:ring-teal-500"
            onClick={() => navigate(getProfileLink())}
            aria-label="Your profile"
          >
            <div className="w-8 h-8 bg-teal-100 dark:bg-teal-800 rounded-full flex items-center justify-center text-teal-700 dark:text-teal-200 font-medium">
              {userType === 'consumer' ? 'C' : userType === 'advisor' ? 'A' : 'F'}
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
