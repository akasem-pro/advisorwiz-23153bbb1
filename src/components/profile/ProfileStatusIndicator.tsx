
import React from 'react';
import { Badge } from '../ui/badge';

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
  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-amber-500';
      case 'offline': 
      default: return 'bg-slate-400';
    }
  };
  
  const getStatusText = () => {
    switch (status) {
      case 'online': return 'Online';
      case 'away': return 'Away';
      case 'offline': 
      default: return 'Offline';
    }
  };
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'h-1.5 w-1.5';
      case 'lg': return 'h-3 w-3';
      case 'md':
      default: return 'h-2 w-2';
    }
  };

  return (
    <div className="flex items-center space-x-1.5">
      <div className={`rounded-full ${getStatusColor()} ${getSizeClasses()}`}></div>
      {showStatusText && (
        <span className="text-xs text-slate-600 dark:text-slate-300">
          {getStatusText()}
        </span>
      )}
    </div>
  );
};
