import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Settings } from 'lucide-react';
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
import { getEffectiveAuthStatus } from '../../utils/mockAuthUtils';

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
    const effectiveIsAuthenticated = getEffectiveAuthStatus(isAuthenticated);
    
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
    const effectiveIsAuthenticated = getEffectiveAuthStatus(isAuthenticated);
    
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
      <DropdownMenuContent align="end" className="w-64">
        <div className="px-4 py-3 border-b border-slate-200 dark:border-navy-600">
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{getUserName()}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{user?.email}</p>
        </div>
        <div className="p-1">
          <DropdownMenuItem onClick={handleProfileClick} className="gap-2">
            <User className="h-4 w-4" />
            <span>My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSettingsClick} className="gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <div className="p-1">
          <DropdownMenuItem onClick={handleSignOut} className="gap-2 text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300">
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
