
import { toast } from 'sonner';
import { supabase } from '../../../integrations/supabase/client';
import { ErrorCategory, handleError } from '../../../utils/errorHandling/errorHandler';

// Interface for offline change tracking
interface OfflineChange {
  id: string;
  table: string;
  operation: 'insert' | 'update' | 'delete';
  data: any;
  timestamp: number;
  retryCount: number;
}

// Storage key for offline changes
const OFFLINE_CHANGES_KEY = 'supabase_offline_changes';

/**
 * Set up connection listener for online/offline events
 */
export const setupConnectionListener = (
  onOnline: () => void,
  onOffline: () => void
): () => void => {
  const handleOnline = () => {
    console.log('Connection restored');
    onOnline();
  };
  
  const handleOffline = () => {
    console.log('Connection lost');
    onOffline();
  };
  
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

/**
 * Check Supabase connection status
 */
export const checkConnection = async (): Promise<boolean> => {
  try {
    // First check browser online status
    if (!navigator.onLine) {
      return false;
    }
    
    // Then check actual Supabase connectivity
    return await checkSupabaseConnection();
  } catch (error) {
    handleError(
      'Failed to check connection status',
      ErrorCategory.NETWORK
    );
    return false;
  }
};

/**
 * Record a change to be synced later when back online
 */
export const recordOfflineChange = (
  table: string,
  operation: 'insert' | 'update' | 'delete',
  data: any
): void => {
  try {
    // Get existing offline changes
    const existingChangesJson = localStorage.getItem(OFFLINE_CHANGES_KEY);
    const existingChanges: OfflineChange[] = existingChangesJson 
      ? JSON.parse(existingChangesJson) 
      : [];
    
    // Add new change
    const change: OfflineChange = {
      id: crypto.randomUUID(),
      table,
      operation,
      data,
      timestamp: Date.now(),
      retryCount: 0
    };
    
    // Save updated changes
    localStorage.setItem(
      OFFLINE_CHANGES_KEY, 
      JSON.stringify([...existingChanges, change])
    );
    
    console.log(`Recorded offline ${operation} for ${table}`);
  } catch (error) {
    handleError(
      'Failed to record offline change',
      ErrorCategory.UNKNOWN
    );
  }
};

/**
 * Sync all recorded offline changes when back online
 */
export const syncOfflineChanges = async (): Promise<boolean> => {
  try {
    const changesJson = localStorage.getItem(OFFLINE_CHANGES_KEY);
    if (!changesJson) {
      return true; // No changes to sync
    }
    
    const changes: OfflineChange[] = JSON.parse(changesJson);
    if (changes.length === 0) {
      return true; // No changes to sync
    }
    
    console.log(`Attempting to sync ${changes.length} offline changes`);
    
    // Track successful and failed changes
    const successful: string[] = [];
    const failed: OfflineChange[] = [];
    
    // Process each change
    for (const change of changes) {
      try {
        let success = false;
        
        switch (change.operation) {
          case 'insert':
            // Type assertion to handle the dynamic table name
            const { error: insertError } = await supabase
              .from(change.table as any)
              .insert(change.data);
            success = !insertError;
            break;
            
          case 'update':
            // Type assertion to handle the dynamic table name
            const { error: updateError } = await supabase
              .from(change.table as any)
              .update(change.data)
              .eq('id', change.data.id);
            success = !updateError;
            break;
            
          case 'delete':
            // Type assertion to handle the dynamic table name
            const { error: deleteError } = await supabase
              .from(change.table as any)
              .delete()
              .eq('id', change.data.id);
            success = !deleteError;
            break;
        }
        
        if (success) {
          successful.push(change.id);
        } else {
          // Increment retry count and keep for later if under max retries
          change.retryCount += 1;
          if (change.retryCount < 3) {
            failed.push(change);
          }
        }
      } catch (error) {
        // Keep failed changes with incremented retry count
        change.retryCount += 1;
        if (change.retryCount < 3) {
          failed.push(change);
        }
      }
    }
    
    // Update storage with remaining failed changes
    if (failed.length > 0) {
      localStorage.setItem(OFFLINE_CHANGES_KEY, JSON.stringify(failed));
    } else {
      localStorage.removeItem(OFFLINE_CHANGES_KEY);
    }
    
    // Show appropriate message
    if (successful.length > 0) {
      console.log(`Successfully synced ${successful.length} offline changes`);
    }
    
    if (failed.length > 0) {
      console.warn(`Failed to sync ${failed.length} offline changes`);
      return false;
    }
    
    return true;
  } catch (error) {
    handleError(
      'Error syncing offline changes',
      ErrorCategory.NETWORK
    );
    return false;
  }
};

/**
 * Export the checkSupabaseConnection function from client.ts
 */
export { checkSupabaseConnection } from '../../../integrations/supabase/client';
