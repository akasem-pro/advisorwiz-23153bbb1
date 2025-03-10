
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLink {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

interface NavigationMenuProps {
  links: NavLink[];
  showGetStarted?: boolean;
  onClick?: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ links, showGetStarted = false, onClick }) => {
  const location = useLocation();

  return (
    <nav className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6 md:items-center">
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`py-2 px-1 font-medium text-lg md:text-base flex items-center ${
            location.pathname === link.path
              ? 'text-teal-600'
              : 'text-navy-700 hover:text-teal-600'
          } transition-colors`}
          onClick={onClick}
        >
          {link.icon && <span className="mr-2 md:mr-1">{link.icon}</span>}
          <span>{link.name}</span>
        </Link>
      ))}
      
      {showGetStarted && (
        <Link 
          to="/onboarding" 
          className="btn-primary mt-2 md:mt-0 text-center"
          onClick={onClick}
        >
          Get Started
        </Link>
      )}
    </nav>
  );
};

export default NavigationMenu;
