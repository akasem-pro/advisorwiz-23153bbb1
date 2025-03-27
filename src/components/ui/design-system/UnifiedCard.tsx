
import React from 'react';
import { cn } from '@/lib/utils';

interface UnifiedCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  hover?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'filled' | 'outline' | 'glass' | 'accent';
}

const UnifiedCard: React.FC<UnifiedCardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'sm',
  border = true,
  hover = false,
  interactive = false,
  onClick,
  variant = 'default'
}) => {
  const paddingStyles = {
    'none': '',
    'sm': 'p-3',
    'md': 'p-4 md:p-5',
    'lg': 'p-5 md:p-6'
  };
  
  const shadowStyles = {
    'none': '',
    'sm': 'shadow-sm',
    'md': 'shadow',
    'lg': 'shadow-md'
  };
  
  const variantStyles = {
    'default': 'bg-white dark:bg-navy-800',
    'filled': 'bg-slate-50 dark:bg-navy-900',
    'outline': 'bg-transparent',
    'glass': 'bg-white/80 dark:bg-navy-800/80 backdrop-blur-sm',
    'accent': 'bg-teal-50 dark:bg-teal-900/20'
  };
  
  const interactiveStyles = interactive 
    ? 'cursor-pointer transition-all duration-200'
    : '';
  
  const hoverStyles = hover
    ? 'hover:shadow-md hover:-translate-y-1 transition-all duration-200'
    : '';
    
  const borderStyles = border
    ? 'border border-slate-200 dark:border-navy-700'
    : '';
  
  return (
    <div 
      className={cn(
        'rounded-lg',
        paddingStyles[padding],
        shadowStyles[shadow],
        variantStyles[variant],
        borderStyles,
        interactiveStyles,
        hoverStyles,
        className
      )}
      onClick={interactive ? onClick : undefined}
    >
      {children}
    </div>
  );
};

export default UnifiedCard;
