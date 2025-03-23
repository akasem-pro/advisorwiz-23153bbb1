
import { supabase } from '../../../integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { handleSupabaseError } from '../core/errorHandling';
import { invalidateAllCache } from '../core/cacheUtils';

// Auth specific utilities with the same error handling
export const getCurrentSession = async (): Promise<{ session: Session | null; user: User | null; error: string | null }> => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      throw error;
    }
    
    return { 
      session: data.session, 
      user: data.session?.user || null,
      error: null 
    };
  } catch (error) {
    const errorMessage = handleSupabaseError(error, 'Failed to get current session');
    return { session: null, user: null, error: errorMessage };
  }
};

export const signInWithEmail = async (email: string, password: string): Promise<{ session: Session | null; user: User | null; error: string | null }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
    
    if (error) {
      throw error;
    }
    
    return { 
      session: data.session, 
      user: data.user,
      error: null 
    };
  } catch (error) {
    const errorMessage = handleSupabaseError(error, 'Failed to sign in');
    return { session: null, user: null, error: errorMessage };
  }
};

export const signUpWithEmail = async (email: string, password: string): Promise<{ session: Session | null; user: User | null; error: string | null }> => {
  try {
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: window.location.origin + '/auth/callback'
      }
    });
    
    if (error) {
      throw error;
    }
    
    return { 
      session: data.session, 
      user: data.user,
      error: null 
    };
  } catch (error) {
    const errorMessage = handleSupabaseError(error, 'Failed to sign up');
    return { session: null, user: null, error: errorMessage };
  }
};

export const signOut = async (): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
    
    // Clear all cached data on sign out
    invalidateAllCache();
    
    return { error: null };
  } catch (error) {
    const errorMessage = handleSupabaseError(error, 'Failed to sign out');
    return { error: errorMessage };
  }
};
