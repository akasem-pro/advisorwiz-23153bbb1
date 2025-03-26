
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLink {
  name: string;
  path: string;
  icon?: React.ReactNode;
  description?: string;
  subLinks?: Array<{
    name: string;
    path: string;
  }>;
}

interface NavigationMenuProps {
  links: NavLink[];
  showGetStarted?: boolean;
  onClick?: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ links, showGetStarted = false, onClick }) => {
  const location = useLocation();

  return (
    <nav className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
      {links.map((link) => (
        <div key={link.path} className="relative group">
          <Link
            to={link.path}
            className={`py-1 px-2 font-medium text-sm flex items-center ${
              location.pathname === link.path || 
              (link.path !== '/' && location.pathname.startsWith(link.path))
                ? 'text-teal-600 dark:text-teal-400'
                : 'text-navy-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400'
            } transition-colors`}
            onClick={onClick}
            aria-describedby={link.description ? `desc-${link.path.replace('/', '')}` : undefined}
          >
            {link.icon && <span className="mr-1">{link.icon}</span>}
            <span>{link.name}</span>
          </Link>
          
          {link.description && (
            <span id={`desc-${link.path.replace('/', '')}`} className="sr-only">
              {link.description}
            </span>
          )}
          
          {/* Dropdown menu for links with subLinks */}
          {link.subLinks && link.subLinks.length > 0 && (
            <div className="absolute left-0 mt-1 w-44 bg-white dark:bg-navy-800 shadow-md rounded-md overflow-hidden z-20 hidden group-hover:block">
              {link.subLinks.map((subLink) => (
                <Link
                  key={subLink.path}
                  to={subLink.path}
                  className="block px-3 py-2 text-xs text-navy-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-700 hover:text-teal-600 dark:hover:text-teal-400"
                  onClick={onClick}
                >
                  {subLink.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
      
      {showGetStarted && (
        <Link 
          to="/onboarding" 
          className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded-md text-xs font-medium mt-2 md:mt-0 text-center transition-colors"
          onClick={onClick}
        >
          Get Started
        </Link>
      )}
    </nav>
  );
};

export default NavigationMenu;
