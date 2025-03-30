
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { PanelHeader } from './PanelHeader';
import { TestItem } from './TestItem';
import { useTestRunner } from './useTestRunner';
import { IntegrationVerificationPanelProps } from './types';

const IntegrationVerificationPanel: React.FC<IntegrationVerificationPanelProps> = ({ forcePreviewMode = false }) => {
  const [mounted, setMounted] = useState(false);
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
