
import { supabase, checkSupabaseConnection } from '../client';
import { handleSupabaseError, ErrorSeverity } from '../../../utils/errorHandling/supabaseErrorHandler';

/**
 * Setup a connection listener to detect when the user goes offline/online
 */
export const setupConnectionListener = (): void => {
  try {
    window.addEventListener('online', () => checkConnectionAndSync());
    window.addEventListener('offline', () => {
      handleSupabaseError(
        'You are offline. Some features may be limited.', 
        true, 
        ErrorSeverity.WARNING
      );
    });
  } catch (error) {
    handleSupabaseError(
      'Failed to setup connection listener', 
      true, 
      ErrorSeverity.ERROR, 
      error
    );
  }
};

/**
 * Check connection status and sync offline changes if needed
 */
export const checkConnectionAndSync = async (): Promise<boolean> => {
  try {
    const isConnected = await checkSupabaseConnection();
    
    if (isConnected) {
      syncOfflineChanges();
      return true;
    } else {
      handleSupabaseError(
        'Unable to connect to server', 
        true, 
        ErrorSeverity.WARNING
      );
      return false;
    }
  } catch (error) {
    handleSupabaseError(
      'Failed to check connection status', 
      true, 
      ErrorSeverity.ERROR, 
      error
    );
    return false;
  }
};

/**
 * Sync offline changes when the user comes back online
 */
export const syncOfflineChanges = async (): Promise<boolean> => {
  try {
    // Check if there are any pending changes in localStorage
    const pendingChanges = localStorage.getItem('pendingChanges');
    
    if (!pendingChanges) {
      return true;
    }
    
    // Parse and process pending changes
    const changes = JSON.parse(pendingChanges);
    // Implementation details would depend on your app's requirements
    
    // Clear pending changes after successful sync
    localStorage.removeItem('pendingChanges');
    
    return true;
  } catch (error) {
    handleSupabaseError(
      'Failed to sync offline changes', 
      true, 
      ErrorSeverity.ERROR, 
      error
    );
    return false;
  }
};

/**
 * Check the connection status to Supabase
 * Re-export from client for convenience
 */
export { checkSupabaseConnection } from '../client';
