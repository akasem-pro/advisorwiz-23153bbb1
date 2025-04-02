
/**
 * Type definitions for the matching system API contracts
 * 
 * This file centralizes the type definitions for data structures used
 * throughout the matching system, ensuring consistent data formats
 * between modules.
 */

import { ServiceCategory } from '../../../types/userTypes';

/**
 * Result of a compatibility calculation between an advisor and consumer
 */
export interface CompatibilityResult {
  /**
   * Numeric score (0-100) representing compatibility
   */
  score: number;
  
  /**
   * Human-readable explanations for the score
   */
  matchExplanation: string[];
  
  /**
   * Optional metadata about the calculation
   */
  metadata?: {
    /**
     * Whether this result came from cache
     */
    fromCache?: boolean;
    
    /**
     * Timestamp when this result was calculated
     */
    calculatedAt?: number;
    
    /**
     * Strategy used for calculation
     */
    strategyType?: string;
    
    /**
     * Algorithm version for tracking
     */
    algorithmVersion?: string;
  };
}

/**
 * Individual factor score with explanation
 */
export interface FactorScore {
  /**
   * Name of the matching factor
   */
  factor: string;
  
  /**
   * Numeric score contribution
   */
  score: number;
  
  /**
   * Optional explanation text
   */
  explanation: string | null;
}

/**
 * Detailed breakdown of a compatibility score
 */
export interface ScoreBreakdown {
  /**
   * Final overall compatibility score
   */
  totalScore: number;
  
  /**
   * Individual factor scores that contributed to the total
   */
  factors: FactorScore[];
}

/**
 * Match recommendation with explanation
 */
export interface MatchRecommendation {
  /**
   * ID of the recommended match
   */
  id: string;
  
  /**
   * Type of the recommendation (advisor or consumer)
   */
  type: 'advisor' | 'consumer';
  
  /**
   * Compatibility score (0-100)
   */
  score: number;
  
  /**
   * Human-readable explanations for this recommendation
   */
  explanations: string[];
  
  /**
   * Optional source of this recommendation
   */
  source?: 'algorithm' | 'activity' | 'similar_users' | 'manual';
}

/**
 * Risk alignment configuration for matching
 */
export interface RiskMatchingConfig {
  /**
   * Consumer's risk tolerance level
   */
  consumerRiskTolerance: 'low' | 'medium' | 'high';
  
  /**
   * Weighted importance of service categories based on risk level
   */
  categoryWeights: Record<ServiceCategory, number>;
}

/**
 * Matching strategy identification and metadata
 */
export interface StrategyMetadata {
  /**
   * Unique identifier for the strategy
   */
  id: string;
  
  /**
   * User-friendly name for UI display
   */
  name: string;
  
  /**
   * Short description of what the strategy optimizes for
   */
  description: string;
  
  /**
   * Current version of the strategy
   */
  version: string;
  
  /**
   * User subscription level required for this strategy
   */
  requiredSubscription?: 'free' | 'standard' | 'premium';
}
