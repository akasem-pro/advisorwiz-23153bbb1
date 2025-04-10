
import React, { memo, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, User, MessageCircle, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

// Memoize the NavItem component to prevent unnecessary re-renders
const NavItem = memo<NavItemProps>(({ to, icon, label, isActive, onClick }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center justify-center px-3 py-1",
        isActive 
          ? "text-teal-600 dark:text-teal-400" 
          : "text-slate-600 dark:text-slate-400"
      )}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
});

NavItem.displayName = 'NavItem';

interface MobileNavbarProps {
  className?: string;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ className = '' }) => {
  const location = useLocation();
  
  // Memoize this calculation so it doesn't run on every render
  const pathWithoutTrailingSlash = useMemo(() => {
    return location.pathname.endsWith('/')
      ? location.pathname.slice(0, -1)
      : location.pathname;
  }, [location.pathname]);
  
  // Memoize the isActive function
  const isActive = useMemo(() => {
    return (path: string) => {
      if (path === '/') {
        return pathWithoutTrailingSlash === '' || pathWithoutTrailingSlash === '/';
      }
      return pathWithoutTrailingSlash === path || pathWithoutTrailingSlash.startsWith(`${path}/`);
    };
  }, [pathWithoutTrailingSlash]);
  
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-white dark:bg-navy-900 border-t border-slate-200 dark:border-navy-700 px-1 py-1 flex justify-around items-center z-50 safe-area-bottom",
      className
    )}>
      <NavItem 
        to="/" 
        icon={<Home className="h-5 w-5" />} 
        label="Home" 
        isActive={isActive('/')} 
      />
      
      <NavItem 
        to="/matches" 
        icon={<Search className="h-5 w-5" />} 
        label="Find Advisor" 
        isActive={isActive('/matches')} 
      />
      
      <NavItem 
        to="/chat" 
        icon={<MessageCircle className="h-5 w-5" />} 
        label="Messages" 
        isActive={isActive('/chat')} 
      />
      
      <NavItem 
        to="/consumer-profile" 
        icon={<User className="h-5 w-5" />} 
        label="Profile" 
        isActive={isActive('/consumer-profile')} 
      />
      
      <NavItem 
        to="/menu" 
        icon={<Menu className="h-5 w-5" />} 
        label="More" 
        isActive={isActive('/menu')} 
      />
    </div>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default memo(MobileNavbar);
