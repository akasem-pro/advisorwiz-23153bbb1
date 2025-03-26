
import React from 'react';
import { cn } from "@/lib/utils";
import { getResponsiveText } from '@/utils/designSystem';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingVariant = 'default' | 'serif' | 'gradient' | 'subtle' | 'accent';
type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
type HeadingAlign = 'left' | 'center' | 'right';

interface HeadingProps {
  level: HeadingLevel;
  children: React.ReactNode;
  className?: string;
  variant?: HeadingVariant;
  size?: HeadingSize;
  align?: HeadingAlign;
  id?: string;
  withMargin?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  className = '',
  variant = 'default',
  size,
  align = 'left',
  id,
  withMargin = true
}) => {
  // Default size mappings based on heading level
  const defaultSizes: Record<HeadingLevel, HeadingSize> = {
    1: '3xl',
    2: '2xl',
    3: 'xl',
    4: 'lg',
    5: 'md',
    6: 'sm'
  };
  
  const headingSize = size || defaultSizes[level];
  
  // Font size classes based on size
  const sizeClasses: Record<HeadingSize, string> = {
    'xs': 'text-xs md:text-sm',
    'sm': 'text-sm md:text-base',
    'md': 'text-base md:text-lg',
    'lg': 'text-lg md:text-xl',
    'xl': 'text-xl md:text-2xl',
    '2xl': 'text-2xl md:text-3xl',
    '3xl': 'text-3xl md:text-4xl',
    '4xl': 'text-4xl md:text-5xl'
  };
  
  // Alignment classes
  const alignClasses: Record<HeadingAlign, string> = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right'
  };
  
  // Variant styles
  const variantClasses: Record<HeadingVariant, string> = {
    'default': 'text-navy-900 dark:text-white font-semibold',
    'serif': 'font-serif text-navy-900 dark:text-white font-bold',
    'gradient': 'bg-gradient-to-r from-navy-600 to-teal-500 dark:from-teal-400 dark:to-gold-400 bg-clip-text text-transparent font-bold',
    'subtle': 'text-slate-600 dark:text-slate-300 font-medium',
    'accent': 'text-teal-600 dark:text-teal-400 font-semibold'
  };

  // Use the design system's responsive text or fallback to manual classes
  const responsiveClasses = getResponsiveText('heading', level);
  
  const headingClasses = cn(
    responsiveClasses || sizeClasses[headingSize],
    variantClasses[variant],
    alignClasses[align],
    withMargin && 'mb-4',
    'tracking-tight leading-tight',
    className
  );
  
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Tag className={headingClasses} id={id}>
      {children}
    </Tag>
  );
};

export default Heading;
