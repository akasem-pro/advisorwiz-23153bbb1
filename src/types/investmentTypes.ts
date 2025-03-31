
/**
 * Types related to investments and financial profiles
 */

export type RiskTolerance = 'low' | 'medium' | 'high';

export type InvestmentAmount = number;

export type InvestmentCategory = 
  | 'stocks' 
  | 'bonds' 
  | 'real_estate' 
  | 'crypto' 
  | 'mutual_funds' 
  | 'etfs' 
  | 'cash' 
  | 'other';

export type InvestmentTimeframe = 
  | 'short_term' 
  | 'medium_term' 
  | 'long_term';

export interface InvestmentProfile {
  riskTolerance: RiskTolerance;
  investableAssets: number;
  investmentAmount?: number;
  preferredCategories?: InvestmentCategory[];
  timeframe?: InvestmentTimeframe;
  goals?: string[];
}
