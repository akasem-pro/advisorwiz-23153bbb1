
import { AuditResult } from '../types';

/**
 * Check all images on the page for alt text
 */
export const checkImagesForAltText = (): AuditResult[] => {
  const results: AuditResult[] = [];
  const images = document.querySelectorAll('img');

  images.forEach(img => {
    const hasAlt = img.hasAttribute('alt');
    
    if (!hasAlt) {
      results.push({
        pass: false,
        element: img as HTMLElement,
        issue: 'Image missing alt text',
        severity: 'critical',
        suggestion: 'Add descriptive alt text to all images for screen reader support'
      });
    } else if (img.alt === '' && !img.classList.contains('decorative')) {
      results.push({
        pass: false,
        element: img as HTMLElement,
        issue: 'Image has empty alt text but is not marked as decorative',
        severity: 'warning',
        suggestion: 'Add descriptive alt text or add class "decorative" if image is purely decorative'
      });
    }
  });

  return results;
};
