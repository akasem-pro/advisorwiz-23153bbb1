
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { generateBreadcrumbSchema } from '@/utils/schemas/breadcrumbSchema';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
  variant?: 'default' | 'simple' | 'transparent';
  includeHomeIcon?: boolean;
  structuredData?: boolean;
}

const EnhancedBreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ 
  items,
  className,
  variant = 'default',
  includeHomeIcon = true,
  structuredData = true
}) => {
  const variantStyles = {
    default: "bg-slate-50 dark:bg-navy-900/50 py-3 border-b border-slate-200 dark:border-navy-800",
    simple: "py-2",
    transparent: "bg-transparent py-3"
  };

  return (
    <>
      {structuredData && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(generateBreadcrumbSchema(items))
          }}
        />
      )}
      
      <div className={cn(variantStyles[variant], className)}>
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              {items.map((item, index) => (
                <React.Fragment key={item.url}>
                  {index > 0 && (
                    <BreadcrumbSeparator>
                      <ChevronRight className="w-4 h-4" />
                    </BreadcrumbSeparator>
                  )}
                  <BreadcrumbItem>
                    {index === 0 && includeHomeIcon ? (
                      <BreadcrumbLink asChild>
                        <Link 
                          to={item.url}
                          className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 flex items-center"
                          aria-label={item.name}
                        >
                          <Home className="w-4 h-4" />
                          <span className="sr-only">{item.name}</span>
                        </Link>
                      </BreadcrumbLink>
                    ) : index === items.length - 1 ? (
                      <BreadcrumbPage className="text-slate-700 dark:text-slate-200 font-medium">
                        {item.name}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link 
                          to={item.url}
                          className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
                        >
                          {item.name}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </>
  );
};

export default EnhancedBreadcrumbNav;
