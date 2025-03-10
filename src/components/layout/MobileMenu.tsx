
import React from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import NavigationMenu from './NavigationMenu';

interface NavLink {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

interface MobileMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  links: NavLink[];
  isAuthenticated: boolean;
  showGetStarted?: boolean;
  onLogout?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isMenuOpen, 
  toggleMenu, 
  links, 
  isAuthenticated,
  showGetStarted = false,
  onLogout
}) => {
  return (
    <>
      <button
        className="text-navy-900 md:hidden focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isMenuOpen && (
        <div className="bg-white shadow-md py-4 px-6 absolute top-full left-0 right-0 animate-slide-down">
          <NavigationMenu 
            links={links} 
            showGetStarted={showGetStarted} 
            onClick={toggleMenu} 
          />
          
          {isAuthenticated && onLogout && (
            <button 
              onClick={() => {
                onLogout();
                toggleMenu();
              }}
              className="flex items-center space-x-2 font-medium text-navy-700 py-2 mt-4"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default MobileMenu;
