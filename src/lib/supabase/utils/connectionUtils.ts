
import { supabase } from '../../../integrations/supabase/client';
import { handleError, ErrorCategory } from '../../../utils/errorHandling/errorHandler';

/**
 * Check the connection to Supabase
 */
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    // Perform a simple query to check the connection
    await supabase.from('profiles').select('id').limit(1);
    return true;
  } catch (error) {
    // Log the error and return false
    handleError('Failed to connect to Supabase', true);
    return false;
  }
};

/**
 * Check if Supabase is online
 */
export const isSupabaseOnline = async (): Promise<boolean> => {
  try {
    // Use the checkSupabaseConnection function to check the connection
    const isConnected = await checkSupabaseConnection();
    return isConnected;
  } catch (error) {
    // Log the error and return false
    handleError('Failed to check connection status', true);
    return false;
  }
};

/**
 * Attempt to recover the Supabase connection
 */
export const recoverSupabaseConnection = async (): Promise<boolean> => {
  try {
    // Re-initialize the Supabase client
    // This might help in recovering the connection
    supabase.auth.getSession();
    
    // Check the connection again
    const isConnected = await checkSupabaseConnection();
    return isConnected;
  } catch (error) {
    // Log the error and return false
    handleError('Connection recovery failed', true);
    return false;
  }
};

/**
 * Check connection status (alias for isSupabaseOnline)
 */
export const checkConnection = async (): Promise<boolean> => {
  return await isSupabaseOnline();
};

/**
 * Sync offline changes back to Supabase when connection is restored
 */
export const syncOfflineChanges = async (): Promise<boolean> => {
  try {
    // In a real implementation, this would sync cached data
    // For now, just return true as a mock implementation
    console.log('Syncing offline changes...');
    return true;
  } catch (error) {
    handleError('Failed to sync offline changes', true);
    return false;
  }
};

/**
 * Setup connection listener for Supabase
 */
export const setupConnectionListener = (
  onConnectionChange?: (isConnected: boolean) => void
): (() => void) => {
  const checkInterval = setInterval(async () => {
    const isConnected = await checkConnection();
    if (onConnectionChange) {
      onConnectionChange(isConnected);
    }
  }, 30000); // Check every 30 seconds
  
  return () => clearInterval(checkInterval);
};
