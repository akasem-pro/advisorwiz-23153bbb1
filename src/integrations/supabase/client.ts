
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Use environment variables with fallbacks for development
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://gkymvotqrdecjjymmmef.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdreW12b3RxcmRlY2pqeW1tbWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NzA5NTIsImV4cCI6MjA1NzA0Njk1Mn0.j7Os6vxWOT35pC3rLiDuMuDty7VJTWvw7khbZpPLijY";

// Export the URL and key for other components to use if needed
export { SUPABASE_URL, SUPABASE_ANON_KEY };

// Create a Supabase client with proper configuration
export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: localStorage
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

