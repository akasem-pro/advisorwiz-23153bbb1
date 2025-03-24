
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { syncOfflineChanges } from '../../lib/supabase/utils/connectionUtils';
import { useNetworkStatus } from './useNetworkStatus';

interface UseOfflineSyncOptions {
  /**
   * Whether to automatically sync changes when coming back online
   */
  autoSync?: boolean;
  
  /**
   * Whether to show toast notifications for sync events
   */
  showNotifications?: boolean;
  
  /**
   * Callback function to run after syncing
   */
  onSyncComplete?: (success: boolean) => void;
}

interface UseOfflineSyncResult {
  /**
   * Whether a sync operation is in progress
   */
  isSyncing: boolean;
  
  /**
   * The result of the last sync operation
   */
  lastSyncResult: boolean | null;
  
  /**
   * Manually trigger a sync operation
   */
  syncChanges: () => Promise<boolean>;
}

/**
 * Hook for managing offline data synchronization
 */
export const useOfflineSync = ({
  autoSync = true,
  showNotifications = true,
  onSyncComplete
}: UseOfflineSyncOptions = {}): UseOfflineSyncResult => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncResult, setLastSyncResult] = useState<boolean | null>(null);
  const { isOnline, wasOffline } = useNetworkStatus();
  
  // Function to sync offline changes
  const syncChanges = useCallback(async (): Promise<boolean> => {
    if (!isOnline) {
      if (showNotifications) {
        toast.error('Cannot sync while offline');
      }
      return false;
    }
    
    if (isSyncing) {
      return false;
    }
    
    setIsSyncing(true);
    
    try {
      const result = await syncOfflineChanges();
      setLastSyncResult(result);
      
      // Show notification if enabled
      if (showNotifications) {
        if (result) {
          toast.success('Successfully synced offline changes');
        } else {
          toast.error('Failed to sync some offline changes');
        }
      }
      
      // Run callback if provided
      if (onSyncComplete) {
        onSyncComplete(result);
      }
      
      return result;
    } catch (error) {
      console.error('Error syncing offline changes:', error);
      setLastSyncResult(false);
      
      if (showNotifications) {
        toast.error('Error syncing offline changes');
      }
      
      if (onSyncComplete) {
        onSyncComplete(false);
      }
      
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, [isOnline, isSyncing, showNotifications, onSyncComplete]);
  
  // Auto-sync when coming back online
  useEffect(() => {
    if (autoSync && isOnline && wasOffline) {
      syncChanges();
    }
  }, [autoSync, isOnline, wasOffline, syncChanges]);
  
  return {
    isSyncing,
    lastSyncResult,
    syncChanges
  };
};
