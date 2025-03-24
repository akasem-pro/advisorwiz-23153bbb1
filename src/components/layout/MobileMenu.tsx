
import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, LogIn, Info } from 'lucide-react';
import NavigationMenu from './NavigationMenu';

interface MobileMenuProps {
  isAuthenticated: boolean;
  onClose: () => void;
  onSignOut: () => void;
}

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

const MobileMenu: React.FC<MobileMenuProps> = ({ isAuthenticated, onClose, onSignOut }) => {
  return (
    <div className="md:hidden bg-white dark:bg-navy-900 shadow-lg pt-2 pb-4 px-4 border-t border-slate-200 dark:border-navy-700">
      <NavigationMenu 
        links={navigationLinks} 
        onClick={onClose}
        showGetStarted={false} 
      />
      
      {isAuthenticated ? (
        <button
          onClick={() => {
            onSignOut();
            onClose();
          }}
          className="mt-4 w-full flex items-center justify-center px-4 py-2.5 text-navy-600 dark:text-slate-300 border border-navy-600 dark:border-slate-300 rounded-lg"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Sign Out</span>
        </button>
      ) : (
        <Link
          to="/sign-in"
          onClick={onClose}
          className="mt-4 w-full flex items-center justify-center px-4 py-2.5 text-navy-600 dark:text-slate-300 border border-navy-600 dark:border-slate-300 rounded-lg"
        >
          <LogIn className="h-4 w-4 mr-2" />
          <span>Sign In</span>
        </Link>
      )}
    </div>
  );
};

export default MobileMenu;
