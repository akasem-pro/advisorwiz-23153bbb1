
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface SecurityCheck {
  id: string;
  name: string;
  status: 'passed' | 'warning' | 'failed';
  severity: 'low' | 'medium' | 'high';
  description: string;
  recommendation?: string;
}

const SecurityDashboard: React.FC = () => {
  const [securityChecks, setSecurityChecks] = useState<SecurityCheck[]>([
    {
      id: 'auth-1',
      name: 'Authentication Security',
      status: 'passed',
      severity: 'high',
      description: 'Authentication mechanisms are properly implemented.',
      recommendation: 'Continue monitoring for new vulnerabilities.'
    },
    {
      id: 'data-1',
      name: 'Data Encryption',
      status: 'warning',
      severity: 'high',
      description: 'Some data is not being encrypted in transit.',
      recommendation: 'Implement TLS for all API endpoints.'
    },
    {
      id: 'input-1',
      name: 'Input Validation',
      status: 'warning',
      severity: 'medium',
      description: 'Not all user inputs are properly validated.',
      recommendation: 'Add input validation to all form fields.'
    }
  ]);
  
  const [activeTab, setActiveTab] = useState('all');
  
  const runSecurityScan = () => {
    // Mock implementation - would actually run security checks
    console.log('Running security scan...');
    // Update with new mock results
    setSecurityChecks(prevChecks => [
      ...prevChecks,
      {
        id: 'csrf-1',
        name: 'CSRF Protection',
        status: 'passed',
        severity: 'medium',
        description: 'CSRF tokens are properly implemented.',
      }
    ]);
  };
  
  const filteredChecks = activeTab === 'all' 
    ? securityChecks 
    : securityChecks.filter(check => check.status === activeTab);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Security Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={runSecurityScan} className="mb-6">Run Security Scan</Button>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All ({securityChecks.length})</TabsTrigger>
              <TabsTrigger value="passed">Passed ({securityChecks.filter(c => c.status === 'passed').length})</TabsTrigger>
              <TabsTrigger value="warning">Warnings ({securityChecks.filter(c => c.status === 'warning').length})</TabsTrigger>
              <TabsTrigger value="failed">Failed ({securityChecks.filter(c => c.status === 'failed').length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="space-y-4 mt-4">
              {filteredChecks.length === 0 ? (
                <p>No security checks to display.</p>
              ) : (
                filteredChecks.map(check => (
                  <Alert 
                    key={check.id} 
                    variant={
                      check.status === 'passed' ? 'default' : 
                      check.status === 'warning' ? 'warning' : 'destructive'
                    }
                    className="flex items-start"
                  >
                    <div className="mr-2 mt-1">
                      {check.status === 'passed' && <CheckCircle className="h-5 w-5" />}
                      {check.status === 'warning' && <AlertTriangle className="h-5 w-5" />}
                      {check.status === 'failed' && <XCircle className="h-5 w-5" />}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <AlertTitle className="mr-2">{check.name}</AlertTitle>
                        <span className={`text-xs px-2 py-1 rounded ${
                          check.severity === 'low' ? 'bg-blue-100 text-blue-800' : 
                          check.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {check.severity}
                        </span>
                      </div>
                      <AlertDescription>
                        <p>{check.description}</p>
                        {check.recommendation && (
                          <p className="mt-1 text-sm font-medium">
                            Recommendation: {check.recommendation}
                          </p>
                        )}
                      </AlertDescription>
                    </div>
                  </Alert>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityDashboard;
