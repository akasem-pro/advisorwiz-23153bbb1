
import React from 'react';
import { cn } from "@/lib/utils";

type CardVariant = 'default' | 'outline' | 'ghost' | 'elevated' | 'glass';
type CardSize = 'sm' | 'md' | 'lg';

interface ConsistentCardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  size?: CardSize;
  className?: string;
  shadow?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}

const ConsistentCard: React.FC<ConsistentCardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  shadow = false,
  interactive = false,
  onClick
}) => {
  const baseStyles = "rounded-lg transition-all duration-200";
  
  const variantStyles = {
    default: "bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700",
    outline: "bg-transparent border border-slate-300 dark:border-navy-600",
    ghost: "bg-slate-50/50 dark:bg-navy-800/50 backdrop-blur-sm",
    elevated: "bg-white dark:bg-navy-800 border border-slate-100 dark:border-navy-700",
    glass: "bg-white/70 dark:bg-navy-800/70 backdrop-blur-sm border border-white/40 dark:border-navy-700/40"
  };
  
  const sizeStyles = {
    sm: "p-3",
    md: "p-4 md:p-5",
    lg: "p-5 md:p-6"
  };
  
  const shadowStyles = shadow ? "shadow-md" : "";
  const interactiveStyles = interactive ? "cursor-pointer hover:shadow-md hover:-translate-y-1" : "";
  
  return (
    <div 
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        shadowStyles,
        interactiveStyles,
        className
      )}
      onClick={interactive ? onClick : undefined}
    >
      {children}
    </div>
  );
};

export default ConsistentCard;
