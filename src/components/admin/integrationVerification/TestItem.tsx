
import React from 'react';
import { Loader2, CheckCircle2, XCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { TestItemProps } from './types';

export function TestItem({ test, index, runTest, isRunningAll }: TestItemProps) {
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
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium flex items-center gap-2">
          {renderStatusIcon(test.status)}
          {test.name}
        </h3>
        <Button 
          size="sm" 
          variant={test.status === 'running' ? "outline" : "secondary"}
          onClick={() => runTest(index)}
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
  );
}
