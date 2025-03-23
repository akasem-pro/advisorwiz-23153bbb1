
// Types for compatibility scores and match explanations

// Compatibility score type for the matching system
export type CompatibilityScore = {
  id: string;
  advisor_id: string;
  consumer_id: string;
  score: number;
  match_explanations?: string[];
  created_at: string;
  updated_at: string;
};
