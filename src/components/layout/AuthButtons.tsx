
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useAuth } from '../../features/auth/context/AuthProvider';
import { LogOut } from 'lucide-react';

interface AuthButtonsProps {
  className?: string;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ className = '' }) => {
  const { user, signOut, loading } = useAuth();
  
  // Show loading state
  if (loading) {
    return (
      <div className={`flex items-center space-x-4 ${className}`}>
        <Button variant="outline" size="sm" disabled>
          <span className="h-4 w-4 mr-2 animate-spin rounded-full border-b-2 border-current"></span>
          Loading...
        </Button>
      </div>
    );
  }
  
  // Show sign out button if user is authenticated
  if (user) {
    return (
      <div className={`flex items-center space-x-4 ${className}`}>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => signOut()}
          className="flex items-center space-x-2 border-navy-600 text-navy-600 dark:border-slate-300 dark:text-slate-300"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </Button>
      </div>
    );
  }
  
  // Show sign in / get started buttons if user is not authenticated
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <Link to="/sign-in">
        <Button 
          variant="outline" 
          size="sm"
          className="text-navy-600 dark:text-slate-300 border-navy-600 dark:border-slate-300"
        >
          Sign In
        </Button>
      </Link>
      <Link to="/onboarding">
        <Button 
          size="sm"
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          Get Started
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
