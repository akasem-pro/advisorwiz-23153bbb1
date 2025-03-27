
import React from 'react';
import { cn } from '@/lib/utils';
import { getSectionSpacing } from '@/utils/designSystem';

interface ConsistentSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'default' | 'alt' | 'gradient' | 'transparent' | 'primary' | 'accent' | 'light';
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'none';
  container?: boolean;
  innerClassName?: string;
  centered?: boolean;
}

const ConsistentSection: React.FC<ConsistentSectionProps> = ({
  children,
  className = '',
  id,
  background = 'default',
  spacing = 'lg',
  container = true,
  innerClassName = '',
  centered = false
}) => {
  const backgroundClasses = {
    default: 'bg-white dark:bg-navy-900',
    alt: 'bg-slate-50 dark:bg-navy-950',
    gradient: 'bg-gradient-to-b from-slate-50 to-white dark:from-navy-950 dark:to-navy-900',
    transparent: 'bg-transparent',
    primary: 'bg-navy-50 dark:bg-navy-900/50',
    accent: 'bg-teal-50 dark:bg-teal-900/20',
    light: 'bg-slate-50 dark:bg-navy-900/30'
  };
  
  const spacingClass = spacing === 'none' ? '' : getSectionSpacing(spacing);
  
  return (
    <section 
      id={id}
      className={cn(
        backgroundClasses[background],
        spacingClass,
        "w-full",
        className
      )}
    >
      {container ? (
        <div className={cn(
          "container mx-auto px-3 sm:px-6", 
          centered && "text-center",
          innerClassName
        )}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
};

export default ConsistentSection;
