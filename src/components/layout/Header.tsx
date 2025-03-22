
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, User, LogOut } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { Button } from '../ui/button';
import Logo from './Logo';
import NavigationMenu from './NavigationMenu';
import MobileMenu from './MobileMenu';
import { useAuth } from '../../features/auth/context/AuthProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { toast } from 'sonner';

// Define the navigation links
const navigationLinks = [
  {
    name: 'For Firms',
    path: '/for-firms',
    description: 'Solutions for financial advisory firms',
  },
  {
    name: 'For Advisors',
    path: '/for-advisors',
    description: 'Connect with potential clients',
  },
  {
    name: 'For Consumers',
    path: '/for-consumers',
    description: 'Find the right financial advisor',
  },
  {
    name: 'Pricing',
    path: '/pricing',
    description: 'Subscription plans and pricing options',
  },
  {
    name: 'Contact',
    path: '/contact',
    description: 'Get in touch with our team',
  },
];

interface HeaderProps {
  // Add any props here if needed
}

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, consumerProfile, advisorProfile, userType } = useUser();
  const { signOut, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const getInitials = () => {
    if (consumerProfile?.name) {
      return consumerProfile.name.split(' ').map((n) => n[0]).join('').toUpperCase();
    } else if (advisorProfile?.name) {
      return advisorProfile.name.split(' ').map((n) => n[0]).join('').toUpperCase();
    } else if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const getProfileImage = () => {
    if (consumerProfile?.profilePicture) {
      return consumerProfile.profilePicture;
    } else if (advisorProfile?.profilePicture) {
      return advisorProfile.profilePicture;
    }
    return '';
  };

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

  const getUserName = () => {
    if (consumerProfile?.name) {
      return consumerProfile.name;
    } else if (advisorProfile?.name) {
      return advisorProfile.name;
    } else if (user?.email) {
      return user.email;
    }
    return 'User';
  };

  const handleProfileClick = () => {
    if (userType === 'consumer') {
      navigate('/consumer-profile');
    } else if (userType === 'advisor') {
      navigate('/advisor-profile');
    } else if (userType === 'firm_admin') {
      navigate('/firm-profile');
    } else {
      navigate('/settings');
    }
  };

  return (
    <header className="fixed w-full bg-white dark:bg-navy-900 shadow-sm z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center">
          <Link to="/" className="mr-6">
            <Logo />
          </Link>
          <NavigationMenu links={navigationLinks} />
        </div>
        
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-navy-800 mr-2"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          {isAuthenticated ? (
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
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/sign-in">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/onboarding">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          )}
          
          <button
            className="ml-4 md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <MobileMenu
          isAuthenticated={isAuthenticated}
          onClose={toggleMobileMenu}
          onSignOut={handleSignOut}
        />
      )}
    </header>
  );
};

export default Header;
