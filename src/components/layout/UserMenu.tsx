
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

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('You have been signed out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out. Please try again.');
    }
  };

  const handleProfileClick = () => {
    console.log('Profile clicked, navigating to profile for userType:', userType);
    
    // Make sure we're authenticated first
    if (!user && !isAuthenticated) {
      toast.error('Please sign in to access your profile');
      navigate('/sign-in');
      return;
    }
    
    // Default to consumer profile if userType is not set
    if (!userType || userType === 'consumer') {
      navigate('/consumer-profile');
    } else if (userType === 'advisor') {
      navigate('/advisor-profile');
    } else if (userType === 'firm_admin') {
      navigate('/firm-profile');
    }
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked, navigating to settings');
    
    // Make sure we're authenticated first
    if (!user && !isAuthenticated) {
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
