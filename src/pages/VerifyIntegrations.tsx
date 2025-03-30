
import React, { useState, useEffect } from 'react';
import { IntegrationVerificationPanel } from '../components/admin/integrationVerification';
import PageSEO from '../components/seo/PageSEO';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info, AlertTriangle } from 'lucide-react';

const VerifyIntegrationsPage: React.FC = () => {
  const [isPreviewEnvironment, setIsPreviewEnvironment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // Mark component as mounted to prevent state updates after unmount
    setIsMounted(true);
    
    // Determine environment type with improved domain detection
    const checkEnvironment = () => {
      try {
        // Enhanced check to accurately detect preview vs production environments
        const hostname = window.location.hostname;
        
        // Check for preview/test domains
        const isPreview = hostname.includes('preview') ||
          hostname.includes('lovableproject') ||
          hostname.includes('localhost') ||
          hostname.includes('lovable.app');
          
        if (isMounted) {
          console.log("[VerifyIntegrations] Environment detection:", { 
            hostname, 
            isPreview,
            url: window.location.href
          });
          
          setIsPreviewEnvironment(isPreview);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("[VerifyIntegrations] Error detecting environment:", error);
        if (isMounted) {
          setIsPreviewEnvironment(true); // Fallback to preview mode on error
          setIsLoading(false);
        }
      }
    };
    
    checkEnvironment();
    
    // Cleanup function
    return () => {
      console.log("[VerifyIntegrations] Component unmounting");
      setIsMounted(false);
    };
  }, []);
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-40">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-teal-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <PageSEO
        title="Integration Verification | AdvisorWiz"
        description="Verify the integration between AdvisorWiz and external services"
        noIndex={true}
      />
      <h1 className="text-3xl font-semibold mb-4">Integration Verification</h1>
      
      {isPreviewEnvironment ? (
        <Alert variant="warning" className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Preview Environment Detected</AlertTitle>
          <AlertDescription>
            <p className="mb-1">
              This verification page is running in a preview environment with limited network connectivity.
            </p>
            <p className="mb-1">
              Tests will show <strong>warnings</strong> rather than failures or successes. This is 
              <strong> expected behavior</strong> and does not indicate issues with your code.
            </p>
            <p>
              In a production environment, these tests would connect to actual services and provide 
              accurate results about your integrations.
            </p>
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant="default" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Production Environment</AlertTitle>
          <AlertDescription>
            <p className="mb-1">
              This verification page is running in a production environment. 
              All tests will attempt to connect to actual services.
            </p>
            <p>
              Note: Test credentials and operations are used, but they will interact with real services.
            </p>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Verify Integration Points</h2>
          <p className="text-muted-foreground">
            Use the tools below to verify the integration between the app and external services like Supabase and Resend.
          </p>
          
          <IntegrationVerificationPanel forcePreviewMode={isPreviewEnvironment} />
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-medium mb-4">Manual Verification Steps</h2>
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">1. Authentication Flow</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Navigate to the <a href="/signin" className="text-teal-600 hover:underline">Sign In page</a></li>
                <li>Test both sign-in and sign-up flows</li>
                <li>Verify that after signing in, you are redirected appropriately</li>
                <li>Test the sign-out functionality from the user menu</li>
              </ul>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">2. Database Operations</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Create or update your profile information</li>
                <li>Verify that data is saved and retrieved correctly</li>
                <li>Check that Row Level Security (RLS) is working by attempting to access data you shouldn't have access to</li>
              </ul>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">3. Email Functionality</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Navigate to the <a href="/contact" className="text-teal-600 hover:underline">Contact page</a></li>
                <li>Submit the contact form with test data</li>
                <li>Verify that you receive a success message</li>
                <li>Check your email for the confirmation message</li>
              </ul>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">4. Check Edge Function Logs</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Go to the Supabase Dashboard</li>
                <li>Navigate to Edge Functions and select the function you want to check</li>
                <li>Review the logs for any errors or unexpected behavior</li>
                <li>Verify that the function is being invoked correctly</li>
              </ul>
            </div>
            
            {isPreviewEnvironment && (
              <div className="border border-amber-200 bg-amber-50 dark:bg-amber-950/20 rounded-md p-4">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4 text-amber-500" />
                  Preview Environment Note
                </h3>
                <p className="text-sm mb-2">
                  In preview environments like this one, external service connections may be restricted. Here's what to expect:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Tests showing warnings are <strong>expected</strong> and don't indicate code issues</li>
                  <li>Authentication may not connect to the actual Supabase backend</li>
                  <li>Database operations might be limited or mocked</li>
                  <li>Edge function calls like email sending may be blocked</li>
                  <li>These tests will function correctly in a production environment</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyIntegrationsPage;
