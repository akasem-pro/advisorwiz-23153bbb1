import React, { useState } from 'react';
import { BellRing, Menu, X } from 'lucide-react';
import { Button } from '../../ui/button';
import ThemeToggleButton from '../ThemeToggleButton';
import UserMenu from '../user-menu';
import AuthButtons from '../AuthButtons';
import MobileMenu from '../MobileMenu';
import { useAuth } from '../../../features/auth/context/AuthProvider';
import SearchBar from './SearchBar';
import { useIsMobile } from '../../../hooks/use-mobile';

interface HeaderActionsProps {
  isAuthenticated: boolean;
  getUserName: () => string;
  getInitials: () => string;
  getProfileImage: () => string;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ 
  isAuthenticated, 
  getUserName, 
  getInitials, 
  getProfileImage 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { signOut } = useAuth();
  const isMobile = useIsMobile();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <div className="flex items-center gap-x-1 md:gap-x-3">
        <SearchBar />
        
        <ThemeToggleButton className="text-slate-500" />
        
        {!isMobile && isAuthenticated && (
          <Button variant="ghost" size="icon" className="text-slate-500 relative">
            <BellRing className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 w-2 h-2 rounded-full"></span>
          </Button>
        )}
        
        {isAuthenticated ? (
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
      
      {mobileMenuOpen && (
        <MobileMenu
          isAuthenticated={isAuthenticated}
          onClose={toggleMobileMenu}
          onSignOut={signOut}
        />
      )}
    </>
  );
};

export default HeaderActions;
