
import { AuditResult, AuditSummary } from './types';

/**
 * Run an accessibility audit on the current page
 * @returns AuditSummary containing the results
 */
export const runAccessibilityAudit = (): AuditSummary => {
  // This is a mock implementation
  // In a real app, this would actually scan the DOM for accessibility issues
  const results: AuditResult[] = [
    {
      pass: false,
      issue: 'Images missing alt text',
      severity: 'warning',
      suggestion: 'Add alt text to all images for screen reader compatibility'
    },
    {
      pass: false,
      issue: 'Low contrast text',
      severity: 'warning',
      suggestion: 'Increase contrast between text and background colors'
    }
  ];
  
  // Count issues by severity
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
 * Generate an HTML report from accessibility audit results
 * @param summary The audit summary to generate a report from
 * @returns HTML string containing the formatted report
 */
export const generateHTMLReport = (summary: AuditSummary): string => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accessibility Audit Report</title>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; }
      h1 { color: #333; }
      .summary { display: flex; gap: 20px; margin-bottom: 20px; }
      .summary-item { padding: 15px; border-radius: 5px; width: 150px; text-align: center; }
      .critical { background-color: #ffdddd; }
      .warning { background-color: #ffffdd; }
      .info { background-color: #ddffff; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
      th { background-color: #f2f2f2; }
      .severity-badge {
        padding: 4px 8px;
        border-radius: 4px;
        display: inline-block;
      }
      .severity-critical { background-color: #ffdddd; }
      .severity-warning { background-color: #ffffdd; }
      .severity-info { background-color: #ddffff; }
    </style>
  </head>
  <body>
    <h1>Accessibility Audit Report</h1>
    <p>Generated on ${new Date().toLocaleString()}</p>
    
    <div class="summary">
      <div class="summary-item">
        <h3>Total Issues</h3>
        <p>${summary.totalIssues}</p>
      </div>
      <div class="summary-item critical">
        <h3>Critical Issues</h3>
        <p>${summary.criticalIssues}</p>
      </div>
      <div class="summary-item warning">
        <h3>Warnings</h3>
        <p>${summary.warningIssues}</p>
      </div>
      <div class="summary-item info">
        <h3>Info</h3>
        <p>${summary.infoIssues}</p>
      </div>
    </div>
    
    <h2>Detailed Results</h2>
    ${summary.results.length > 0 ? `
    <table>
      <thead>
        <tr>
          <th>Issue</th>
          <th>Severity</th>
          <th>Suggestion</th>
        </tr>
      </thead>
      <tbody>
        ${summary.results.map(result => `
          <tr>
            <td>${result.issue}</td>
            <td>
              <span class="severity-badge severity-${result.severity}">
                ${result.severity}
              </span>
            </td>
            <td>${result.suggestion || 'No suggestion provided'}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>` : '<p>No issues detected!</p>'}
  </body>
  </html>
  `;
};
