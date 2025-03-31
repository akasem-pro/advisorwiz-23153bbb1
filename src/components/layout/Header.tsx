import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../features/auth/context/AuthProvider';
import Logo from './Logo';
import NavigationMenu from './NavigationMenu';
import { getEffectiveAuthStatus } from '../../utils/mockAuthUtils';
import { useIsMobile } from '../../hooks/use-mobile';
import { cn } from '@/lib/utils';
import AuthWarningBanner from './header/AuthWarningBanner';
import SuccessToast from './header/SuccessToast';
import HeaderActions from './header/HeaderActions';

const navigationLinks = [
  { name: 'Firms', path: '/for-firms' },
  { name: 'Advisors', path: '/for-advisors' },
  { name: 'Consumers', path: '/for-consumers' },
  { name: 'Resources', path: '/resources' },
  { name: 'About Us', path: '/about' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Contact', path: '/contact' },
];

const Header: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, consumerProfile, advisorProfile, userType } = useUser();
  const { user, signOut } = useAuth();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (user) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAuthLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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

  const isAuthPage = location.pathname === '/sign-in' || location.pathname === '/login';
  const isSettingsPage = location.pathname === '/settings';
  const isProfilePage = location.pathname.includes('profile');
  const needsAuth = isSettingsPage || isProfilePage;

  const effectiveIsAuthenticated = getEffectiveAuthStatus(isAuthenticated);

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out",
        "bg-white dark:bg-navy-900/95 backdrop-blur-sm",
        "border-b border-slate-200/80 dark:border-navy-700/80",
        "shadow-sm",
        isMobile ? "h-14" : "h-16"
      )}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-x-6">
              <Link to="/" className="flex-shrink-0">
                <Logo className={isMobile ? "h-10" : "h-10"} />
              </Link>
              <div className="hidden md:block">
                <NavigationMenu links={navigationLinks} />
              </div>
            </div>
            
            <HeaderActions
              isAuthenticated={!!(user || effectiveIsAuthenticated)}
              getUserName={getUserName}
              getInitials={getInitials}
              getProfileImage={getProfileImage}
            />
          </div>
        </div>
      </header>
      
      <AuthWarningBanner 
        isVisible={needsAuth && isAuthLoaded && !user && !effectiveIsAuthenticated} 
      />
      
      <SuccessToast 
        isVisible={showSuccessMessage} 
        message="Successfully signed in!" 
      />
    </>
  );
};

export default Header;
