
import React from 'react';
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Link } from 'react-router-dom';
import { getComponentSize, getAnimationDuration, a11y } from '@/utils/designSystem';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'link' | 'danger';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type ConsistentButtonBaseProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  rounded?: 'full' | 'lg' | 'md' | 'sm';
  disabled?: boolean;
  animationSpeed?: 'fast' | 'normal' | 'slow';
  ariaLabel?: string;
};

// Props for button element
interface ButtonElementProps extends ConsistentButtonBaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ConsistentButtonBaseProps> {
  href?: undefined;
  isExternal?: undefined;
}

// Props for anchor element
interface AnchorElementProps extends ConsistentButtonBaseProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ConsistentButtonBaseProps> {
  href: string;
  isExternal?: boolean;
}

// Union type for all possible props
type ConsistentButtonProps = ButtonElementProps | AnchorElementProps;

// Type guard to check if the props are for an anchor element
const isAnchorProps = (props: ConsistentButtonProps): props is AnchorElementProps => {
  return props.href !== undefined;
};

const ConsistentButton = (props: ConsistentButtonProps) => {
  const {
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    icon,
    iconPosition = 'left',
    className = '',
    disabled,
    rounded = 'lg',
    animationSpeed = 'normal',
    ariaLabel,
    ...rest
  } = props;

  const baseStyles = "inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantStyles = {
    primary: "bg-navy-600 hover:bg-navy-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white focus:ring-navy-500 dark:focus:ring-teal-500",
    secondary: "bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white focus:ring-teal-400",
    tertiary: "bg-gold-500 hover:bg-gold-600 text-navy-900 dark:text-white focus:ring-gold-400",
    outline: "bg-transparent border border-navy-600 dark:border-slate-300 text-navy-600 dark:text-slate-300 hover:bg-navy-50 dark:hover:bg-navy-800 focus:ring-navy-500",
    ghost: "bg-transparent text-navy-600 dark:text-slate-300 hover:bg-navy-50 dark:hover:bg-navy-800 focus:ring-navy-500",
    link: "bg-transparent text-navy-600 dark:text-teal-400 hover:underline p-0 focus:ring-0",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
  };
  
  const sizeStyles = getComponentSize(size, 'button');
  
  const roundedStyles = {
    full: "rounded-full",
    lg: "rounded-lg",
    md: "rounded-md",
    sm: "rounded-sm"
  };
  
  const widthStyles = fullWidth ? "w-full" : "";
  const disabledStyles = (disabled || loading) ? "opacity-70 cursor-not-allowed" : "active:scale-95";
  const animationStyles = getAnimationDuration(animationSpeed);
  
  const buttonClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles,
    roundedStyles[rounded],
    widthStyles,
    disabledStyles,
    animationStyles,
    "gap-2",
    a11y.keyboardFocusable,
    className
  );

  // Common content elements
  const contentElements = (
    <>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {!loading && icon && iconPosition === 'left' && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && <span aria-hidden="true">{icon}</span>}
    </>
  );

  // Common accessibility props
  const accessibilityProps = {
    'aria-busy': loading,
    'aria-disabled': disabled || loading,
    'aria-label': ariaLabel
  };

  // Render link if href is provided
  if (isAnchorProps(props)) {
    const { href, isExternal, ...anchorRest } = props;
    
    if (isExternal) {
      return (
        <a
          href={href}
          className={buttonClasses}
          target="_blank"
          rel="noopener noreferrer"
          {...accessibilityProps}
          {...anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>}
        >
          {contentElements}
        </a>
      );
    }
    
    return (
      <Link
        to={href}
        className={buttonClasses}
        {...accessibilityProps}
        {...anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>}
      >
        {contentElements}
      </Link>
    );
  }
  
  // Render button
  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...accessibilityProps}
      {...rest as React.ButtonHTMLAttributes<HTMLButtonElement>}
    >
      {contentElements}
    </button>
  );
};

export default ConsistentButton;
