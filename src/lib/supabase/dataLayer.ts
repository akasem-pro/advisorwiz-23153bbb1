
// This is the main entry point for the data layer, re-exporting all functionality from the modular files

// Types
export { DataResult, trackPerformance } from './types/dataTypes';

// Auth operations
export { getCurrentSession, signInWithEmail, signUpWithEmail, signOut } from './operations/authOperations';

// Profile operations
export { getProfile, updateProfile } from './operations/profileOperations';

// Advisor operations
export { getAdvisorProfiles } from './operations/advisorOperations';

// Compatibility operations
export { getCompatibilityScores } from './operations/compatibilityOperations';

// Appointment operations
export { getAppointments } from './operations/appointmentOperations';

// Chat operations
export { getChatMessages, subscribeToChats, subscribeToAppointments } from './operations/chatOperations';

// Connection utilities
export { setupConnectionListener, syncOfflineChanges, checkSupabaseConnection } from './utils/connectionUtils';

// Cache management utilities
export { invalidateCache, invalidateAllCache } from './utils/cacheUtils';

// Error handling utilities
export { handleSupabaseError, validateData, ERROR_MESSAGES } from './utils/errorHandling';
