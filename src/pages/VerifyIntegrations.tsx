
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import IntegrationVerificationPanel from '../components/admin/IntegrationVerificationPanel';
import PageSEO from '../components/seo/PageSEO';

const VerifyIntegrationsPage: React.FC = () => {
  return (
    <AppLayout>
      <PageSEO
        title="Integration Verification | AdvisorWiz"
        description="Verify the integration between AdvisorWiz and external services"
        noIndex={true}
      />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-semibold mb-8">Integration Verification</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-medium">Verify Integration Points</h2>
            <p className="text-muted-foreground">
              Use the tools below to verify the integration between the app and external services like Supabase and Resend.
            </p>
            
            <IntegrationVerificationPanel />
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-medium mb-4">Manual Verification Steps</h2>
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">1. Authentication Flow</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Navigate to the <a href="/sign-in" className="text-teal-600 hover:underline">Sign In page</a></li>
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
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default VerifyIntegrationsPage;
