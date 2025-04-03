
/**
 * Represents the results of an accessibility audit
 */
export interface AuditResult {
  pass: boolean;
  issue?: string;
  severity: 'critical' | 'warning' | 'info';
  element?: HTMLElement;
  suggestion?: string;
}

/**
 * Summary of accessibility audit results
 */
export interface AuditSummary {
  totalIssues: number;
  criticalIssues: number;
  warningIssues: number;
  infoIssues: number;
  results: AuditResult[];
}

/**
 * Type definitions for cache statistics to ensure consistent reporting
 */
export interface CacheStatistics {
  totalEntries: number;
  activeEntries: number;
  size: number;
  expiredEntries: number; 
  oldestEntry: Date;
  hitRate: number;
}

/**
 * Enhanced cache statistics with additional metrics
 */
export interface EnhancedCacheStatistics {
  size: number;
  hitRate: number;
  oldestEntry: any;
  frequentlyAccessedCount: number;
}

// Export union type to support both statistics formats
export type AllCacheStatistics = CacheStatistics | EnhancedCacheStatistics;
