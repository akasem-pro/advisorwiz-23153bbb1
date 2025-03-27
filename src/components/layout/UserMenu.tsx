
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronDown, 
  MessageSquare,
  Calendar,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../../features/auth/context/AuthProvider';
import { cn } from '@/lib/utils';

interface UserMenuProps {
  getUserName: () => string;
  getInitials: () => string;
  getProfileImage: () => string;
}

const UserMenu: React.FC<UserMenuProps> = ({ 
  getUserName, 
  getInitials, 
  getProfileImage 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const profileImage = getProfileImage();
  const userName = getUserName();
  const initials = getInitials();
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={toggleMenu}
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-lg",
          "hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-teal-500/40",
          isOpen && "bg-slate-100 dark:bg-navy-800"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="relative flex-shrink-0">
          {profileImage ? (
            <img 
              src={profileImage} 
              alt={userName} 
              className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-navy-700"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 flex items-center justify-center text-white text-sm font-medium shadow-sm">
              {initials}
            </div>
          )}
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-navy-800 rounded-full"></div>
        </div>
        <ChevronDown className={cn(
          "h-4 w-4 text-slate-500 dark:text-slate-400 transition-transform",
          isOpen && "transform rotate-180"
        )} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-navy-800 rounded-lg shadow-lg border border-slate-200 dark:border-navy-700 z-50 overflow-hidden">
          <div className="p-3 border-b border-slate-200 dark:border-navy-700">
            <p className="font-medium text-navy-900 dark:text-white">{userName}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">user@example.com</p>
          </div>
          
          <div className="p-2">
            <Link 
              to="/profile" 
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span>Your Profile</span>
            </Link>
            
            <Link 
              to="/messages" 
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300"
              onClick={() => setIsOpen(false)}
            >
              <MessageSquare className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span>Messages</span>
              <span className="ml-auto bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 text-xs px-1.5 py-0.5 rounded-full">3</span>
            </Link>
            
            <Link 
              to="/appointments" 
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300"
              onClick={() => setIsOpen(false)}
            >
              <Calendar className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span>Appointments</span>
            </Link>
            
            <Link 
              to="/billing" 
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300"
              onClick={() => setIsOpen(false)}
            >
              <CreditCard className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span>Billing</span>
            </Link>
            
            <Link 
              to="/settings" 
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span>Settings</span>
            </Link>
          </div>
          
          <div className="border-t border-slate-200 dark:border-navy-700 p-2">
            <button 
              onClick={() => {
                signOut();
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300"
            >
              <LogOut className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
