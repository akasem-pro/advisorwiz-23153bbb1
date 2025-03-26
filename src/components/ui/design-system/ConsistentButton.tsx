
import React from 'react';
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'link' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ConsistentButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const ConsistentButton: React.FC<ConsistentButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantStyles = {
    primary: "bg-navy-600 hover:bg-navy-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white focus:ring-navy-500 dark:focus:ring-teal-500",
    secondary: "bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white focus:ring-teal-400",
    tertiary: "bg-gold-500 hover:bg-gold-600 text-navy-900 dark:text-white focus:ring-gold-400",
    outline: "bg-transparent border border-navy-600 dark:border-slate-300 text-navy-600 dark:text-slate-300 hover:bg-navy-50 dark:hover:bg-navy-800 focus:ring-navy-500",
    ghost: "bg-transparent text-navy-600 dark:text-slate-300 hover:bg-navy-50 dark:hover:bg-navy-800 focus:ring-navy-500",
    link: "bg-transparent text-navy-600 dark:text-teal-400 hover:underline p-0 focus:ring-0",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
  };
  
  const sizeStyles = {
    sm: "text-sm py-1.5 px-3",
    md: "text-base py-2 px-4",
    lg: "text-lg py-2.5 px-5"
  };
  
  const widthStyles = fullWidth ? "w-full" : "";
  const disabledStyles = (disabled || loading) ? "opacity-70 cursor-not-allowed" : "active:scale-95";
  
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        widthStyles,
        disabledStyles,
        "gap-2",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </button>
  );
};

export default ConsistentButton;
