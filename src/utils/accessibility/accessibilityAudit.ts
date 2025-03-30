
import { checkContrastRatio } from './accessibilityGuide';

/**
 * Accessibility Audit Tool
 * 
 * This utility helps identify accessibility issues on the page
 * and provides suggestions for improvements.
 */

interface AuditResult {
  pass: boolean;
  element?: HTMLElement;
  issue?: string;
  severity: 'critical' | 'warning' | 'info';
  suggestion?: string;
}

interface AuditSummary {
  totalIssues: number;
  criticalIssues: number;
  warningIssues: number;
  infoIssues: number;
  results: AuditResult[];
}

/**
 * Run a full accessibility audit on the current page
 */
export const runAccessibilityAudit = (): AuditSummary => {
  const results: AuditResult[] = [
    ...checkImagesForAltText(),
    ...checkHeadingHierarchy(),
    ...checkFormLabels(),
    ...checkColorContrast(),
    ...checkKeyboardNavigation(),
    ...checkARIAUsage(),
  ];

  // Generate summary
  const criticalIssues = results.filter(r => r.severity === 'critical').length;
  const warningIssues = results.filter(r => r.severity === 'warning').length;
  const infoIssues = results.filter(r => r.severity === 'info').length;

  return {
    totalIssues: results.length,
    criticalIssues,
    warningIssues,
    infoIssues,
    results
  };
};

/**
 * Check all images on the page for alt text
 */
const checkImagesForAltText = (): AuditResult[] => {
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

/**
 * Check heading hierarchy (h1, h2, h3, etc.)
 */
const checkHeadingHierarchy = (): AuditResult[] => {
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

/**
 * Check form elements for proper labels
 */
const checkFormLabels = (): AuditResult[] => {
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

/**
 * Check color contrast of text elements
 */
const checkColorContrast = (): AuditResult[] => {
  const results: AuditResult[] = [];
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, label, button');
  
  textElements.forEach(element => {
    const style = window.getComputedStyle(element);
    const foreground = style.color;
    const background = style.backgroundColor;
    
    // Convert RGB to hex for contrast calculation
    const rgbToHex = (rgb: string) => {
      // Extract r, g, b values
      const rgbRegex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
      const match = rgb.match(rgbRegex);
      
      if (!match) return '#000000';
      
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    };
    
    // Skip elements with transparent background
    if (background === 'rgba(0, 0, 0, 0)' || background === 'transparent') {
      return;
    }
    
    const foregroundHex = rgbToHex(foreground);
    const backgroundHex = rgbToHex(background);
    
    const ratio = checkContrastRatio(foregroundHex, backgroundHex);
    const fontSize = parseFloat(style.fontSize);
    const isBold = parseInt(style.fontWeight) >= 700;
    
    // WCAG AA requirements: 4.5:1 for normal text, 3:1 for large text (18pt or 14pt bold)
    const isLargeText = fontSize >= 18 || (fontSize >= 14 && isBold);
    const requiredRatio = isLargeText ? 3 : 4.5;
    
    if (ratio < requiredRatio) {
      results.push({
        pass: false,
        element: element as HTMLElement,
        issue: `Insufficient color contrast: ${ratio.toFixed(2)}:1 (should be at least ${requiredRatio}:1)`,
        severity: 'critical',
        suggestion: 'Increase color contrast between text and background'
      });
    }
  });
  
  return results;
};

/**
 * Check keyboard navigation
 */
const checkKeyboardNavigation = (): AuditResult[] => {
  const results: AuditResult[] = [];
  const interactiveElements = document.querySelectorAll('a, button, [role="button"], [tabindex]');
  
  interactiveElements.forEach(element => {
    const tabindex = element.getAttribute('tabindex');
    
    if (tabindex === '-1' && !element.hasAttribute('aria-hidden')) {
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

/**
 * Check ARIA attributes usage
 */
const checkARIAUsage = (): AuditResult[] => {
  const results: AuditResult[] = [];
  
  // Fix: Use specific ARIA attributes instead of the invalid [aria-*] selector
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

/**
 * Print audit results to console in a readable format
 */
export const printAccessibilityReport = (summary: AuditSummary): void => {
  console.group('Accessibility Audit Report');
  console.log(`Total issues: ${summary.totalIssues}`);
  console.log(`Critical issues: ${summary.criticalIssues}`);
  console.log(`Warnings: ${summary.warningIssues}`);
  console.log(`Info: ${summary.infoIssues}`);
  
  if (summary.results.length > 0) {
    console.group('Issues');
    
    summary.results.forEach((result, index) => {
      console.group(`Issue #${index + 1}: ${result.issue}`);
      console.log(`Severity: ${result.severity}`);
      if (result.suggestion) console.log(`Suggestion: ${result.suggestion}`);
      if (result.element) console.log('Element:', result.element);
      console.groupEnd();
    });
    
    console.groupEnd();
  }
  
  console.groupEnd();
};

/**
 * Run the accessibility audit and return an HTML report
 */
export const generateAccessibilityReport = (): string => {
  const summary = runAccessibilityAudit();
  
  // Also print to console for developers
  printAccessibilityReport(summary);
  
  // Generate HTML report
  return `
    <div class="a11y-report p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">Accessibility Audit Report</h2>
      
      <div class="flex space-x-4 mb-6">
        <div class="bg-red-100 dark:bg-red-900 p-3 rounded flex-1 text-center">
          <div class="text-2xl font-bold text-red-700 dark:text-red-300">${summary.criticalIssues}</div>
          <div class="text-sm text-red-700 dark:text-red-300">Critical</div>
        </div>
        <div class="bg-yellow-100 dark:bg-yellow-900 p-3 rounded flex-1 text-center">
          <div class="text-2xl font-bold text-yellow-700 dark:text-yellow-300">${summary.warningIssues}</div>
          <div class="text-sm text-yellow-700 dark:text-yellow-300">Warnings</div>
        </div>
        <div class="bg-blue-100 dark:bg-blue-900 p-3 rounded flex-1 text-center">
          <div class="text-2xl font-bold text-blue-700 dark:text-blue-300">${summary.infoIssues}</div>
          <div class="text-sm text-blue-700 dark:text-blue-300">Info</div>
        </div>
      </div>
      
      ${summary.results.length === 0 ? 
        `<div class="bg-green-100 dark:bg-green-900 p-4 rounded text-center text-green-700 dark:text-green-300">
          <p class="font-bold">No accessibility issues found!</p>
        </div>` : 
        `<div class="space-y-4">
          ${summary.results.map((result, index) => `
            <div class="border-l-4 ${
              result.severity === 'critical' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 
              result.severity === 'warning' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' : 
              'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            } p-3 rounded">
              <div class="flex justify-between">
                <h3 class="font-bold">${result.issue}</h3>
                <span class="text-sm ${
                  result.severity === 'critical' ? 'text-red-600 dark:text-red-400' : 
                  result.severity === 'warning' ? 'text-yellow-600 dark:text-yellow-400' : 
                  'text-blue-600 dark:text-blue-400'
                }">${result.severity}</span>
              </div>
              ${result.suggestion ? `<p class="text-sm mt-1">${result.suggestion}</p>` : ''}
              ${result.element ? 
                `<div class="mt-2 text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-auto">
                  ${result.element.outerHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                </div>` : 
                ''
              }
            </div>
          `).join('')}
        </div>`
      }
    </div>
  `;
};
