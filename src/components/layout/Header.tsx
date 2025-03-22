
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../features/auth/context/AuthProvider';
import Logo from './Logo';
import NavigationMenu from './NavigationMenu';
import MobileMenu from './MobileMenu';
import ThemeToggleButton from './ThemeToggleButton';
import UserMenu from './UserMenu';
import AuthButtons from './AuthButtons';

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

const Header: React.FC = () => {
  const { isAuthenticated, consumerProfile, advisorProfile } = useUser();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            
            {isAuthenticated ? (
              <UserMenu 
                getUserName={getUserName}
                getInitials={getInitials}
                getProfileImage={getProfileImage}
              />
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link 
                  to="/sign-in"
                  className="text-navy-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/onboarding"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Get Started
                </Link>
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
      
      {mobileMenuOpen && (
        <MobileMenu
          isAuthenticated={isAuthenticated}
          onClose={toggleMobileMenu}
          onSignOut={() => {}}
        />
      )}
    </header>
  );
};

export default Header;
