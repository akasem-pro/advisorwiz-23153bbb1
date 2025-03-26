
import React from 'react';
import { Button } from '../ui/button';
import { useAuth } from '../../features/auth/context/AuthProvider';
import { LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { getEffectiveAuthStatus } from '../../utils/mockAuthUtils';

interface AuthButtonsProps {
  className?: string;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ className = '' }) => {
  const { user, signOut, loading } = useAuth();
  const { isAuthenticated } = useUser();
  
  // Use effective authentication status
  const effectiveIsAuthenticated = getEffectiveAuthStatus(isAuthenticated);
  
  // Show loading state
  if (loading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Button variant="outline" size="sm" disabled className="h-9">
          <span className="h-4 w-4 mr-2 animate-spin rounded-full border-b-2 border-current"></span>
          <span className="hidden sm:inline">Loading...</span>
        </Button>
      </div>
    );
  }
  
  // Show sign out button if user is authenticated
  if (user || effectiveIsAuthenticated) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <span className="text-sm text-navy-600 dark:text-slate-300 mr-2 hidden md:inline-block">
          {user?.email || 'Authenticated User'}
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => signOut()}
          className="flex items-center space-x-1 border-navy-600 text-navy-600 dark:border-slate-300 dark:text-slate-300 h-9"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    );
  }
  
  // Show sign in button for unauthenticated users
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Link to="/sign-in">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center space-x-1 border-navy-600 text-navy-600 dark:border-slate-300 dark:text-slate-300 h-9"
        >
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Sign In</span>
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
