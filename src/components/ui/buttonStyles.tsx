
import { cn } from "@/lib/utils";

/**
 * Centralized button style configurations for consistent UI across the application
 */

export const buttonBaseStyles = {
  // Common styles for all buttons
  base: "font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2",
  
  // Size variants
  sizes: {
    sm: "px-4 py-2 text-sm h-9",
    md: "px-6 py-2.5 text-base h-10",
    lg: "px-8 py-3 text-lg h-12",
    xl: "px-10 py-4 text-xl h-14",
  },
  
  // Common width options
  width: {
    auto: "w-auto",
    full: "w-full",
    responsive: "w-full sm:w-auto",
  }
};

export const buttonVariants = {
  // Primary button (teal)
  primary: "bg-teal-600 hover:bg-teal-700 text-white shadow-sm hover:shadow",
  
  // Secondary button (navy)
  secondary: "bg-navy-600 hover:bg-navy-700 text-white shadow-sm hover:shadow",
  
  // Outline variants
  outline: {
    default: "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-navy-800",
    navy: "border border-navy-600 text-navy-700 hover:bg-navy-50 dark:border-slate-300 dark:text-slate-300 dark:hover:bg-navy-800",
    teal: "border border-teal-600 text-teal-700 hover:bg-teal-50 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-900/20",
    white: "border border-white text-white hover:bg-white/20 dark:border-slate-300 dark:text-slate-300"
  },
  
  // Ghost variants
  ghost: {
    default: "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-navy-800/50",
    navy: "text-navy-700 hover:bg-navy-100 dark:text-slate-300 dark:hover:bg-navy-800/50",
    teal: "text-teal-700 hover:bg-teal-100 dark:text-teal-400 dark:hover:bg-teal-900/20"
  },
  
  // Link variants (underlined text)
  link: {
    default: "text-navy-600 hover:text-navy-800 dark:text-teal-400 dark:hover:text-teal-300 underline-offset-4 hover:underline p-0 h-auto",
    teal: "text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 underline-offset-4 hover:underline p-0 h-auto"
  }
};

/**
 * Helper function to compose button classes
 */
export const getButtonClasses = ({
  variant = 'primary',
  size = 'md',
  width = 'auto',
  className = '',
  outline = 'default',
  ghost = 'default',
  link = 'default',
}: {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  width?: 'auto' | 'full' | 'responsive';
  className?: string;
  outline?: 'default' | 'navy' | 'teal' | 'white';
  ghost?: 'default' | 'navy' | 'teal';
  link?: 'default' | 'teal';
}) => {
  let variantClass = '';
  
  if (variant === 'primary') {
    variantClass = buttonVariants.primary;
  } else if (variant === 'secondary') {
    variantClass = buttonVariants.secondary;
  } else if (variant === 'outline') {
    variantClass = buttonVariants.outline[outline];
  } else if (variant === 'ghost') {
    variantClass = buttonVariants.ghost[ghost];
  } else if (variant === 'link') {
    variantClass = buttonVariants.link[link];
  }
  
  return cn(
    buttonBaseStyles.base,
    buttonBaseStyles.sizes[size],
    buttonBaseStyles.width[width],
    variantClass,
    className
  );
};
