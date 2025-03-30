
import { AuditResult } from '../types';

/**
 * Check heading hierarchy (h1, h2, h3, etc.)
 */
export const checkHeadingHierarchy = (): AuditResult[] => {
  const results: AuditResult[] = [];
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  
  // Check if there's exactly one h1
  const h1Count = document.querySelectorAll('h1').length;
  
  if (h1Count === 0) {
    results.push({
      pass: false,
      issue: 'No h1 heading found on the page',
      severity: 'warning',
      suggestion: 'Each page should have exactly one h1 heading'
    });
  } else if (h1Count > 1) {
    results.push({
      pass: false,
      issue: `Multiple h1 headings (${h1Count}) found on the page`,
      severity: 'warning',
      suggestion: 'Each page should have exactly one h1 heading'
    });
  }
  
  // Check for skipped heading levels
  let lastLevel = 0;
  
  headings.forEach(heading => {
    const level = parseInt(heading.tagName.substring(1));
    
    if (level - lastLevel > 1 && lastLevel !== 0) {
      results.push({
        pass: false,
        element: heading as HTMLElement,
        issue: `Skipped heading level: h${lastLevel} to h${level}`,
        severity: 'warning',
        suggestion: 'Maintain a proper heading hierarchy without skipping levels'
      });
    }
    
    lastLevel = level;
  });
  
  return results;
};
