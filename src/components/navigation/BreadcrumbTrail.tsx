
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbTrailProps {
  items: BreadcrumbItem[];
  className?: string;
}

const BreadcrumbTrail: React.FC<BreadcrumbTrailProps> = ({ items, className }) => {
  if (!items || items.length === 0) {
    console.warn('BreadcrumbTrail: No items provided');
    return null;
  }
  
  return (
    <nav className={cn("flex items-center text-sm text-slate-600 dark:text-slate-400", className)}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight className="mx-2 h-4 w-4 text-slate-400 dark:text-slate-500" />
          )}
          
          {item.path ? (
            <Link
              to={item.path}
              className="hover:text-slate-900 dark:hover:text-slate-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-slate-900 dark:text-white">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbTrail;
