
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const AuthButtons: React.FC = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Link
        to="/login"
        className={cn(
          "text-sm px-3 py-1.5 rounded-md text-slate-700 dark:text-slate-200",
          "hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-teal-500/40"
        )}
      >
        Sign In
      </Link>
      
      <Link
        to="/onboarding"
        className={cn(
          "text-sm px-4 py-1.5 rounded-md font-medium",
          "bg-teal-500 hover:bg-teal-600 text-white shadow-sm",
          "dark:bg-teal-600 dark:hover:bg-teal-700 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-teal-500/40"
        )}
      >
        Sign Up
      </Link>
    </div>
  );
};

export default AuthButtons;
