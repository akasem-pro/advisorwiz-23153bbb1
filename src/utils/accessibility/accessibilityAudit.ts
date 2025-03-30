
import { AuditResult, AuditSummary } from './types';
import { 
  checkImagesForAltText,
  checkHeadingHierarchy,
  checkFormLabels,
  checkColorContrast,
  checkKeyboardNavigation,
  checkARIAUsage
} from './audits';
import { generateAccessibilityReport, printAccessibilityReport } from './reportGenerator';

/**
 * Accessibility Audit Tool
 * 
 * This utility helps identify accessibility issues on the page
 * and provides suggestions for improvements.
 */

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
 * Generate HTML report from audit results
 */
export const generateHTMLReport = (): string => {
  const summary = runAccessibilityAudit();
  return generateAccessibilityReport(summary);
};

// Re-export for compatibility with existing code
export { printAccessibilityReport, generateAccessibilityReport };
