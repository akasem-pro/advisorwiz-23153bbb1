
import { supabase } from '../../../integrations/supabase/client';
import { handleSupabaseError } from '../utils/errorHandling';
import { DataResult } from '../types/dataTypes';
import { Session, User } from '@supabase/supabase-js';
import { invalidateAllCache } from '../utils/cacheUtils';

// Auth specific utilities with the same error handling
export const getCurrentSession = async (): Promise<DataResult<{session: Session | null; user: User | null}>> => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      throw error;
    }
    
    return { 
      data: {
        session: data.session,
        user: data.session?.user || null
      },
      error: null,
      isFromCache: false
    };
  } catch (error) {
    const errorMessage = handleSupabaseError(error, 'Failed to get current session');
    return { 
      data: { session: null, user: null },
      error: errorMessage,
      isFromCache: false
    };
  }
};

export const signInWithEmail = async (email: string, password: string): Promise<DataResult<{session: Session | null; user: User | null}>> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
    
    if (error) {
      throw error;
    }
    
    return { 
      data: {
        session: data.session,
        user: data.user
      },
      error: null,
      isFromCache: false
    };
  } catch (error) {
    const errorMessage = handleSupabaseError(error, 'Failed to sign in');
    return { 
      data: { session: null, user: null },
      error: errorMessage,
      isFromCache: false
    };
  }
};

export const signUpWithEmail = async (email: string, password: string): Promise<DataResult<{session: Session | null; user: User | null}>> => {
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
      data: {
        session: data.session,
        user: data.user
      },
      error: null,
      isFromCache: false
    };
  } catch (error) {
    const errorMessage = handleSupabaseError(error, 'Failed to sign up');
    return { 
      data: { session: null, user: null },
      error: errorMessage,
      isFromCache: false
    };
  }
};

export const signOut = async (): Promise<DataResult<null>> => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
    
    // Clear all cached data on sign out
    invalidateAllCache();
    
    return { data: null, error: null, isFromCache: false };
  } catch (error) {
    const errorMessage = handleSupabaseError(error, 'Failed to sign out');
    return { data: null, error: errorMessage, isFromCache: false };
  }
};
