
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserMenuTriggerProps {
  isOpen: boolean;
  onClick: () => void;
  userName: string;
  profileImage: string;
  initials: string;
}

const UserMenuTrigger: React.FC<UserMenuTriggerProps> = ({
  isOpen,
  onClick,
  userName,
  profileImage,
  initials
}) => {
  return (
    <button 
      onClick={onClick}
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
  );
};

export default UserMenuTrigger;
