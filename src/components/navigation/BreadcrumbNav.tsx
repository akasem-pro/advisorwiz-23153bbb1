
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
    <nav className="bg-slate-50 dark:bg-navy-900/50 py-3 border-b border-slate-200 dark:border-navy-800">
      <div className="container mx-auto px-4">
        <ol className="flex flex-wrap items-center space-x-2 text-sm">
          {items.map((item, index) => (
            <React.Fragment key={item.url}>
              {index > 0 && (
                <li className="text-slate-400">
                  <ChevronRight className="w-4 h-4" />
                </li>
              )}
              <li>
                {index === items.length - 1 ? (
                  <span className="text-slate-700 dark:text-slate-200 font-medium">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.url}
                    className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
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
