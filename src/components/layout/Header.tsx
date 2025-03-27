
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, AlertCircle } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../features/auth/context/AuthProvider';
import Logo from './Logo';
import NavigationMenu from './NavigationMenu';
import MobileMenu from './MobileMenu';
import ThemeToggleButton from './ThemeToggleButton';
import UserMenu from './UserMenu';
import AuthButtons from './AuthButtons';
import SuccessMessage from '../ui/SuccessMessage';
import { getEffectiveAuthStatus } from '../../utils/mockAuthUtils';
import { useIsMobile } from '../../hooks/use-mobile';

// Define the navigation links
const navigationLinks = [
  {
    name: 'Firms',
    path: '/for-firms',
  },
  {
    name: 'Advisors',
    path: '/for-advisors',
  },
  {
    name: 'Consumers',
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
  const location = useLocation();
  const { isAuthenticated, consumerProfile, advisorProfile, userType } = useUser();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);
  const isMobile = useIsMobile();

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

  // Track when auth state is fully loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAuthLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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

  // Determine if the user needs to see authentication state
  const isAuthPage = location.pathname === '/sign-in' || location.pathname === '/login';
  const isSettingsPage = location.pathname === '/settings';
  const isProfilePage = location.pathname.includes('profile');
  const needsAuth = isSettingsPage || isProfilePage;
  
  // Use our utility to get effective authentication status
  const effectiveIsAuthenticated = getEffectiveAuthStatus(isAuthenticated);

  return (
    <header className={`fixed top-0 left-0 w-full bg-white dark:bg-navy-900 shadow-sm z-50 ${isMobile ? 'h-14' : 'h-16'}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>
            <div className="hidden md:block ml-6">
              <NavigationMenu links={navigationLinks} />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <ThemeToggleButton className={isMobile ? "mr-1" : "mr-2"} />
            
            {(user || effectiveIsAuthenticated) ? (
              <UserMenu 
                getUserName={getUserName}
                getInitials={getInitials}
                getProfileImage={getProfileImage}
              />
            ) : (
              <AuthButtons />
            )}
            
            <button
              className="md:hidden inline-flex items-center justify-center p-1.5 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-navy-800 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Auth warning message for protected pages */}
      {needsAuth && isAuthLoaded && !user && !effectiveIsAuthenticated && (
        <div className="fixed top-14 md:top-16 left-0 right-0 z-50 bg-red-100 text-red-800 px-3 py-1 text-center shadow-md">
          <div className="flex items-center justify-center gap-1 text-xs md:text-sm">
            <AlertCircle className="h-3 w-3 md:h-4 md:w-4" />
            <span>You must be signed in to access this page</span>
            <Link to="/sign-in" className="ml-2 bg-red-700 text-white px-2 py-0.5 rounded text-xs font-medium hover:bg-red-800">
              Sign In
            </Link>
          </div>
        </div>
      )}
      
      {/* Success message toast */}
      {showSuccessMessage && (
        <div className="fixed top-16 right-2 z-50 animate-fade-in-down">
          <SuccessMessage message="Successfully signed in!" />
        </div>
      )}
      
      {mobileMenuOpen && (
        <MobileMenu
          isAuthenticated={!!(user || effectiveIsAuthenticated)}
          onClose={toggleMobileMenu}
          onSignOut={signOut}
        />
      )}
    </header>
  );
};

export default Header;
