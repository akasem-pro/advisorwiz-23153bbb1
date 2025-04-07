
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '../../hooks/useAnalytics';

interface BreadcrumbItem {
  label: string;
  path: string;
  isLast?: boolean;
}

interface BreadcrumbTrailProps {
  items?: BreadcrumbItem[];
  className?: string;
  homeIcon?: boolean;
  separator?: React.ReactNode;
  maxItems?: number;
}

/**
 * A consistent breadcrumb navigation component
 */
const BreadcrumbTrail: React.FC<BreadcrumbTrailProps> = ({
  items,
  className,
  homeIcon = true,
  separator = <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />,
  maxItems = 4
}) => {
  const location = useLocation();
  const { trackClick } = useAnalytics();
  
  // Auto-generate breadcrumbs if not provided
  const breadcrumbs = items || generateBreadcrumbs(location.pathname);
  
  // Limit breadcrumbs count if needed
  const displayedBreadcrumbs = breadcrumbs.length > maxItems 
    ? [
        breadcrumbs[0],
        { label: '...', path: '', isLast: false },
        ...breadcrumbs.slice(-2)
      ]
    : breadcrumbs;
  
  return (
    <nav className={cn(
      "flex items-center text-sm text-gray-600 dark:text-gray-300",
      className
    )} aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap">
        {displayedBreadcrumbs.map((item, index) => (
          <li key={item.path || index} className="flex items-center">
            {index > 0 && separator}
            {item.isLast ? (
              <span 
                className="font-medium text-gray-900 dark:text-white" 
                aria-current="page"
              >
                {item.label}
              </span>
            ) : item.path ? (
              <Link
                to={item.path}
                className="hover:text-blue-600 hover:underline transition-colors flex items-center"
                onClick={() => trackClick('breadcrumb', { item: item.label })}
              >
                {index === 0 && homeIcon ? (
                  <Home className="h-4 w-4 mr-1" />
                ) : null}
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-500">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

/**
 * Generate breadcrumb items from a URL path
 */
function generateBreadcrumbs(path: string): BreadcrumbItem[] {
  if (path === '/') {
    return [{ label: 'Home', path: '/', isLast: true }];
  }
  
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', path: '/' }];
  
  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;
    
    // Format segment for display (convert kebab-case to title case)
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      label,
      path: isLast ? '' : currentPath,
      isLast
    });
  });
  
  return breadcrumbs;
}

export default BreadcrumbTrail;
