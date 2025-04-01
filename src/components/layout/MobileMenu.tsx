
import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, LogIn } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

interface MobileMenuProps {
  isAuthenticated: boolean;
  onClose: () => void;
  onSignOut: () => void;
}

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

const MobileMenu: React.FC<MobileMenuProps> = ({ isAuthenticated, onClose, onSignOut }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="md:hidden bg-white dark:bg-navy-900 shadow-lg pt-1 pb-3 px-3 border-t border-slate-200 dark:border-navy-700">
      <div className="space-y-1">
        {navigationLinks.map((link) => (
          <Link 
            key={link.path}
            to={link.path} 
            className="block py-1.5 px-2 text-sm text-navy-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 rounded"
            onClick={onClose}
          >
            {link.name}
          </Link>
        ))}
      </div>
      
      {isAuthenticated ? (
        <button
          onClick={() => {
            onSignOut();
            onClose();
          }}
          className="mt-3 w-full flex items-center justify-center px-3 py-2 text-sm text-navy-600 dark:text-slate-300 border border-navy-600 dark:border-slate-300 rounded-lg"
        >
          <LogOut className="h-3.5 w-3.5 mr-1.5" />
          <span>Sign Out</span>
        </button>
      ) : (
        <Link
          to="/signin"
          onClick={onClose}
          className="mt-3 w-full flex items-center justify-center px-3 py-2 text-sm text-navy-600 dark:text-slate-300 border border-navy-600 dark:border-slate-300 rounded-lg"
        >
          <LogIn className="h-3.5 w-3.5 mr-1.5" />
          <span>Sign In</span>
        </Link>
      )}
    </div>
  );
};

export default MobileMenu;
