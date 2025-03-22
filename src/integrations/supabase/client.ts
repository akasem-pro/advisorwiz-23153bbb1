
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export const SUPABASE_URL = "https://gkymvotqrdecjjymmmef.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdreW12b3RxcmRlY2pqeW1tbWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NzA5NTIsImV4cCI6MjA1NzA0Njk1Mn0.j7Os6vxWOT35pC3rLiDuMuDty7VJTWvw7khbZpPLijY";

// Create the Supabase client
export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: localStorage
    }
  }
);

// Simple function to check if we're online according to the browser
export const checkSupabaseConnection = () => {
  return Promise.resolve(navigator.onLine);
};
