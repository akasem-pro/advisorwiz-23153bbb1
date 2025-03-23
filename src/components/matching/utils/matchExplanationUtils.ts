
/**
 * Utility functions for match explanations
 */

/**
 * Categorizes explanations to improve display
 */
export const categorizeExplanations = (explanations: string[]) => {
  const categories: Record<string, string[]> = {
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
