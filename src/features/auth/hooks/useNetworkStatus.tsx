
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../integrations/supabase/client';

/**
 * Custom hook to track network connectivity status
 */
export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  const checkNetworkStatus = useCallback(async () => {
    // Start with browser's navigator.onLine as initial check
    if (!navigator.onLine) {
      setNetworkStatus('offline');
      return false;
    }

    // Set to checking while we verify the connection
    setNetworkStatus('checking');
    
    try {
      // First, try the browser's navigator.onLine
      if (!navigator.onLine) {
        setNetworkStatus('offline');
        return false;
      }
      
      // Try a simple fetch to our own domain to verify connectivity
      // This avoids CORS issues with external domains
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      try {
        // Fetch favicon or any static asset from our own domain
        // with cache busting to ensure we're not getting a cached response
        const response = await fetch(`/favicon.ico?_=${Date.now()}`, {
          method: 'HEAD',
          signal: controller.signal,
          cache: 'no-store'
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          setNetworkStatus('online');
          return true;
        } else {
          // If we can reach our domain but get a non-200 response,
          // we're still online but might have other issues
          setNetworkStatus('online');
          return true;
        }
      } catch (fetchError) {
        clearTimeout(timeoutId);
        console.log("Local fetch check failed:", fetchError);
        
        // If fetch fails, try Supabase as fallback
        const isConnected = await checkSupabaseConnection();
        setNetworkStatus(isConnected ? 'online' : 'offline');
        return isConnected;
      }
    } catch (error) {
      console.log("Network check failed:", error);
      
      // Fallback to navigator.onLine if everything else fails
      const isOnline = navigator.onLine;
      setNetworkStatus(isOnline ? 'online' : 'offline');
      return isOnline;
    } finally {
      setLastChecked(new Date());
    }
  }, []);

  // Helper function to check Supabase connectivity
  const checkSupabaseConnection = async () => {
    try {
      // Use a very lightweight query
      const { error } = await supabase.from('profiles').select('id', { count: 'exact', head: true }).limit(1);
      
      if (error) {
        console.error('Supabase connection error:', error.message);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Supabase connection check failed:', error);
      return false;
    }
  };

  useEffect(() => {
    // Check initial status
    checkNetworkStatus();
    
    // Setup periodic checks every 30 seconds
    const intervalId = setInterval(() => {
      checkNetworkStatus();
    }, 30000);
    
    const handleOnline = () => {
      console.log("Browser reports online status");
      checkNetworkStatus(); // Verify with an actual request
    };
    
    const handleOffline = () => {
      console.log("Browser reports offline status");
      setNetworkStatus('offline');
      setLastChecked(new Date());
    };
    
    // Set up listeners for network status changes
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [checkNetworkStatus]);

  return { 
    networkStatus,
    lastChecked,
    checkNetworkStatus
  };
};
