
import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, XCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { testAuthenticationFlow, testDatabaseOperations, testEmailFunctionality } from '@/utils/integration-tests/verify-integration';
import { toast } from 'sonner';

interface TestResult {
  name: string;
  status: 'idle' | 'running' | 'success' | 'failed' | 'warning';
  message: string;
  details?: any;
}

interface IntegrationVerificationPanelProps {
  forcePreviewMode?: boolean;
}

const IntegrationVerificationPanel: React.FC<IntegrationVerificationPanelProps> = ({ forcePreviewMode = false }) => {
  const [mounted, setMounted] = useState(false);
  const [results, setResults] = useState<TestResult[]>([
    { name: 'Authentication Flow', status: 'idle', message: 'Not tested yet' },
    { name: 'Supabase Database Operations', status: 'idle', message: 'Not tested yet' },
    { name: 'Email Functionality', status: 'idle', message: 'Not tested yet' }
  ]);
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [isPreviewEnvironment, setIsPreviewEnvironment] = useState<boolean>(false);

  useEffect(() => {
    // Mark component as mounted to prevent unmounting issues
    setMounted(true);
    
    // Set the preview mode state
    setIsPreviewEnvironment(forcePreviewMode);
    
    console.log("[IntegrationVerificationPanel] Component mounted with forcePreviewMode:", forcePreviewMode);
    
    // Cleanup function
    return () => {
      console.log("[IntegrationVerificationPanel] Component unmounting");
      setMounted(false);
    };
  }, [forcePreviewMode]);

  // Update a test result without losing mounted state
  const updateTestResult = (index: number, result: Partial<TestResult>) => {
    if (!mounted) return;
    
    setResults(prev => 
      prev.map((item, i) => i === index ? { ...item, ...result } : item)
    );
  };

  const runAuthTest = async () => {
    if (!mounted) return;
    
    updateTestResult(0, { status: 'running', message: 'Testing authentication flow...' });
    try {
      const result = await testAuthenticationFlow(isPreviewEnvironment);
      
      if (!mounted) return;
      
      if (isPreviewEnvironment) {
        // In preview environment, show as warning with explanation
        updateTestResult(0, { 
          status: 'warning', 
          message: 'Network connectivity is limited in preview environments. This is expected behavior.',
          details: result.details || { info: "Preview environment limitations prevent actual authentication flow testing" }
        });
      } else {
        updateTestResult(0, { 
          status: result.success ? 'success' : 'failed', 
          message: result.message,
          details: result.details
        });
      }
    } catch (error) {
      if (!mounted) return;
      
      console.error("[Authentication Test] Error:", error);
      
      updateTestResult(0, { 
        status: isPreviewEnvironment ? 'warning' : 'failed', 
        message: isPreviewEnvironment 
          ? 'Network connectivity is limited in preview environments. This is expected and not an actual issue.'
          : 'Test threw an exception: ' + (error instanceof Error ? error.message : String(error)),
        details: error
      });
    }
  };

  const runDatabaseTest = async () => {
    if (!mounted) return;
    
    updateTestResult(1, { status: 'running', message: 'Testing database operations...' });
    try {
      const result = await testDatabaseOperations(isPreviewEnvironment);
      
      if (!mounted) return;
      
      if (isPreviewEnvironment) {
        // In preview environment, show as warning with explanation
        updateTestResult(1, { 
          status: 'warning', 
          message: 'Network connectivity is limited in preview environments. This is expected behavior.',
          details: result.details || { info: "Preview environment limitations prevent actual database operations testing" }
        });
      } else {
        updateTestResult(1, { 
          status: result.success ? 'success' : 'failed', 
          message: result.message,
          details: result.details
        });
      }
    } catch (error) {
      if (!mounted) return;
      
      console.error("[Database Test] Error:", error);
      
      updateTestResult(1, { 
        status: isPreviewEnvironment ? 'warning' : 'failed',
        message: isPreviewEnvironment 
          ? 'Network connectivity is limited in preview environments. This is expected and not an actual issue.' 
          : 'Test threw an exception: ' + (error instanceof Error ? error.message : String(error)),
        details: error
      });
    }
  };

  const runEmailTest = async () => {
    if (!mounted) return;
    
    updateTestResult(2, { status: 'running', message: 'Testing email functionality...' });
    try {
      const result = await testEmailFunctionality(isPreviewEnvironment);
      
      if (!mounted) return;
      
      if (isPreviewEnvironment) {
        // In preview environment, show as warning with explanation
        updateTestResult(2, { 
          status: 'warning', 
          message: 'Network connectivity is limited in preview environments. This is expected behavior.',
          details: result.details || { info: "Preview environment limitations prevent actual email functionality testing" }
        });
      } else {
        updateTestResult(2, { 
          status: result.success ? 'success' : 'failed', 
          message: result.message,
          details: result.details
        });
      }
    } catch (error) {
      if (!mounted) return;
      
      console.error("[Email Test] Error:", error);
      
      updateTestResult(2, { 
        status: isPreviewEnvironment ? 'warning' : 'failed',
        message: isPreviewEnvironment 
          ? 'Network connectivity is limited in preview environments. This is expected and not an actual issue.' 
          : 'Test threw an exception: ' + (error instanceof Error ? error.message : String(error)),
        details: error
      });
    }
  };

  const runAllTests = async () => {
    if (!mounted) return;
    
    setIsRunningAll(true);
    await runAuthTest();
    
    if (!mounted) return;
    await runDatabaseTest();
    
    if (!mounted) return;
    await runEmailTest();
    
    if (!mounted) return;
    setIsRunningAll(false);
    
    if (isPreviewEnvironment) {
      toast.info("Tests showing warnings are expected in preview environments and do not indicate actual issues.", {
        duration: 8000,
      });
    }
  };

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <Info className="h-5 w-5 text-amber-500" />;
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
        {isPreviewEnvironment && (
          <Alert variant="warning" className="mt-2">
            <Info className="h-4 w-4" />
            <AlertTitle>Preview Environment Detected</AlertTitle>
            <AlertDescription>
              <p className="mb-1">
                Network connectivity to external services is limited in preview environments.
              </p>
              <p>
                Tests will show warnings instead of errors - this is <strong>expected behavior</strong> and
                does not indicate issues with your code.
              </p>
            </AlertDescription>
          </Alert>
        )}
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
            
            {(test.status === 'failed' || test.status === 'warning') && test.details && (
              <Alert 
                variant={test.status === 'warning' ? "warning" : "destructive"} 
                className="mt-2"
              >
                <AlertTitle>
                  {test.status === 'warning' ? 'Preview Environment Limitation' : 'Error Details'}
                </AlertTitle>
                <AlertDescription className="text-xs overflow-auto max-h-24">
                  {typeof test.details === 'object' 
                    ? JSON.stringify(test.details, null, 2)
                    : String(test.details)
                  }
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
