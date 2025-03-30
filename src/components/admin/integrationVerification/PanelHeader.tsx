
import React from 'react';
import { Info } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface PanelHeaderProps {
  isPreviewEnvironment: boolean;
}

export function PanelHeader({ isPreviewEnvironment }: PanelHeaderProps) {
  return (
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
  );
}
