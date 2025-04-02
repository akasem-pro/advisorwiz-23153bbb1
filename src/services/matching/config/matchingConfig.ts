/**
 * Centralized configuration for matching algorithm parameters
 * 
 * This file contains all configurable parameters used by the matching system.
 * Adjusting these values allows fine-tuning the algorithm behavior without
 * modifying the core logic.
 */

/**
 * Weights applied to different matching factors
 * Higher values give that factor more influence on the final score
 */
export const MATCHING_WEIGHTS = {
  // Core matching factors
  LANGUAGE: 10,           // Language match bonus
  EXPERTISE: 15,          // Expertise coverage bonus  
  AVAILABILITY: 5,        // Availability bonus (max)
  LOCATION: 5,            // Location proximity bonus
  
  // Risk and service alignment
  RISK_ALIGNMENT: 10,     // Risk tolerance alignment
  EXCLUDED_PENALTY: 25,   // Penalty for excluded categories
  
  // Interaction history factors
  CALL_INTERACTION: {
    CALL_COUNT: 10,       // Up to 10 points for call frequency  
    DURATION: 10,         // Up to 10 points for call duration
    COMPLETION_RATE: 10   // Up to 10 points for call completion rate
  },
  
  // User feedback
  USER_FEEDBACK: 15       // Weight for user feedback adjustments
};

/**
 * Cache configuration parameters
 */
export const CACHE_CONFIG = {
  // TTL (Time-To-Live) for cached compatibility scores in milliseconds
  EXPIRATION_MS: 5 * 60 * 1000,  // 5 minutes
  
  // Maximum items to keep in memory cache
  MAX_ITEMS: 500,
  
  // How often to perform cache cleanup in milliseconds
  CLEANUP_INTERVAL_MS: 10 * 60 * 1000  // 10 minutes
};

/**
 * Strategy selection thresholds and parameters
 */
export const STRATEGY_CONFIG = {
  // Minimum match score to consider as valid
  DEFAULT_MINIMUM_SCORE: 40,
  
  // Premium user score adjustment
  PREMIUM_BONUS: 5,
  
  // Service category weights for different risk profiles
  RISK_CATEGORY_WEIGHTS: {
    LOW: {
      insurance: 2.0,
      estate: 1.8,
      education: 1.5,
      retirement: 1.0,
      tax: 0.8,
      investment: 0.5
    },
    MEDIUM: {
      retirement: 2.0,
      tax: 1.8,
      education: 1.5,
      insurance: 1.2,
      estate: 1.0,
      investment: 0.8
    },
    HIGH: {
      investment: 2.0,
      business: 1.8,
      tax: 1.0,
      retirement: 0.8,
      estate: 0.5
    }
  }
};

/**
 * Explanation generation configuration
 */
export const EXPLANATION_CONFIG = {
  // Maximum number of explanations to return
  MAX_EXPLANATIONS: 5,
  
  // Minimum score impact to include in explanations
  MIN_SCORE_IMPACT: 3
};
