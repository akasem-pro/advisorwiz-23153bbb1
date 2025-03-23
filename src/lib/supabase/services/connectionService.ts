
import { toast } from 'sonner';
import { invalidateAllCache } from '../core/cacheUtils';

// Connection status management
export const setupConnectionListener = () => {
  const handleConnectionChange = () => {
    if (navigator.onLine) {
      toast.success('You are back online!');
      // Could trigger sync of offline changes here
    } else {
      toast.warning('You are offline. Some features may be limited.');
    }
  };

  window.addEventListener('online', handleConnectionChange);
  window.addEventListener('offline', handleConnectionChange);

  return () => {
    window.removeEventListener('online', handleConnectionChange);
    window.removeEventListener('offline', handleConnectionChange);
  };
};

// Sync offline changes when reconnecting
export const syncOfflineChanges = async () => {
  if (!navigator.onLine) return false;
  
  // This would sync any queued changes stored during offline mode
  // Implementation depends on specific requirements
  
  return true;
};
