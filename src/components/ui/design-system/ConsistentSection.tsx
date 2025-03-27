
import React from 'react';
import { cn } from "@/lib/utils";

interface ConsistentSectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  id?: string;
  fullWidth?: boolean;
  centered?: boolean;
  noPadding?: boolean;
  background?: 'default' | 'light' | 'dark' | 'accent' | 'transparent';
}

const ConsistentSection: React.FC<ConsistentSectionProps> = ({
  children,
  title,
  subtitle,
  className = '',
  contentClassName = '',
  headerClassName = '',
  id,
  fullWidth = false,
  centered = false,
  noPadding = false,
  background = 'default'
}) => {
  // Section background styles
  const bgStyles = {
    default: "bg-white dark:bg-navy-900",
    light: "bg-slate-50 dark:bg-navy-800",
    dark: "bg-navy-800 dark:bg-navy-950",
    accent: "bg-teal-50 dark:bg-teal-900/20",
    transparent: "bg-transparent"
  };
  
  const containerStyles = fullWidth ? "" : "container mx-auto";
  const paddingStyles = noPadding ? "" : "py-6 px-2 sm:px-2 lg:px-4"; // Reduced padding
  const contentStyles = centered ? "text-center" : "";
  
  return (
    <section 
      id={id} 
      className={cn(
        bgStyles[background],
        className
      )}
    >
      <div className={cn(
        containerStyles,
        paddingStyles
      )}>
        {(title || subtitle) && (
          <div className={cn(
            "mb-4", // Reduced spacing
            centered && "text-center",
            headerClassName
          )}>
            {title && (
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-navy-900 dark:text-white mb-2">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-base text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className={cn(
          contentStyles,
          contentClassName
        )}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default ConsistentSection;
