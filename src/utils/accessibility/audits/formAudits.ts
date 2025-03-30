
import { AuditResult } from '../types';

/**
 * Check form elements for proper labels
 */
export const checkFormLabels = (): AuditResult[] => {
  const results: AuditResult[] = [];
  const formControls = document.querySelectorAll('input, select, textarea');
  
  formControls.forEach(control => {
    const id = control.id;
    
    // Skip hidden inputs
    if (control instanceof HTMLInputElement && control.type === 'hidden') {
      return;
    }
    
    if (!id) {
      results.push({
        pass: false,
        element: control as HTMLElement,
        issue: 'Form control without ID',
        severity: 'critical',
        suggestion: 'Add ID to form control and associate with label'
      });
      return;
    }
    
    const hasLabel = document.querySelector(`label[for="${id}"]`);
    const hasAriaLabel = control.getAttribute('aria-label');
    const hasAriaLabelledBy = control.getAttribute('aria-labelledby');
    
    if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
      results.push({
        pass: false,
        element: control as HTMLElement,
        issue: 'Form control without label',
        severity: 'critical',
        suggestion: 'Associate a label with this form control using label[for], aria-label, or aria-labelledby'
      });
    }
  });
  
  return results;
};
