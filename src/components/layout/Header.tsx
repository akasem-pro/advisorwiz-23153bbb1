
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, AlertCircle, Search, BellRing } from 'lucide-react';
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
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

// Define the navigation links with updated paths
const navigationLinks = [
  {
    name: 'Firms',
    path: '/firms',
  },
  {
    name: 'Advisors',
    path: '/advisors',
  },
  {
    name: 'Consumers',
    path: '/consumers',
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
  const [searchOpen, setSearchOpen] = useState(false);
  const isMobile = useIsMobile();

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
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out",
      "bg-white dark:bg-navy-900/95 backdrop-blur-sm",
      "border-b border-slate-200/80 dark:border-navy-700/80",
      isMobile ? "h-14" : "h-16"
    )}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center gap-x-6">
            <Link to="/" className="flex-shrink-0">
              <Logo className={isMobile ? "h-10" : "h-12"} />
            </Link>
            <div className="hidden md:block">
              <NavigationMenu links={navigationLinks} />
            </div>
          </div>
          
          <div className="flex items-center gap-x-1 md:gap-x-3">
            {!isMobile && (
              <div className="relative mr-2">
                <div className="flex items-center relative bg-slate-100 dark:bg-navy-800/70 rounded-full h-9 w-36 md:w-48 px-3 transition-all">
                  <Search className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="bg-transparent border-none outline-none text-sm px-2 py-1 w-full text-slate-700 dark:text-slate-300 placeholder-slate-500 dark:placeholder-slate-400"
                  />
                </div>
              </div>
            )}
            
            {isMobile && (
              <Button variant="ghost" size="icon" className="text-slate-500" onClick={() => setSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            <ThemeToggleButton className="text-slate-500" />
            
            {!isMobile && (user || effectiveIsAuthenticated) && (
              <Button variant="ghost" size="icon" className="text-slate-500 relative">
                <BellRing className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 w-2 h-2 rounded-full"></span>
              </Button>
            )}
            
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
              className="md:hidden inline-flex items-center justify-center p-1.5 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Search overlay for mobile */}
      {isMobile && searchOpen && (
        <div className="fixed inset-0 bg-white dark:bg-navy-900 z-50 p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-slate-100 dark:bg-navy-800 px-4 py-2 pl-10 rounded-lg text-navy-900 dark:text-slate-200 outline-none"
                autoFocus
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            </div>
          </div>
        </div>
      )}
      
      {/* Auth warning message for protected pages */}
      {needsAuth && isAuthLoaded && !user && !effectiveIsAuthenticated && (
        <div className="fixed top-14 md:top-16 left-0 right-0 z-40 bg-red-100 text-red-800 px-3 py-1 text-center shadow-md">
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
