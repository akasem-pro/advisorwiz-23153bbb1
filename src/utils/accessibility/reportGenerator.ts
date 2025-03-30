
import { AuditSummary } from './types';

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
export const generateAccessibilityReport = (summary: AuditSummary): string => {
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
