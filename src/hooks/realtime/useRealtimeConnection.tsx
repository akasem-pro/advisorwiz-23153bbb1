
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../integrations/supabase/client';

/**
 * Hook for managing Supabase realtime connections
 * Provides status monitoring and reconnection capabilities
 */
export const useRealtimeConnection = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState<number>(0);
  
  // Initialize realtime connection
  useEffect(() => {
    // Try to establish initial connection
    const initializeConnection = async () => {
      try {
        // Subscribe to connection status changes
        const { data } = supabase.realtime.status((status) => {
          console.log("[Realtime] Connection status changed:", status);
          setIsConnected(status === 'CONNECTED');
          
          if (status === 'CONNECTED') {
            setLastError(null);
            setReconnectAttempts(0);
          } else if (status === 'DISCONNECTED') {
            setLastError('Disconnected from realtime service');
          }
        });
        
        // Initial connection status
        setIsConnected(supabase.realtime.isConnected());
      } catch (error) {
        console.error("[Realtime] Error initializing realtime connection:", error);
        setLastError(error instanceof Error ? error.message : 'Unknown error');
        setIsConnected(false);
      }
    };
    
    initializeConnection();
    
    // Cleanup on unmount
    return () => {
      // No explicit cleanup needed as Supabase manages the connection
    };
  }, []);
  
  // Force reconnection to realtime service
  const reconnect = useCallback(async () => {
    try {
      setReconnectAttempts(prev => prev + 1);
      
      // Disconnect first to ensure a clean state
      supabase.realtime.disconnect();
      
      // Short delay before reconnecting
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Reconnect
      supabase.realtime.connect();
      
      // Update connection status
      setIsConnected(supabase.realtime.isConnected());
      
      return supabase.realtime.isConnected();
    } catch (error) {
      console.error("[Realtime] Error during reconnection:", error);
      setLastError(error instanceof Error ? error.message : 'Failed to reconnect');
      return false;
    }
  }, []);
  
  return {
    isConnected,
    lastError,
    reconnectAttempts,
    reconnect
  };
};

export default useRealtimeConnection;
