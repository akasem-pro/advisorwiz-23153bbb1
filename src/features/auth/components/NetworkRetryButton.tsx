
import React from 'react';
import { Button } from '../../../components/ui/button';
import { RefreshCw } from 'lucide-react';

interface NetworkRetryButtonProps {
  onRetry: () => void;
  isConnecting?: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  colorScheme?: 'error' | 'warning' | 'info';
  className?: string;
}

/**
 * A reusable button component for retry operations with network issues
 */
const NetworkRetryButton: React.FC<NetworkRetryButtonProps> = ({
  onRetry,
  isConnecting = false,
  variant = 'outline',
  size = 'sm',
  colorScheme = 'warning',
  className = ''
}) => {
  // Determine button styling based on color scheme
  const getButtonStyles = () => {
    switch (colorScheme) {
      case 'error':
        return 'border-red-500 text-red-600 hover:bg-red-50';
      case 'warning':
        return 'border-amber-500 text-amber-600 hover:bg-amber-50';
      case 'info':
        return 'border-blue-500 text-blue-600 hover:bg-blue-50';
      default:
        return 'border-amber-500 text-amber-600 hover:bg-amber-50';
    }
  };
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRetry();
  };
  
  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleClick} 
      disabled={isConnecting}
      className={`${getButtonStyles()} ${className}`}
    >
      {isConnecting ? (
        <>
          <span className="h-3 w-3 mr-2 animate-spin rounded-full border-b-2 border-current"></span>
          Checking...
        </>
      ) : (
        <>
          <RefreshCw className="mr-2 h-3 w-3" />
          Retry
        </>
      )}
    </Button>
  );
};

export default NetworkRetryButton;
