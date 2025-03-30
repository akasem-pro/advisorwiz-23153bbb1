import React, { useState, useEffect } from 'react';
import { runAccessibilityAudit, generateHTMLReport } from '../../utils/accessibility/accessibilityAudit';
import { Button } from '../ui/button';
import { RefreshCw, Download, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { toast } from 'sonner';

const AccessibilityDashboard: React.FC = () => {
  const [reportHtml, setReportHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastScanDate, setLastScanDate] = useState<string>('');

  const runAudit = async () => {
    setIsLoading(true);
    
    // Small delay to let the UI update
    await new Promise(resolve => setTimeout(resolve, 100));
    
    try {
      const report = generateHTMLReport();
      setReportHtml(report);
      setLastScanDate(new Date().toLocaleString());
      
      const summary = runAccessibilityAudit();
      
      if (summary.totalIssues === 0) {
        toast.success('No accessibility issues found!');
      } else {
        toast.warning(`Found ${summary.totalIssues} accessibility issues.`);
      }
    } catch (error) {
      console.error('Error running accessibility audit:', error);
      toast.error('Error running accessibility audit');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Run audit on component mount
    runAudit();
  }, []);

  const downloadReport = () => {
    const blob = new Blob([`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Accessibility Report</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          .container { max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #333; }
          .issue { margin-bottom: 15px; padding: 10px; border-left: 4px solid #ccc; }
          .critical { border-color: #f56565; background-color: #fff5f5; }
          .warning { border-color: #ed8936; background-color: #fffaf0; }
          .info { border-color: #4299e1; background-color: #ebf8ff; }
          .issue-title { font-weight: bold; margin-bottom: 5px; }
          .issue-severity { font-size: 0.8rem; color: #666; }
          .issue-suggestion { font-size: 0.9rem; margin-top: 5px; }
          .summary { display: flex; gap: 20px; margin-bottom: 20px; }
          .summary-item { padding: 15px; border-radius: 5px; flex: 1; text-align: center; }
          .critical-bg { background-color: #fff5f5; }
          .warning-bg { background-color: #fffaf0; }
          .info-bg { background-color: #ebf8ff; }
          .count { font-size: 1.5rem; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Accessibility Audit Report</h1>
          <p>Generated on ${new Date().toLocaleString()}</p>
          ${reportHtml}
        </div>
      </body>
      </html>
    `], { type: 'text/html' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `accessibility-report-${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Report downloaded successfully');
  };

  return (
    <div className="p-6 bg-white dark:bg-navy-900 rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Accessibility Dashboard</h2>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={runAudit} 
            disabled={isLoading}
            className="flex items-center"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Scanning...' : 'Run Audit'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={downloadReport}
            disabled={isLoading || !reportHtml}
            className="flex items-center"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>
      
      {lastScanDate && (
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Last scan: {lastScanDate}
        </div>
      )}
      
      <div className="border rounded-lg p-4 dark:border-gray-700">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Running accessibility audit...</p>
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: reportHtml }} />
        )}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Accessibility Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 dark:border-gray-700 flex">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Alt Text for Images</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ensure all non-decorative images have descriptive alt text.</p>
            </div>
          </div>
          <div className="border rounded-lg p-4 dark:border-gray-700 flex">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Keyboard Navigation</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Make sure all interactive elements are keyboard accessible.</p>
            </div>
          </div>
          <div className="border rounded-lg p-4 dark:border-gray-700 flex">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Color Contrast</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Maintain sufficient contrast between text and background colors.</p>
            </div>
          </div>
          <div className="border rounded-lg p-4 dark:border-gray-700 flex">
            <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Form Labels</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Associate labels with form controls using 'for' attribute or nesting.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityDashboard;
