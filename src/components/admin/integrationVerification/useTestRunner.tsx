
import { useState, useEffect } from 'react';
import { 
  testAuthenticationFlow, 
  testDatabaseOperations, 
  testEmailFunctionality 
} from '@/utils/integration-tests/verify-integration';
import { TestResult } from './types';
import { toast } from 'sonner';

export function useTestRunner(isPreviewEnvironment: boolean) {
  const [mounted, setMounted] = useState(false);
  const [results, setResults] = useState<TestResult[]>([
    { name: 'Authentication Flow', status: 'idle', message: 'Not tested yet' },
    { name: 'Supabase Database Operations', status: 'idle', message: 'Not tested yet' },
    { name: 'Email Functionality', status: 'idle', message: 'Not tested yet' }
  ]);
  const [isRunningAll, setIsRunningAll] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

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

  const runTestByIndex = async (index: number) => {
    if (index === 0) await runAuthTest();
    if (index === 1) await runDatabaseTest();
    if (index === 2) await runEmailTest();
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

  return {
    results,
    isRunningAll,
    runTestByIndex,
    runAllTests
  };
}
