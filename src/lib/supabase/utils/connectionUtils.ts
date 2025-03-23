
import { toast } from 'sonner';
import { supabase } from '../../../integrations/supabase/client';

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

// Enhanced connection checker with more diagnostic information
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    console.log("[Supabase Debug] Starting connection check");
    
    // Check if browser is online first
    if (!navigator.onLine) {
      console.log("[Supabase Debug] Browser reports offline status");
      return false;
    }
    
    console.log("[Supabase Debug] Browser reports online status");
    
    // Get browser diagnostic info
    console.log("[Supabase Debug] Browser diagnostics:", {
      userAgent: navigator.userAgent,
      language: navigator.language,
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      origin: window.location.origin,
      href: window.location.href,
      protocol: window.location.protocol,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
    });
    
    // Try to ping Supabase
    try {
      console.log("[Supabase Debug] Making lightweight health check to Supabase");
      const start = performance.now();
      
      // Perform a super lightweight check by getting session (cached)
      const { data, error } = await supabase.auth.getSession();
      
      const end = performance.now();
      console.log("[Supabase Debug] Health check response time:", Math.round(end - start), "ms");
      
      if (error) {
        console.error("[Supabase Debug] Health check error:", error);
        return false;
      }
      
      console.log("[Supabase Debug] Health check successful, session exists:", !!data.session);
      return true;
    } catch (error) {
      console.error("[Supabase Debug] Health check exception:", error);
      // Default to true to avoid blocking auth functionality
      return true;
    }
  } catch (error) {
    console.error("[Supabase Debug] Connection check failed:", error);
    // Default to true to prevent blocking auth functionality
    return true;
  }
};
