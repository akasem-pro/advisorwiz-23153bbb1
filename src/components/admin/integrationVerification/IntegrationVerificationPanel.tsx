
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { PanelHeader } from './PanelHeader';
import { TestItem } from './TestItem';
import { useTestRunner } from './useTestRunner';
import { IntegrationVerificationPanelProps } from './types';
import { PRODUCTION_DOMAINS } from '@/utils/mockAuthUtils';

const IntegrationVerificationPanel: React.FC<IntegrationVerificationPanelProps> = ({ forcePreviewMode = false }) => {
  const [mounted, setMounted] = useState(false);
  const [isPreviewEnvironment, setIsPreviewEnvironment] = useState<boolean>(forcePreviewMode);

  useEffect(() => {
    // Mark component as mounted to prevent unmounting issues
    setMounted(true);
    
    if (!forcePreviewMode) {
      // Double-check environment detection
      const hostname = window.location.hostname;
      const isProduction = PRODUCTION_DOMAINS.some(domain => 
        hostname === domain || hostname.endsWith('.' + domain)
      ) || hostname.endsWith('.app') || !hostname.includes('.');
      const isPreview = !isProduction && (hostname.includes('preview') || hostname.includes('lovableproject'));
      
      console.log('[IntegrationVerificationPanel] Environment detection:', { 
        hostname, 
        isProduction,
        isPreview,
        forcePreviewMode,
        productionDomains: PRODUCTION_DOMAINS
      });
      
      setIsPreviewEnvironment(isPreview);
    } else {
      // Use the forced preview mode
      setIsPreviewEnvironment(true);
      console.log('[IntegrationVerificationPanel] Using forced preview mode:', forcePreviewMode);
    }
    
    // Cleanup function
    return () => {
      console.log("[IntegrationVerificationPanel] Component unmounting");
      setMounted(false);
    };
  }, [forcePreviewMode]);

  const { results, isRunningAll, runTestByIndex, runAllTests } = useTestRunner(isPreviewEnvironment);

  return (
    <Card className="shadow-md">
      <PanelHeader isPreviewEnvironment={isPreviewEnvironment} />
      
      <CardContent className="space-y-4">
        {results.map((test, index) => (
          <TestItem 
            key={index}
            test={test}
            index={index}
            runTest={runTestByIndex}
            isRunningAll={isRunningAll}
          />
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
