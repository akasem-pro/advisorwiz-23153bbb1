
import React, { useState } from 'react';
import { 
  runAccessibilityAudit, 
  generateHTMLReport 
} from '../../utils/accessibility/accessibilityAudit';
import { Button } from '../ui/button';
import { 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle, 
  FileText,
  Download,
  RefreshCcw
} from 'lucide-react';
import { AuditSummary } from '../../utils/accessibility/types';
import { toast } from 'sonner';

const AccessibilityAuditDashboard: React.FC = () => {
  const [auditSummary, setAuditSummary] = useState<AuditSummary | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [lastRunTime, setLastRunTime] = useState<Date | null>(null);

  const runAudit = async () => {
    setIsRunning(true);
    
    try {
      // Short delay to ensure UI updates before potentially heavy audit operations
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Run the audit
      const summary = runAccessibilityAudit();
      setAuditSummary(summary);
      setLastRunTime(new Date());
      
      // Show toast notification based on results
      if (summary.totalIssues === 0) {
        toast.success('No accessibility issues found!');
      } else if (summary.criticalIssues > 0) {
        toast.error(`Found ${summary.criticalIssues} critical accessibility issues.`);
      } else if (summary.warningIssues > 0) {
        toast.warning(`Found ${summary.warningIssues} accessibility warnings.`);
      } else {
        toast.info(`Found ${summary.infoIssues} accessibility suggestions.`);
      }
    } catch (error) {
      console.error('Error running accessibility audit:', error);
      toast.error('Failed to complete accessibility audit');
    } finally {
      setIsRunning(false);
    }
  };

  const downloadReport = () => {
    if (!auditSummary) return;
    
    try {
      const htmlReport = generateHTMLReport(auditSummary);
      
      // Create download link
      const blob = new Blob([htmlReport], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `accessibility-audit-${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Accessibility report downloaded');
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate accessibility report');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Accessibility Audit</h2>
          {lastRunTime && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last run: {lastRunTime.toLocaleString()}
            </p>
          )}
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button 
            onClick={runAudit} 
            disabled={isRunning}
            variant="outline"
            className="flex items-center"
          >
            <RefreshCcw className={`mr-2 h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
            {isRunning ? 'Running...' : 'Run Audit'}
          </Button>
          <Button 
            onClick={downloadReport} 
            disabled={!auditSummary || isRunning}
            variant="outline"
            className="flex items-center"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      {isRunning ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div>
          <p className="mt-4 text-gray-500">Running accessibility audit...</p>
        </div>
      ) : auditSummary ? (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
              <div className="flex justify-center mb-2">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-xl font-bold">{auditSummary.totalIssues}</p>
              <p className="text-sm">Total Issues</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 text-center">
              <div className="flex justify-center mb-2">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
              <p className="text-xl font-bold">{auditSummary.criticalIssues}</p>
              <p className="text-sm">Critical Issues</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 text-center">
              <div className="flex justify-center mb-2">
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
              <p className="text-xl font-bold">{auditSummary.warningIssues}</p>
              <p className="text-sm">Warnings</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
              <div className="flex justify-center mb-2">
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-xl font-bold">{auditSummary.infoIssues}</p>
              <p className="text-sm">Information</p>
            </div>
          </div>

          {/* Results Table */}
          {auditSummary.results.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left">Issue</th>
                    <th className="px-4 py-2 text-left">Severity</th>
                    <th className="px-4 py-2 text-left">Suggestion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {auditSummary.results.map((result, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-3">{result.issue}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          result.severity === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 
                          result.severity === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {result.severity}
                        </span>
                      </td>
                      <td className="px-4 py-3">{result.suggestion || 'No suggestion provided'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-semibold text-green-700 dark:text-green-300">
                No accessibility issues detected!
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                Your application is following accessibility best practices.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Run an accessibility audit to check your application for WCAG compliance issues.
          </p>
        </div>
      )}

      {/* Best Practices */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Accessibility Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">Images & Media</h4>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>Use alt text for all non-decorative images</li>
              <li>Provide captions and transcripts for audio/video</li>
              <li>Avoid auto-playing media with sound</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">Navigation & Focus</h4>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>Ensure all interactive elements are keyboard accessible</li>
              <li>Provide visible focus indicators</li>
              <li>Implement skip links for screen readers</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">Forms & Inputs</h4>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>Label all form controls properly</li>
              <li>Group related form elements with fieldsets</li>
              <li>Provide error messages at the form control level</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">Content & Structure</h4>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>Use proper heading hierarchy (h1-h6)</li>
              <li>Ensure sufficient color contrast (4.5:1 minimum ratio)</li>
              <li>Do not rely solely on color to convey information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityAuditDashboard;
