
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from './button';
import { Switch } from './switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  variant?: 'icon' | 'switch' | 'minimal';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  variant = 'icon',
  className = '',
  size = 'md'
}) => {
  const { theme, toggleTheme } = useTheme();
  
  const sizeClasses = {
    sm: {
      button: "h-8 w-8", 
      icon: "h-3.5 w-3.5"
    },
    md: {
      button: "h-9 w-9", 
      icon: "h-4.5 w-4.5"
    },
    lg: {
      button: "h-10 w-10", 
      icon: "h-5 w-5"
    }
  };
  
  if (variant === 'minimal') {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          "p-1.5 rounded-full text-navy-600 dark:text-slate-300 hover:bg-navy-100 dark:hover:bg-navy-800 transition-colors",
          className
        )}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? (
          <Sun className={sizeClasses[size].icon} />
        ) : (
          <Moon className={sizeClasses[size].icon} />
        )}
      </button>
    );
  }
  
  if (variant === 'switch') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Sun className="h-4 w-4 text-navy-500 dark:text-slate-300" />
        <Switch 
          checked={theme === 'dark'}
          onCheckedChange={toggleTheme}
          aria-label="Toggle theme"
          className="data-[state=checked]:bg-teal-600"
        />
        <Moon className="h-4 w-4 text-navy-500 dark:text-slate-300" />
      </div>
    );
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className={cn(
              "rounded-full text-navy-600 dark:text-slate-300 bg-transparent hover:bg-navy-100 dark:hover:bg-navy-800",
              sizeClasses[size].button,
              className
            )}
            aria-label="Toggle theme"
          >
            <Sun className={cn(
              "rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
              sizeClasses[size].icon
            )} />
            <Moon className={cn(
              "absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
              sizeClasses[size].icon
            )} />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-white dark:bg-navy-800 text-navy-900 dark:text-slate-100 border-slate-200 dark:border-navy-700">
          <p>{theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThemeToggle;
