
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../integrations/supabase/client';
import { CHANNEL_STATES } from '@supabase/supabase-js';

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
        // Get initial connection status
        setIsConnected(supabase.realtime.isConnected());

        // Create a channel to monitor connection status
        const statusChannel = supabase.channel('connection_status');

        // Subscribe to connection state changes through the channel
        statusChannel
          .on('presence', { event: 'sync' }, () => {
            console.log("[Realtime] Connection synchronized");
            setIsConnected(supabase.realtime.isConnected());
          })
          .on('system', { event: 'connected' }, () => {
            console.log("[Realtime] Connection established");
            setIsConnected(true);
            setLastError(null);
            setReconnectAttempts(0);
          })
          .on('system', { event: 'disconnected' }, () => {
            console.log("[Realtime] Connection disconnected");
            setIsConnected(false);
            setLastError('Disconnected from realtime service');
          })
          .subscribe(status => {
            console.log("[Realtime] Subscription status:", status);
          });
        
      } catch (error) {
        console.error("[Realtime] Error initializing realtime connection:", error);
        setLastError(error instanceof Error ? error.message : 'Unknown error');
        setIsConnected(false);
      }
    };
    
    initializeConnection();
    
    // Cleanup on unmount
    return () => {
      // Clean up any channels we've created
      supabase.removeAllChannels();
    };
  }, []);
  
  // Force reconnection to realtime service
  const reconnect = useCallback(async () => {
    try {
      setReconnectAttempts(prev => prev + 1);
      
      // Disconnect first to ensure a clean state
      supabase.removeAllChannels();
      
      // Short delay before reconnecting
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a new channel to test the connection
      const channel = supabase.channel('reconnect_test');
      
      // Subscribe and check the result
      const status = await channel.subscribe();
      
      // Check if subscription was successful by checking the channel state
      // Using the proper type by checking against RealtimeChannel's state enum values
      const connected = channel.state === CHANNEL_STATES.SUBSCRIBED;
      setIsConnected(connected);
      
      return connected;
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
