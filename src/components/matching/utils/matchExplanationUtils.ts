
/**
 * Utility functions for match explanations
 */

import { MatchExplanation } from '../MatchExplanation.d';

/**
 * Convert string explanations to MatchExplanation objects
 */
export const convertToMatchExplanations = (explanations: string[]): MatchExplanation[] => {
  return explanations.map(explanation => {
    // Determine if this is a primary explanation based on content
    const isPrimary = explanation.includes('Expert') || 
                     explanation.includes('Expertise') || 
                     explanation.includes('language') || 
                     explanation.includes('Languages');
    
    // Extract a category from the explanation
    let category = 'Other';
    if (explanation.includes('Expertise')) category = 'Expertise';
    else if (explanation.includes('language')) category = 'Language';
    else if (explanation.includes('location')) category = 'Location';
    else if (explanation.includes('availability')) category = 'Availability';
    else if (explanation.includes('experience')) category = 'Experience';
    
    // Calculate a score impact based on being primary or not
    const scoreImpact = isPrimary ? 0.8 : 0.5;
    
    return {
      category,
      explanation,
      scoreImpact,
      isPrimary
    };
  });
};

/**
 * Categorizes explanations to improve display
 */
export const categorizeExplanations = (explanations: string[]): { primary: string[]; secondary: string[] } => {
  const categories: { primary: string[]; secondary: string[] } = {
    primary: [],
    secondary: []
  };
  
  // Sort explanations by importance/relevance
  explanations.forEach(explanation => {
    if (
      explanation.includes('Expert') || 
      explanation.includes('Expertise') || 
      explanation.includes('language') || 
      explanation.includes('Languages')
    ) {
      categories.primary.push(explanation);
    } else {
      categories.secondary.push(explanation);
    }
  });
  
  return categories;
};
