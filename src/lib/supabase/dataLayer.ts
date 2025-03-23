
// Re-export all services from a central location
import { validateData } from './core/errorHandling';
import type { DataResult } from './core/types';
import { CACHE_KEYS, ERROR_MESSAGES } from './core/types';
import { saveToCache, getFromCache, clearCache, invalidateCache, invalidateAllCache } from './core/cacheUtils';

// Import and re-export profile services
import { getProfile, updateProfile } from './services/profileService';

// Import and re-export advisor services
import { getAdvisorProfiles } from './services/advisorService';

// Import and re-export matching services
import { getCompatibilityScores } from './services/matchingService';

// Import and re-export appointment services
import { getAppointments } from './services/appointmentService';

// Import and re-export chat services
import { getChatMessages, subscribeToChats } from './services/chatService';

// Import and re-export realtime services
import { subscribeToAppointments } from './services/realtimeService';

// Import and re-export connection services
import { setupConnectionListener, syncOfflineChanges } from './services/connectionService';

// Import and re-export auth services
import { getCurrentSession, signInWithEmail, signUpWithEmail, signOut } from './services/authService';

// Export everything
export {
  // Types
  type DataResult,
  CACHE_KEYS,
  ERROR_MESSAGES,
  
  // Cache utilities
  saveToCache,
  getFromCache,
  clearCache,
  invalidateCache,
  invalidateAllCache,
  
  // Data validation
  validateData,
  
  // Profile operations
  getProfile,
  updateProfile,
  
  // Advisor operations
  getAdvisorProfiles,
  
  // Matching operations
  getCompatibilityScores,
  
  // Appointment operations
  getAppointments,
  
  // Chat operations
  getChatMessages,
  
  // Realtime subscriptions
  subscribeToChats,
  subscribeToAppointments,
  
  // Connection management
  setupConnectionListener,
  syncOfflineChanges,
  
  // Auth operations
  getCurrentSession,
  signInWithEmail,
  signUpWithEmail,
  signOut
};
