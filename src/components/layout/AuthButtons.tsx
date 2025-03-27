import React from 'react';
import { Button } from '../ui/button';
import { useAuth } from '../../features/auth/context/AuthProvider';
import { LogOut, User, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { 
  getEffectiveAuthStatus, 
  isUsingMockAuth, 
  getMockUser,
  clearMockAuth,
  setupMockAuth
} from '../../utils/mockAuthUtils';
import { toast } from 'sonner';

interface AuthButtonsProps {
  className?: string;
  showMockControls?: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ 
  className = '',
  showMockControls = false
}) => {
  const { user, signOut, loading } = useAuth();
  const { isAuthenticated } = useUser();
  
  // Use effective authentication status that considers mock auth
  const effectiveIsAuthenticated = getEffectiveAuthStatus(isAuthenticated);
  const mockUser = getMockUser();
  const usingMockAuth = isUsingMockAuth();
  
  // Handle sign out including mock auth
  const handleSignOut = () => {
    // Clear mock auth if it's being used
    if (usingMockAuth) {
      clearMockAuth();
      toast.success("Signed out of mock account");
      window.location.href = '/';
      return;
    }
    
    // Otherwise use regular sign out
    signOut();
  };
  
  // Setup mock auth for testing
  const setupMockUser = (type: 'consumer' | 'advisor' | 'firm_admin') => {
    setupMockAuth(type);
    toast.success(`Signed in as mock ${type}`);
    window.location.reload();
  };
  
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
  
  // Show mock controls if enabled and in development
  const renderMockControls = () => {
    if (!showMockControls || process.env.NODE_ENV !== 'development') return null;
    
    return (
      <div className="flex items-center space-x-2 border-l border-l-slate-300 ml-2 pl-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setupMockUser('consumer')}
          className="h-7 text-xs"
        >
          Mock Consumer
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setupMockUser('advisor')}
          className="h-7 text-xs"
        >
          Mock Advisor
        </Button>
      </div>
    );
  };
  
  // Show sign out button if user is authenticated
  if (user || effectiveIsAuthenticated) {
    const displayEmail = user?.email || mockUser?.email || 'Authenticated User';
    
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <span className="text-sm text-navy-600 dark:text-slate-300 mr-2 hidden md:inline-block">
          {displayEmail}
          {usingMockAuth && <span className="ml-1 text-amber-500">(Mock)</span>}
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSignOut}
          className="flex items-center space-x-1 border-navy-600 text-navy-600 dark:border-slate-300 dark:text-slate-300 h-9"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
        
        {renderMockControls()}
      </div>
    );
  }
  
  // Show sign in and sign up buttons for unauthenticated users
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
      
      <Link to="/sign-in?tab=signup">
        <Button 
          variant="default" 
          size="sm" 
          className="flex items-center space-x-1 bg-navy-600 text-white h-9"
        >
          <UserPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Sign Up</span>
        </Button>
      </Link>
      
      {renderMockControls()}
    </div>
  );
};

export default AuthButtons;
