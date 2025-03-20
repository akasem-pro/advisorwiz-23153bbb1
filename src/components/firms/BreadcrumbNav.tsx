
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items }) => {
  return (
    <nav className="bg-white dark:bg-navy-900 border-b border-slate-100 dark:border-navy-800 py-3">
      <div className="container mx-auto px-4">
        <ol className="flex flex-wrap items-center text-sm">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <li className="mx-2 text-slate-400 dark:text-slate-500">
                  <ChevronRight className="h-4 w-4" />
                </li>
              )}
              <li>
                {index === items.length - 1 ? (
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{item.name}</span>
                ) : (
                  <Link 
                    to={item.url} 
                    className="text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            </React.Fragment>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default BreadcrumbNav;
