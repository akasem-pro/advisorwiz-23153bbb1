
import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  testAuthenticationFlow, 
  testDatabaseOperations, 
  testEmailFunctionality 
} from '@/utils/integration-tests/verify-integration';
import { TestResult } from './types';
import { toast } from 'sonner';
import { PRODUCTION_DOMAINS } from '@/utils/mockAuthUtils';

export function useTestRunner(forcePreviewMode: boolean) {
  const [results, setResults] = useState<TestResult[]>([
    { name: 'Authentication Flow', status: 'idle', message: 'Not tested yet' },
    { name: 'Supabase Database Operations', status: 'idle', message: 'Not tested yet' },
    { name: 'Email Functionality', status: 'idle', message: 'Not tested yet' }
  ]);
  const [isRunningAll, setIsRunningAll] = useState(false);
  const isMounted = useRef(true);
  
  useEffect(() => {
    // Log environment detection information at component mount
    const hostname = window.location.hostname;
    const isHostnameInProductionList = PRODUCTION_DOMAINS.some(domain => 
      hostname === domain || hostname.endsWith('.' + domain)
    );
    
    console.log('[useTestRunner] Environment detection debug:', {
      hostname,
      url: window.location.href,
      forcePreviewMode,
      isHostnameInProductionList,
      productionDomains: PRODUCTION_DOMAINS
    });
    
    return () => {
      isMounted.current = false;
    };
  }, [forcePreviewMode]);

  const updateTestResult = useCallback((index: number, result: Partial<TestResult>) => {
    if (!isMounted.current) return;
    
    setResults(prev => 
      prev.map((item, i) => i === index ? { ...item, ...result } : item)
    );
  }, []);

  // Enhanced error handling for test functions
  const safeExecuteTest = useCallback(async (
    testFunction: (isPreviewMode: boolean) => Promise<any>,
    index: number,
    testName: string,
    isPreview: boolean
  ) => {
    if (!isMounted.current) return;
    
    updateTestResult(index, { 
      status: 'running', 
      message: `Testing ${testName.toLowerCase()}...` 
    });
    
    try {
      // Add timeout to prevent hanging tests
      const timeoutPromise = new Promise((_, reject) => {
        const timer = setTimeout(() => {
          reject(new Error('Test timed out after 10 seconds'));
        }, 10000);
        return () => clearTimeout(timer);
      });
      
      // Race the actual test against the timeout
      const result = await Promise.race([
        testFunction(isPreview),
        timeoutPromise
      ]) as any;
      
      if (!isMounted.current) return;
      
      // If in preview mode, always return warning status
      if (isPreview) {
        updateTestResult(index, { 
          status: 'warning', 
          message: 'Network connectivity is limited in preview environments. This is expected behavior.',
          details: result?.details || { info: `Preview environment limitations prevent actual ${testName.toLowerCase()} testing` }
        });
      } else {
        updateTestResult(index, { 
          status: result?.success ? 'success' : 'failed', 
          message: result?.message || `Unknown ${result?.success ? 'success' : 'error'} occurred`,
          details: result?.details
        });
      }
    } catch (error: any) {
      if (!isMounted.current) return;
      
      console.error(`[${testName} Test] Error:`, error);
      
      updateTestResult(index, { 
        status: isPreview ? 'warning' : 'failed', 
        message: isPreview 
          ? 'Network connectivity is limited in preview environments. This is expected and not an actual issue.'
          : `Test error: ${error instanceof Error ? error.message : String(error)}`,
        details: error
      });
    }
  }, [updateTestResult]);

  const runAuthTest = useCallback(async () => {
    await safeExecuteTest(testAuthenticationFlow, 0, 'Authentication Flow', forcePreviewMode);
  }, [safeExecuteTest, forcePreviewMode]);

  const runDatabaseTest = useCallback(async () => {
    await safeExecuteTest(testDatabaseOperations, 1, 'Database Operations', forcePreviewMode);
  }, [safeExecuteTest, forcePreviewMode]);

  const runEmailTest = useCallback(async () => {
    await safeExecuteTest(testEmailFunctionality, 2, 'Email Functionality', forcePreviewMode);
  }, [safeExecuteTest, forcePreviewMode]);

  const runTestByIndex = useCallback(async (index: number) => {
    if (!isMounted.current) return;
    
    if (index === 0) await runAuthTest();
    if (index === 1) await runDatabaseTest();
    if (index === 2) await runEmailTest();
  }, [runAuthTest, runDatabaseTest, runEmailTest]);

  const runAllTests = useCallback(async () => {
    if (!isMounted.current) return;
    
    setIsRunningAll(true);
    await runAuthTest();
    
    if (!isMounted.current) return;
    await runDatabaseTest();
    
    if (!isMounted.current) return;
    await runEmailTest();
    
    if (!isMounted.current) return;
    setIsRunningAll(false);
    
    if (forcePreviewMode && isMounted.current) {
      toast.info("Tests showing warnings are expected in preview environments and do not indicate actual issues.", {
        duration: 8000,
      });
    }
  }, [runAuthTest, runDatabaseTest, runEmailTest, forcePreviewMode]);

  return {
    results,
    isRunningAll,
    runTestByIndex,
    runAllTests
  };
}
