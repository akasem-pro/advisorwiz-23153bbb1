
/**
 * Constants for preference weights used in matching algorithms
 */
export const PREFERENCE_WEIGHTS = {
  LANGUAGE: 10,           // Language match bonus
  EXPERTISE: 15,          // Expertise coverage bonus
  AVAILABILITY: 5,        // Availability bonus (max)
  EXCLUDED_PENALTY: 25,   // Penalty for excluded categories
  CALL_INTERACTION: {
    CALL_COUNT: 10,       // Up to 10 points for call frequency
    DURATION: 10,         // Up to 10 points for call duration
    COMPLETION_RATE: 10   // Up to 10 points for call completion rate
  },
  USER_FEEDBACK: 15       // Weight for user feedback adjustments
};

// Cache expiration time (5 minutes)
export const CACHE_EXPIRATION_MS = 5 * 60 * 1000;
