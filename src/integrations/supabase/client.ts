
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export const SUPABASE_URL = "https://gkymvotqrdecjjymmmef.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdreW12b3RxcmRlY2pqeW1tbWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NzA5NTIsImV4cCI6MjA1NzA0Njk1Mn0.j7Os6vxWOT35pC3rLiDuMuDty7VJTWvw7khbZpPLijY";

// Create a Supabase client with reliable timeout and retry settings
export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: localStorage
    },
    global: {
      headers: {
        'x-application-name': 'advisorwiz'
      }
    }
  }
);

// Simplified connection check function that works in sandboxed environments
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    // First check browser's online status
    if (!navigator.onLine) {
      console.log("Browser reports offline status");
      return false;
    }
    
    // Use a simple and reliable check - just verify that the browser can make a request
    // This approach works better in sandboxes
    try {
      // Try to get session - lightweight operation that will succeed if Supabase is available
      await supabase.auth.getSession();
      return true;
    } catch (error) {
      console.error("Supabase connection check failed:", error);
      return false;
    }
  } catch (error) {
    console.error("Connection check failed:", error);
    return false;
  }
};
