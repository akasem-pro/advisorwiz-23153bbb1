
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Settings, 
  LogOut, 
  MessageSquare,
  Calendar,
  CreditCard
} from 'lucide-react';

interface UserMenuContentProps {
  userName: string;
  userEmail?: string;
  onClose: () => void;
  onSignOut: () => void;
}

const UserMenuContent: React.FC<UserMenuContentProps> = ({
  userName,
  userEmail = 'user@example.com',
  onClose,
  onSignOut
}) => {
  return (
    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-navy-800 rounded-lg shadow-lg border border-slate-200 dark:border-navy-700 z-50 overflow-hidden">
      <div className="p-3 border-b border-slate-200 dark:border-navy-700">
        <p className="font-medium text-navy-900 dark:text-white">{userName}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{userEmail}</p>
      </div>
      
      <div className="p-2">
        <Link 
          to="/profile" 
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300"
          onClick={onClose}
        >
          <User className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          <span>Your Profile</span>
        </Link>
        
        <Link 
          to="/messages" 
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300"
          onClick={onClose}
        >
          <MessageSquare className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          <span>Messages</span>
          <span className="ml-auto bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 text-xs px-1.5 py-0.5 rounded-full">3</span>
        </Link>
        
        <Link 
          to="/appointments" 
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300"
          onClick={onClose}
        >
          <Calendar className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          <span>Appointments</span>
        </Link>
        
        <Link 
          to="/billing" 
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300"
          onClick={onClose}
        >
          <CreditCard className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          <span>Billing</span>
        </Link>
        
        <Link 
          to="/settings" 
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300"
          onClick={onClose}
        >
          <Settings className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          <span>Settings</span>
        </Link>
      </div>
      
      <div className="border-t border-slate-200 dark:border-navy-700 p-2">
        <button 
          onClick={() => {
            onSignOut();
            onClose();
          }}
          className="flex w-full items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300"
        >
          <LogOut className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default UserMenuContent;
