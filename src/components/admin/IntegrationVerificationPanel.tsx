
import React, { useState } from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { testAuthenticationFlow, testDatabaseOperations, testEmailFunctionality } from '@/utils/integration-tests/verify-integration';

interface TestResult {
  name: string;
  status: 'idle' | 'running' | 'success' | 'failed';
  message: string;
  details?: any;
}

const IntegrationVerificationPanel: React.FC = () => {
  const [results, setResults] = useState<TestResult[]>([
    { name: 'Authentication Flow', status: 'idle', message: 'Not tested yet' },
    { name: 'Supabase Database Operations', status: 'idle', message: 'Not tested yet' },
    { name: 'Email Functionality', status: 'idle', message: 'Not tested yet' }
  ]);
  const [isRunningAll, setIsRunningAll] = useState(false);

  const updateTestResult = (index: number, result: Partial<TestResult>) => {
    setResults(prev => 
      prev.map((item, i) => i === index ? { ...item, ...result } : item)
    );
  };

  const runAuthTest = async () => {
    updateTestResult(0, { status: 'running', message: 'Testing authentication flow...' });
    try {
      const result = await testAuthenticationFlow();
      updateTestResult(0, { 
        status: result.success ? 'success' : 'failed', 
        message: result.message,
        details: result.details
      });
    } catch (error) {
      updateTestResult(0, { 
        status: 'failed', 
        message: 'Test threw an exception',
        details: error
      });
    }
  };

  const runDatabaseTest = async () => {
    updateTestResult(1, { status: 'running', message: 'Testing database operations...' });
    try {
      const result = await testDatabaseOperations();
      updateTestResult(1, { 
        status: result.success ? 'success' : 'failed', 
        message: result.message,
        details: result.details
      });
    } catch (error) {
      updateTestResult(1, { 
        status: 'failed', 
        message: 'Test threw an exception',
        details: error
      });
    }
  };

  const runEmailTest = async () => {
    updateTestResult(2, { status: 'running', message: 'Testing email functionality...' });
    try {
      const result = await testEmailFunctionality();
      updateTestResult(2, { 
        status: result.success ? 'success' : 'failed', 
        message: result.message,
        details: result.details
      });
    } catch (error) {
      updateTestResult(2, { 
        status: 'failed', 
        message: 'Test threw an exception',
        details: error
      });
    }
  };

  const runAllTests = async () => {
    setIsRunningAll(true);
    await runAuthTest();
    await runDatabaseTest();
    await runEmailTest();
    setIsRunningAll(false);
  };

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Integration Verification</CardTitle>
        <CardDescription>
          Test and verify integration points between the app and external services
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {results.map((test, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium flex items-center gap-2">
                {renderStatusIcon(test.status)}
                {test.name}
              </h3>
              <Button 
                size="sm" 
                variant={test.status === 'running' ? "outline" : "secondary"}
                onClick={() => {
                  if (index === 0) runAuthTest();
                  if (index === 1) runDatabaseTest();
                  if (index === 2) runEmailTest();
                }}
                disabled={test.status === 'running' || isRunningAll}
              >
                {test.status === 'idle' ? 'Run Test' : 
                 test.status === 'running' ? 'Running...' : 'Run Again'}
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">{test.message}</p>
            
            {test.status === 'failed' && test.details && (
              <Alert variant="destructive" className="mt-2">
                <AlertTitle>Error Details</AlertTitle>
                <AlertDescription className="text-xs overflow-auto max-h-24">
                  {JSON.stringify(test.details, null, 2)}
                </AlertDescription>
              </Alert>
            )}
          </div>
        ))}
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={runAllTests} 
          disabled={isRunningAll || results.some(r => r.status === 'running')}
        >
          {isRunningAll ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running All Tests...
            </>
          ) : (
            'Run All Tests'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IntegrationVerificationPanel;
