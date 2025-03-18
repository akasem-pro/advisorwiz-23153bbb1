
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from './button';
import { Switch } from './switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

interface ThemeToggleProps {
  variant?: 'icon' | 'switch';
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  variant = 'icon',
  className = '' 
}) => {
  const { theme, toggleTheme } = useTheme();
  
  if (variant === 'switch') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Sun className="h-4 w-4 text-navy-500 dark:text-slate-200" />
        <Switch 
          checked={theme === 'dark'}
          onCheckedChange={toggleTheme}
          aria-label="Toggle theme"
        />
        <Moon className="h-4 w-4 text-navy-500 dark:text-slate-200" />
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
            className={className}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-white dark:bg-navy-800 text-navy-900 dark:text-slate-100">
          <p>{theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThemeToggle;
