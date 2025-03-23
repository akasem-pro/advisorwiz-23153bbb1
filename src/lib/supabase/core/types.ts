
import { Session, User } from '@supabase/supabase-js';

// Add this interface to match what's used in useSupabase
export interface DataResult<T> {
  data: T | null;
  error: string | null;
  isFromCache: boolean;
}

// Error handling constants
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  PERMISSION: 'You don\'t have permission to perform this action.',
  NOT_FOUND: 'The requested data could not be found.',
  VALIDATION: 'Invalid data provided.',
  GENERIC: 'An error occurred. Please try again.',
  AUTH: 'Authentication error. Please sign in again.',
};

// Cache constants
export const CACHE_KEYS = {
  PROFILES: 'cache_profiles',
  ADVISORS: 'cache_advisors',
  CONSUMERS: 'cache_consumers',
  MATCHES: 'cache_matches',
  APPOINTMENTS: 'cache_appointments',
  CHATS: 'cache_chats',
};
