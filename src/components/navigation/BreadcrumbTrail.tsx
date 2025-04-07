
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbTrailProps {
  items: BreadcrumbItem[];
  className?: string;
}

const BreadcrumbTrail: React.FC<BreadcrumbTrailProps> = ({ items, className }) => {
  return (
    <nav className={`flex items-center text-sm text-slate-600 dark:text-slate-400 ${className || ''}`}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mx-1" />
              </li>
            )}
            <li>
              {item.path ? (
                <Link 
                  to={item.path} 
                  className="hover:text-navy-700 dark:hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-navy-900 dark:text-white">{item.label}</span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbTrail;
