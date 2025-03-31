
import React from 'react';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

interface ProfileStatusIndicatorProps {
  status: 'online' | 'offline' | 'away';
  showStatusText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ProfileStatusIndicator: React.FC<ProfileStatusIndicatorProps> = ({
  status,
  showStatusText = true,
  size = 'md'
}) => {
  // Memoize status values to prevent unnecessary recalculations
  const statusInfo = React.useMemo(() => {
    // Status color mapping
    const colorMap = {
      online: 'bg-green-500',
      away: 'bg-amber-500',
      offline: 'bg-slate-400'
    };
    
    // Status text mapping
    const textMap = {
      online: 'Online',
      away: 'Away',
      offline: 'Offline'
    };
    
    // Size mapping
    const sizeMap = {
      sm: 'h-1.5 w-1.5',
      md: 'h-2 w-2',
      lg: 'h-3 w-3'
    };
    
    return {
      color: colorMap[status],
      text: textMap[status],
      sizeClass: sizeMap[size]
    };
  }, [status, size]);

  return (
    <div className="flex items-center space-x-1.5" aria-label={`Status: ${statusInfo.text}`}>
      <div 
        className={cn("rounded-full", statusInfo.color, statusInfo.sizeClass)}
        role="presentation"
        aria-hidden="true"
      ></div>
      {showStatusText && (
        <span className="text-xs text-slate-600 dark:text-slate-300">
          {statusInfo.text}
        </span>
      )}
    </div>
  );
};
