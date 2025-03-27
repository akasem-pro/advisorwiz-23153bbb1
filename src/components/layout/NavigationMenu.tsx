
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavigationLink {
  name: string;
  path: string;
}

interface NavigationMenuProps {
  links: NavigationLink[];
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ links }) => {
  const location = useLocation();
  
  return (
    <nav>
      <ul className="flex space-x-2">
        {links.map((link) => {
          const isActive = location.pathname === link.path || 
                          (link.path !== '/' && location.pathname.startsWith(link.path));
          
          return (
            <li key={link.name}>
              <Link
                to={link.path}
                className={cn(
                  "inline-flex px-3 py-2 text-sm transition-colors rounded-md",
                  "hover:bg-slate-100 dark:hover:bg-navy-800/80",
                  "focus:outline-none focus:ring-2 focus:ring-teal-500/40",
                  isActive 
                    ? "text-teal-600 dark:text-teal-400 font-medium" 
                    : "text-slate-700 dark:text-slate-300"
                )}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavigationMenu;
