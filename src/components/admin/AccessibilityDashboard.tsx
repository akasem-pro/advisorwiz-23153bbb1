
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { runAccessibilityAudit, generateHTMLReport } from '../../utils/accessibility/accessibilityAudit';

const AccessibilityDashboard: React.FC = () => {
  const [auditResults, setAuditResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('issues');
  
  const handleRunAudit = () => {
    // Run the accessibility audit
    const results = runAccessibilityAudit();
    setAuditResults(results);
  };
  
  const handleExportReport = () => {
    if (!auditResults) return;
    
    // Generate HTML report
    const htmlContent = generateHTMLReport(auditResults);
    
    // Create a download for the report
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `accessibility-audit-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Accessibility Audit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Button onClick={handleRunAudit}>Run Audit</Button>
            <Button 
              variant="outline" 
              onClick={handleExportReport}
              disabled={!auditResults}
            >
              Export Report
            </Button>
          </div>
          
          {auditResults && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
              <TabsList>
                <TabsTrigger value="issues">Issues ({auditResults.totalIssues})</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>
              
              <TabsContent value="issues" className="space-y-4">
                {auditResults.results.length > 0 ? (
                  auditResults.results.map((issue: any, index: number) => (
                    <div key={index} className="p-4 border rounded-md">
                      <div className="font-semibold">{issue.issue}</div>
                      <div className="text-sm text-muted-foreground">{issue.suggestion}</div>
                      <div className={`mt-2 text-xs inline-block px-2 py-1 rounded ${
                        issue.severity === 'critical' ? 'bg-red-100 text-red-800' : 
                        issue.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {issue.severity}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No issues detected!</p>
                )}
              </TabsContent>
              
              <TabsContent value="summary">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-100 rounded-md text-center">
                    <div className="text-2xl font-bold">{auditResults.totalIssues}</div>
                    <div className="text-sm text-muted-foreground">Total Issues</div>
                  </div>
                  <div className="p-4 bg-red-100 rounded-md text-center">
                    <div className="text-2xl font-bold">{auditResults.criticalIssues}</div>
                    <div className="text-sm text-red-800">Critical</div>
                  </div>
                  <div className="p-4 bg-yellow-100 rounded-md text-center">
                    <div className="text-2xl font-bold">{auditResults.warningIssues}</div>
                    <div className="text-sm text-yellow-800">Warnings</div>
                  </div>
                  <div className="p-4 bg-blue-100 rounded-md text-center">
                    <div className="text-2xl font-bold">{auditResults.infoIssues}</div>
                    <div className="text-sm text-blue-800">Info</div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessibilityDashboard;
