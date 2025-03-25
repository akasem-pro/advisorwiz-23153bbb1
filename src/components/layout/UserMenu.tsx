
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../features/auth/context/AuthProvider';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface UserMenuProps {
  getUserName: () => string;
  getInitials: () => string;
  getProfileImage: () => string;
}

const UserMenu: React.FC<UserMenuProps> = ({ getUserName, getInitials, getProfileImage }) => {
  const navigate = useNavigate();
  const { userType, isAuthenticated } = useUser();
  const { signOut, user } = useAuth();

  // Check if we're in a preview environment
  const isPreviewEnv = window.location.hostname.includes('preview') || 
                       window.location.hostname.includes('lovableproject') ||
                       window.location.hostname.includes('localhost');

  const handleSignOut = async () => {
    try {
      // For preview environment with mock user
      if (isPreviewEnv && localStorage.getItem('mock_auth_user')) {
        console.log("[UserMenu] Removing mock auth user from localStorage");
        localStorage.removeItem('mock_auth_user');
        toast.success('You have been signed out successfully');
        navigate('/');
        return;
      }
      
      await signOut();
      toast.success('You have been signed out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out. Please try again.');
    }
  };

  const handleProfileClick = () => {
    console.log('[UserMenu] Profile clicked, userType:', userType);
    
    // In preview environments, treat mock users as authenticated
    const effectiveIsAuthenticated = isAuthenticated || 
      (isPreviewEnv && !!localStorage.getItem('mock_auth_user'));
    
    // Make sure we're authenticated first
    if (!effectiveIsAuthenticated) {
      toast.error('Please sign in to access your profile');
      navigate('/sign-in');
      return;
    }
    
    // For preview environment with mock data, default to consumer profile if no userType
    const mockUserType = localStorage.getItem('mock_user_type');
    
    if (isPreviewEnv && !userType && localStorage.getItem('mock_auth_user')) {
      if (mockUserType === 'advisor') {
        console.log('[UserMenu] Preview environment detected with mock advisor, navigating to advisor profile');
        navigate('/advisor-profile');
        return;
      } else {
        console.log('[UserMenu] Preview environment detected with mock user, defaulting to consumer profile');
        navigate('/consumer-profile');
        return;
      }
    }
    
    // Default based on userType
    if (!userType || userType === 'consumer') {
      navigate('/consumer-profile');
    } else if (userType === 'advisor') {
      navigate('/advisor-profile');
    } else if (userType === 'firm_admin') {
      navigate('/firm-profile');
    }
  };

  const handleSettingsClick = () => {
    console.log('[UserMenu] Settings clicked');
    
    // In preview environments, treat mock users as authenticated
    const effectiveIsAuthenticated = isAuthenticated || 
      (isPreviewEnv && !!localStorage.getItem('mock_auth_user'));
    
    // Make sure we're authenticated first
    if (!effectiveIsAuthenticated) {
      toast.error('Please sign in to access settings');
      navigate('/sign-in');
      return;
    }
    
    navigate('/settings');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 hover:opacity-80">
          <Avatar className="h-8 w-8 border border-slate-200 dark:border-navy-700">
            <AvatarImage src={getProfileImage()} alt={getUserName()} />
            <AvatarFallback className="bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2">
          <p className="text-sm font-medium">{getUserName()}</p>
          <p className="text-xs text-slate-500">{user?.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfileClick}>
          <User className="mr-2 h-4 w-4" />
          <span>My Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSettingsClick}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
