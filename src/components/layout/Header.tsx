
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

  const handleSignOut = async () => {
    // This method is now in UserMenu component
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
          <ThemeToggleButton className="mr-2" />
          
          {isAuthenticated ? (
            <UserMenu 
              getUserName={getUserName}
              getInitials={getInitials}
              getProfileImage={getProfileImage}
            />
          ) : (
            <AuthButtons className="hidden md:flex" />
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
