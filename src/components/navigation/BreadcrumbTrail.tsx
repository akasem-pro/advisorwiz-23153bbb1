
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbTrailProps {
  items: BreadcrumbItem[];
  className?: string;
}

const BreadcrumbTrail: React.FC<BreadcrumbTrailProps> = ({ items, className }) => {
  console.log("Rendering BreadcrumbTrail with items:", items);
  
  return (
    <nav className={cn("flex", className)} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.label} className="inline-flex items-center">
              {index > 0 && (
                <ChevronRight className="mx-1 h-4 w-4 text-slate-400" />
              )}
              
              {item.path && !isLast ? (
                <Link 
                  to={item.path}
                  className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbTrail;
