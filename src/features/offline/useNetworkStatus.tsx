
import { useState, useEffect, useRef, useCallback } from 'react';
import { checkConnection } from '../../lib/supabase/utils/connectionUtils';

interface UseNetworkStatusOptions {
  /**
   * How often to poll for connection status (in milliseconds)
   */
  pollingInterval?: number;
  
  /**
   * Whether to start polling right away
   */
  startPollingImmediately?: boolean;
}

interface UseNetworkStatusResult {
  /**
   * Whether the user is currently online
   */
  isOnline: boolean;
  
  /**
   * Whether the connection status is being checked
   */
  isChecking: boolean;
  
  /**
   * Whether the user was previously offline
   */
  wasOffline: boolean;
  
  /**
   * Last time a connection check was performed
   */
  lastChecked: Date | null;
  
  /**
   * Start polling for connection status
   */
  startPolling: () => void;
  
  /**
   * Stop polling for connection status
   */
  stopPolling: () => void;
  
  /**
   * Check connection status once
   */
  checkConnectionNow: () => Promise<boolean>;
}

/**
 * Hook for tracking network connection status
 */
export const useNetworkStatus = ({
  pollingInterval = 30000,
  startPollingImmediately = true
}: UseNetworkStatusOptions = {}): UseNetworkStatusResult => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [wasOffline, setWasOffline] = useState<boolean>(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  
  const pollingRef = useRef<number | null>(null);
  
  // Function to check connection status
  const checkConnectionNow = useCallback(async (): Promise<boolean> => {
    setIsChecking(true);
    
    try {
      const online = await checkConnection();
      
      // Only update if status changed
      if (online !== isOnline) {
        if (isOnline && !online) {
          setWasOffline(false); // Going offline now
        } else if (!isOnline && online) {
          setWasOffline(true); // Coming back online
        }
        
        setIsOnline(online);
      }
      
      setLastChecked(new Date());
      return online;
    } catch (error) {
      console.error('Error checking connection:', error);
      return isOnline; // Return current status if check fails
    } finally {
      setIsChecking(false);
    }
  }, [isOnline]);
  
  // Start polling
  const startPolling = useCallback(() => {
    if (pollingRef.current !== null) {
      return; // Already polling
    }
    
    // Immediate check
    checkConnectionNow();
    
    // Start interval
    pollingRef.current = window.setInterval(() => {
      checkConnectionNow();
    }, pollingInterval);
  }, [checkConnectionNow, pollingInterval]);
  
  // Stop polling
  const stopPolling = useCallback(() => {
    if (pollingRef.current !== null) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);
  
  // Set up browser event listeners
  useEffect(() => {
    const handleOnline = () => {
      setWasOffline(true);
      setIsOnline(true);
      
      // Perform an actual connection check when browser reports online
      checkConnectionNow();
    };
    
    const handleOffline = () => {
      setWasOffline(false);
      setIsOnline(false);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [checkConnectionNow]);
  
  // Start/stop polling based on options
  useEffect(() => {
    if (startPollingImmediately) {
      startPolling();
    }
    
    return () => {
      stopPolling();
    };
  }, [startPollingImmediately, startPolling, stopPolling]);
  
  return {
    isOnline,
    isChecking,
    wasOffline,
    lastChecked,
    startPolling,
    stopPolling,
    checkConnectionNow
  };
};
