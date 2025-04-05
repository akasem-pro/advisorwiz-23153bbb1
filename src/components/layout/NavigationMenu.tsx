
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Link {
  name: string;
  path: string;
}

interface NavigationMenuProps {
  links: Link[];
  className?: string;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ links, className }) => {
  return (
    <nav className={cn("flex space-x-1 sm:space-x-2", className)}>
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            cn(
              "px-3 py-2 text-sm rounded-md transition-colors",
              "hover:bg-slate-100 dark:hover:bg-navy-700",
              isActive
                ? "text-teal-600 dark:text-teal-400 font-medium"
                : "text-slate-700 dark:text-slate-300"
            )
          }
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavigationMenu;
