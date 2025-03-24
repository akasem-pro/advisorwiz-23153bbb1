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
    handleError('Failed to connect to Supabase', ErrorCategory.CONNECTION);
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
    handleError('Failed to check connection status', ErrorCategory.CONNECTION);
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
    handleError('Connection recovery failed', ErrorCategory.CONNECTION);
    return false;
  }
};
