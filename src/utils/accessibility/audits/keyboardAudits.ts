
import { AuditResult } from '../types';

/**
 * Check keyboard navigation
 */
export const checkKeyboardNavigation = (): AuditResult[] => {
  const results: AuditResult[] = [];
  
  // Check for interactive elements with tabindex=-1 but no aria-hidden
  const interactiveElements = document.querySelectorAll('a, button, [role="button"], [tabindex]');
  
  interactiveElements.forEach(element => {
    const tabindex = element.getAttribute('tabindex');
    const ariaHidden = element.getAttribute('aria-hidden');
    const role = element.getAttribute('role');
    
    // Skip tab elements as they're handled by the TabsPrimitive component
    if (role === 'tab') return;
    
    if (tabindex === '-1' && ariaHidden !== 'true') {
      results.push({
        pass: false,
        element: element as HTMLElement,
        issue: 'Interactive element with tabindex="-1" but not aria-hidden',
        severity: 'warning',
        suggestion: 'Either make the element focusable or hide it from screen readers'
      });
    }
    
    // Check if clickable div is used instead of button
    if (element.tagName === 'DIV' && element.getAttribute('role') === 'button') {
      const hasKeyHandler = element.hasAttribute('onkeydown') || element.hasAttribute('onkeypress');
      
      if (!hasKeyHandler) {
        results.push({
          pass: false,
          element: element as HTMLElement,
          issue: 'Div with role="button" lacks keyboard handler',
          severity: 'critical',
          suggestion: 'Add keyboard event handlers or use a proper button element'
        });
      }
    }
  });
  
  return results;
};
