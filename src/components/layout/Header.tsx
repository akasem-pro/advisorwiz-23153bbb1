
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Info, LogIn } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../features/auth/context/AuthProvider';
import Logo from './Logo';
import NavigationMenu from './NavigationMenu';
import MobileMenu from './MobileMenu';
import ThemeToggleButton from './ThemeToggleButton';
import UserMenu from './UserMenu';
import AuthButtons from './AuthButtons';
import SuccessMessage from '../ui/SuccessMessage';

// Define the navigation links
const navigationLinks = [
  {
    name: 'For Firms',
    path: '/for-firms',
  },
  {
    name: 'For Advisors',
    path: '/for-advisors',
  },
  {
    name: 'For Consumers',
    path: '/for-consumers',
  },
  {
    name: 'Resources',
    path: '/resources',
  },
  {
    name: 'About Us',
    path: '/about',
  },
  {
    name: 'Pricing',
    path: '/pricing',
  },
  {
    name: 'Contact',
    path: '/contact',
  },
];

const Header: React.FC = () => {
  const { isAuthenticated, consumerProfile, advisorProfile, userType } = useUser();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  console.log('Current userType in Header:', userType);
  console.log('isAuthenticated:', isAuthenticated);
  console.log('Current user in Header:', user);

  // Show success message when user signs in
  useEffect(() => {
    if (user) {
      setShowSuccessMessage(true);
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [user]);

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

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-navy-900 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>
            <div className="hidden md:block ml-10">
              <NavigationMenu links={navigationLinks} />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggleButton className="mr-2" />
            
            {user ? (
              <UserMenu 
                getUserName={getUserName}
                getInitials={getInitials}
                getProfileImage={getProfileImage}
              />
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/sign-in" className="flex items-center text-navy-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 font-medium">
                  <LogIn className="h-4 w-4 mr-1" />
                  <span>Sign In</span>
                </Link>
                <AuthButtons />
              </div>
            )}
            
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-navy-800 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Success message toast */}
      {showSuccessMessage && (
        <div className="fixed top-20 right-4 z-50 animate-fade-in-down">
          <SuccessMessage message="Successfully signed in!" />
        </div>
      )}
      
      {mobileMenuOpen && (
        <MobileMenu
          isAuthenticated={!!user}
          onClose={toggleMobileMenu}
          onSignOut={signOut}
        />
      )}
    </header>
  );
};

export default Header;
