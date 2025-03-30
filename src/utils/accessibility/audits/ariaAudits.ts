
import { AuditResult } from '../types';

/**
 * Check ARIA attributes usage
 */
export const checkARIAUsage = (): AuditResult[] => {
  const results: AuditResult[] = [];
  
  const ariaAttributeSelectors = [
    '[aria-label]', '[aria-labelledby]', '[aria-describedby]',
    '[aria-hidden]', '[aria-expanded]', '[aria-haspopup]',
    '[aria-controls]', '[aria-live]', '[aria-atomic]',
    '[aria-current]', '[aria-disabled]', '[aria-selected]',
    '[aria-required]', '[aria-checked]', '[aria-pressed]',
    '[aria-valuemin]', '[aria-valuemax]', '[aria-valuenow]',
    '[aria-valuetext]', '[aria-busy]', '[aria-invalid]',
    '[role]'
  ];
  
  // Query elements with common ARIA attributes
  const ariaElements = new Set<Element>();
  
  ariaAttributeSelectors.forEach(selector => {
    try {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => ariaElements.add(el));
    } catch (error) {
      console.warn(`Error querying selector ${selector}:`, error);
    }
  });
  
  // Now process all found elements with ARIA attributes
  ariaElements.forEach(element => {
    // Check for invalid ARIA roles
    const role = element.getAttribute('role');
    const validRoles = [
      'alert', 'alertdialog', 'application', 'article', 'banner', 'button', 
      'cell', 'checkbox', 'columnheader', 'combobox', 'complementary', 
      'contentinfo', 'definition', 'dialog', 'directory', 'document', 
      'feed', 'figure', 'form', 'grid', 'gridcell', 'group', 'heading', 
      'img', 'link', 'list', 'listbox', 'listitem', 'log', 'main', 
      'marquee', 'math', 'menu', 'menubar', 'menuitem', 'menuitemcheckbox', 
      'menuitemradio', 'navigation', 'none', 'note', 'option', 'presentation', 
      'progressbar', 'radio', 'radiogroup', 'region', 'row', 'rowgroup', 
      'rowheader', 'scrollbar', 'search', 'searchbox', 'separator', 
      'slider', 'spinbutton', 'status', 'switch', 'tab', 'table', 
      'tablist', 'tabpanel', 'term', 'textbox', 'timer', 'toolbar', 
      'tooltip', 'tree', 'treegrid', 'treeitem'
    ];
    
    if (role && !validRoles.includes(role)) {
      results.push({
        pass: false,
        element: element as HTMLElement,
        issue: `Invalid ARIA role: "${role}"`,
        severity: 'critical',
        suggestion: 'Use a valid ARIA role or remove the role attribute'
      });
    }
    
    // Check common ARIA misuses
    if (
      element.hasAttribute('aria-hidden') && 
      element.getAttribute('aria-hidden') === 'true' && 
      element.hasAttribute('tabindex')
    ) {
      results.push({
        pass: false,
        element: element as HTMLElement,
        issue: 'Element has aria-hidden="true" but is focusable',
        severity: 'critical',
        suggestion: 'Remove tabindex or aria-hidden attribute'
      });
    }
  });
  
  return results;
};
