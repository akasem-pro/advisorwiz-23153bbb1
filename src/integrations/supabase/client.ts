
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { PRODUCTION_DOMAINS } from '../../utils/mockAuthUtils';

// Use environment variables with fallbacks for development
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://gkymvotqrdecjjymmmef.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdreW12b3RxcmRlY2pqeW1tbWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NzA5NTIsImV4cCI6MjA1NzA0Njk1Mn0.j7Os6vxWOT35pC3rLiDuMuDty7VJTWvw7khbZpPLijY";

// Export the URL and key for other components to use if needed
export { SUPABASE_URL, SUPABASE_ANON_KEY };

// Improved environment detection with explicitly defined production domains
const isPreviewEnvironment = () => {
  try {
    const hostname = window.location.hostname;
    console.log('[Supabase Client] Checking environment for hostname:', hostname);
    
    // Check if the hostname exactly matches or ends with any production domain
    for (const domain of PRODUCTION_DOMAINS) {
      if (hostname === domain || hostname.endsWith('.' + domain)) {
        console.log("[Supabase Client] Production domain detected:", { hostname, matchedDomain: domain });
        return false;
      }
    }
    
    // If it's not explicitly a production domain, check if it looks like a production domain
    if (hostname.endsWith('.app') || !hostname.includes('.')) {
      console.log("[Supabase Client] Production domain pattern detected:", hostname);
      return false;
    }
    
    // Consider everything else as preview/test
    const isPreview = hostname.includes('preview') || hostname.includes('lovableproject');
    console.log("[Supabase Client] Environment detection result:", { hostname, isPreview });
    return isPreview;
  } catch (e) {
    console.error("[Supabase Client] Error checking environment:", e);
    return false; // Default to production on error
  }
};

// Create a Supabase client with improved configuration
export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: localStorage,
      storageKey: 'supabase.auth.token'
    },
    global: {
      headers: {
        'x-application-name': 'advisorwiz',
        'Cache-Control': 'no-cache'
      }
    },
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    }
  }
);

// Enhanced connection checker with better diagnostics and reliability
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    console.log("[Supabase Debug] Starting connection check");
    
    // Check if browser is online first
    if (!navigator.onLine) {
      console.log("[Supabase Debug] Browser reports offline status");
      return false;
    }
    
    console.log("[Supabase Debug] Browser reports online status");
    
    // Skip detailed check for preview environments but more careful detection
    if (isPreviewEnvironment()) {
      console.log("[Supabase Debug] Preview environment detected, skipping detailed check");
      return true;
    }
    
    // Try multiple endpoints for more reliable connection testing
    try {
      console.log("[Supabase Debug] Making lightweight health check to Supabase");
      const start = performance.now();
      
      // Make a lightweight request to check Supabase connectivity
      const { data, error } = await supabase.auth.getSession();
      
      const end = performance.now();
      console.log("[Supabase Debug] Health check response time:", Math.round(end - start), "ms");
      
      if (error) {
        console.error("[Supabase Debug] Health check error:", error);
        
        // Try a fallback check with a direct fetch
        try {
          const response = await fetch(`${SUPABASE_URL}/auth/v1/`, {
            method: 'HEAD',
            headers: {
              'apikey': SUPABASE_ANON_KEY,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            console.log("[Supabase Debug] Fallback direct fetch successful");
            return true;
          }
          
          console.error("[Supabase Debug] Fallback direct fetch failed:", response.status);
          return false;
        } catch (fetchError) {
          console.error("[Supabase Debug] Fallback fetch error:", fetchError);
          return false;
        }
      }
      
      console.log("[Supabase Debug] Health check successful, session exists:", !!data.session);
      return true;
    } catch (error) {
      console.error("[Supabase Debug] Health check exception:", error);
      return false;
    }
  } catch (error) {
    console.error("[Supabase Debug] Connection check failed:", error);
    return false;
  }
};
