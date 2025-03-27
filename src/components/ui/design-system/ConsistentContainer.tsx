
import React from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from "../../../hooks/use-mobile";

interface ConsistentContainerProps {
  children: React.ReactNode;
  className?: string;
  width?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
  centered?: boolean;
}

const ConsistentContainer: React.FC<ConsistentContainerProps> = ({
  children,
  className = '',
  width = 'lg',
  padding = true,
  centered = true
}) => {
  const isMobile = useIsMobile();
  
  const widthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    full: 'w-full'
  };
  
  const paddingClasses = padding ? (isMobile ? 'px-2 py-2' : 'px-2 sm:px-2 py-3') : '';
  const centeringClasses = centered ? 'mx-auto' : '';
  
  return (
    <div className={cn(
      widthClasses[width],
      paddingClasses,
      centeringClasses,
      className
    )}>
      {children}
    </div>
  );
};

export default ConsistentContainer;
