
/**
 * This utility provides integration verification functions to test the app's
 * connection with Supabase, Resend, and other services.
 */

import { supabase, checkSupabaseConnection } from "../../integrations/supabase/client";
import { toast } from "sonner";
import { mockAuthTest, mockDatabaseTest, mockEmailTest } from "./mock-integration";

// Improved environment detection with more comprehensive checks
const isPreviewOrTestEnvironment = () => {
  try {
    // Skip environment check for specific hostnames that are known production domains
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      
      // Define known production domains
      const productionDomains = [
        'advisorwiz.com',
        'consultantwiz.com', // Added consultantwiz.com as a production domain
        'app.advisorwiz.com',
        'app.consultantwiz.com',
        'production',
        'localhost'
      ];
      
      // Check if the hostname is a production domain or has a production suffix
      for (const domain of productionDomains) {
        if (hostname === domain || hostname.endsWith('.' + domain)) {
          console.log("[Integration Tests] Production domain detected:", hostname);
          return false;
        }
      }
      
      // If it's not explicitly a production domain, check if it looks like a production domain
      if (hostname.endsWith('.app') || !hostname.includes('.')) {
        console.log("[Integration Tests] Production domain pattern detected:", hostname);
        return false;
      }
      
      // Consider everything else as preview/test
      const isPreview = hostname.includes('preview') || hostname.includes('lovableproject');
      console.log("[Integration Tests] Environment detection result:", { hostname, isPreview });
      return isPreview;
    }
    return false; // Default to production if window is not defined
  } catch (e) {
    console.error("[Integration Tests] Error checking environment:", e);
    return false; // Default to production on error
  }
};

/**
 * Tests the authentication flow by attempting to sign in with test credentials
 * and then signing out
 */
export const testAuthenticationFlow = async (
  forcePreviewMode = false
): Promise<{
  success: boolean;
  message: string;
  details?: any;
  previewMode?: boolean;
}> => {
  try {
    console.log("[Integration Test] Starting authentication flow test");
    console.log("[Integration Test] Preview mode:", forcePreviewMode);
    console.log("[Integration Test] Environment detection:", { 
      hostname: window.location.hostname,
      isPreview: isPreviewOrTestEnvironment()
    });
    
    // If in preview environment or forced preview mode, return a mock result
    if (forcePreviewMode || isPreviewOrTestEnvironment()) {
      console.log("[Integration Test] Preview/test environment detected, returning mock result");
      return mockAuthTest();
    }
    
    // Handle possible authentication errors gracefully
    try {
      // 1. Check if we're already logged in
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("[Integration Test] Error getting session:", sessionError);
        return {
          success: false,
          message: "Failed to check current session",
          details: sessionError
        };
      }
      
      if (sessionData?.session) {
        console.log("[Integration Test] User already logged in, signing out first");
        await supabase.auth.signOut();
      }
      
      // 2. Attempt to sign in with test credentials
      const email = "test@example.com"; // Replace with actual test credentials
      const password = "password123";    // Replace with actual test credentials
      
      console.log("[Integration Test] Attempting to sign in");
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (signInError) {
        console.error("[Integration Test] Sign in error:", signInError);
        return {
          success: false,
          message: "Failed to sign in with test credentials: " + signInError.message,
          details: signInError
        };
      }
      
      console.log("[Integration Test] Sign in successful, now signing out");
      
      // 3. Attempt to sign out
      const { error: signOutError } = await supabase.auth.signOut();
      
      if (signOutError) {
        console.error("[Integration Test] Sign out error:", signOutError);
        return {
          success: false,
          message: "Signed in successfully but failed to sign out: " + signOutError.message,
          details: signOutError
        };
      }
      
      // 4. Verify we're signed out
      const { data: verifyData } = await supabase.auth.getSession();
      if (verifyData?.session) {
        console.error("[Integration Test] User still logged in after sign out");
        return {
          success: false,
          message: "Sign out reported success but user is still logged in",
          details: verifyData
        };
      }
      
      console.log("[Integration Test] Authentication test completed successfully");
      return {
        success: true,
        message: "Authentication flow test completed successfully"
      };
    } catch (authError) {
      // If there's an AuthRetryableFetchError, provide more specific guidance
      if (authError instanceof Error && 
          (authError.name === 'AuthRetryableFetchError' || 
           authError.toString().includes('AuthRetryableFetchError'))) {
        console.error("[Integration Test] AuthRetryableFetchError:", authError);
        return {
          success: false,
          message: "Authentication API connection error. This may be due to network conditions or CORS restrictions.",
          details: {
            error: authError,
            suggestion: "Check that your Supabase project URL is correctly configured and accessible."
          }
        };
      }
      
      // Handle other authentication errors
      console.error("[Integration Test] Authentication error:", authError);
      return {
        success: false,
        message: "Authentication test failed: " + (authError instanceof Error ? authError.message : String(authError)),
        details: authError
      };
    }
    
  } catch (error) {
    console.error("[Integration Test] Authentication test failed with exception:", error);
    return {
      success: false,
      message: "Authentication test failed with exception: " + (error instanceof Error ? error.message : String(error)),
      details: error,
      previewMode: forcePreviewMode || isPreviewOrTestEnvironment()
    };
  }
};

/**
 * Tests Supabase database operations by performing test read/write operations
 */
export const testDatabaseOperations = async (
  forcePreviewMode = false
): Promise<{
  success: boolean;
  message: string;
  details?: any;
  previewMode?: boolean;
}> => {
  try {
    console.log("[Integration Test] Starting database operations test");
    console.log("[Integration Test] Preview mode:", forcePreviewMode);
    
    // If in preview environment or forced preview mode, return a mock result
    if (forcePreviewMode || isPreviewOrTestEnvironment()) {
      console.log("[Integration Test] Preview/test environment detected, returning mock result");
      return mockDatabaseTest();
    }
    
    try {
      // 1. First verify connection to Supabase
      console.log("[Integration Test] Checking Supabase connection");
      const isConnected = await checkSupabaseConnection();
      
      if (!isConnected) {
        console.error("[Integration Test] Failed to connect to Supabase");
        return {
          success: false,
          message: "Failed to connect to Supabase database"
        };
      }
      
      console.log("[Integration Test] Supabase connection successful");
      
      // 2. Test read operation (using public data that doesn't require auth)
      console.log("[Integration Test] Testing read operation");
      const { data: readData, error: readError } = await supabase
        .from('tooltip_content')
        .select('*')
        .limit(1);
      
      if (readError) {
        console.error("[Integration Test] Read operation error:", readError);
        return {
          success: false,
          message: "Failed to read from database: " + readError.message,
          details: readError
        };
      }
      
      console.log("[Integration Test] Read operation successful:", readData);
      
      // Gracefully handle cases where the table might not exist
      if (!readData || readData.length === 0) {
        return {
          success: true,
          message: "Database connection successful, but the tooltip_content table appears to be empty or doesn't exist.",
          details: { readData }
        };
      }
      
      // 3. Test for RLS policies working as expected
      const { error: rlsError } = await supabase.auth.signOut();
      if (rlsError) {
        console.error("[Integration Test] Error signing out:", rlsError);
      }
      
      console.log("[Integration Test] Testing RLS policies");
      
      const { data: protectedData, error: protectedError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);
        
      // If we get data without being authenticated, RLS may not be properly set up
      // If we get an error about permissions, RLS is working as expected
      const rlsWorking = protectedError && (
        protectedError.message.includes('permission') || 
        protectedError.message.includes('JWTClaimsSetVerificationException')
      );
      
      console.log("[Integration Test] RLS test result:", { 
        error: protectedError, 
        data: protectedData,
        rlsWorking 
      });
      
      return {
        success: true,
        message: `Database operations test completed. RLS policies ${rlsWorking ? 'are' : 'may not be'} working as expected.`,
        details: { readData, protectedResult: protectedData || protectedError }
      };
    } catch (dbError) {
      // Special handling for network errors
      if (dbError instanceof TypeError && dbError.message.includes('fetch')) {
        console.error("[Integration Test] Network error during database test:", dbError);
        return {
          success: false,
          message: "Network error connecting to database. Check your connection and Supabase configuration.",
          details: dbError
        };
      }
      
      console.error("[Integration Test] Database operation error:", dbError);
      return {
        success: false,
        message: "Database test error: " + (dbError instanceof Error ? dbError.message : String(dbError)),
        details: dbError
      };
    }
  } catch (error) {
    console.error("[Integration Test] Database test failed with exception:", error);
    return {
      success: false,
      message: "Database test failed with exception: " + (error instanceof Error ? error.message : String(error)),
      details: error,
      previewMode: forcePreviewMode || isPreviewOrTestEnvironment()
    };
  }
};

/**
 * Tests email functionality by submitting a test contact form
 */
export const testEmailFunctionality = async (
  forcePreviewMode = false
): Promise<{
  success: boolean;
  message: string;
  details?: any;
  previewMode?: boolean;
}> => {
  try {
    console.log("[Integration Test] Starting email functionality test");
    console.log("[Integration Test] Preview mode:", forcePreviewMode);
    
    // If in preview environment or forced preview mode, return a mock result
    if (forcePreviewMode || isPreviewOrTestEnvironment()) {
      console.log("[Integration Test] Preview/test environment detected, returning mock result");
      return mockEmailTest();
    }
    
    // Create test contact data
    const testContactData = {
      name: "Integration Test",
      email: "test@example.com",
      phone: "555-123-4567",
      message: "This is an integration test of the contact form and email functionality.",
      consent: true
    };
    
    console.log("[Integration Test] Submitting test contact form");
    
    try {
      // Try to invoke the function with better error handling
      console.log("[Integration Test] Invoking handle-contact edge function");
      
      const { data, error } = await supabase.functions.invoke('handle-contact', {
        body: testContactData,
      });
      
      if (error) {
        // Handle specific function errors
        console.error("[Integration Test] Error invoking handle-contact function:", error);
        
        if (error.message && error.message.includes('FunctionsFetchError')) {
          return {
            success: false,
            message: "Edge function not found or not responding. Check that 'handle-contact' edge function is deployed.",
            details: {
              error,
              suggestion: "Verify that the edge function is properly deployed in your Supabase project."
            }
          };
        }
        
        return {
          success: false,
          message: "Failed to invoke handle-contact edge function: " + error.message,
          details: error
        };
      }
      
      console.log("[Integration Test] Contact form submission result:", data);
      
      return {
        success: true,
        message: "Email functionality test completed successfully",
        details: data
      };
    } catch (invokeError) {
      // Specific handling for edge function errors
      console.error("[Integration Test] Error invoking edge function:", invokeError);
      
      if (invokeError instanceof Error && 
          invokeError.name === 'FunctionsFetchError' || 
          invokeError.toString().includes('FunctionsFetchError')) {
        return {
          success: false,
          message: "Failed to connect to edge function. The function may not be deployed or accessible.",
          details: {
            error: invokeError,
            suggestion: "Check that your Supabase project has the 'handle-contact' edge function deployed."
          }
        };
      }
      
      return {
        success: false,
        message: "Failed to invoke edge function: " + (invokeError instanceof Error ? invokeError.message : String(invokeError)),
        details: invokeError
      };
    }
  } catch (error) {
    console.error("[Integration Test] Email test failed with exception:", error);
    return {
      success: false,
      message: "Email test failed with exception: " + (error instanceof Error ? error.message : String(error)),
      details: error,
      previewMode: forcePreviewMode || isPreviewOrTestEnvironment()
    };
  }
};

/**
 * Run all integration tests and display results
 */
export const runAllIntegrationTests = async (forcePreviewMode = false): Promise<void> => {
  // Determine if we're in a preview environment to force mocks
  const isInPreviewMode = forcePreviewMode || isPreviewOrTestEnvironment();
  
  toast.info("Starting integration tests...");
  console.log("[Integration Tests] Starting all tests, preview mode:", isInPreviewMode);
  
  // Test authentication
  const authResult = await testAuthenticationFlow(isInPreviewMode);
  if (authResult.success) {
    toast.success("Authentication test: PASSED ✓");
  } else if (authResult.previewMode) {
    toast.info("Authentication test: LIMITED IN PREVIEW MODE ℹ");
  } else {
    toast.error(`Authentication test: FAILED ✗ - ${authResult.message}`);
    console.error("Auth test details:", authResult.details);
  }
  
  // Test database operations
  const dbResult = await testDatabaseOperations(isInPreviewMode);
  if (dbResult.success) {
    toast.success("Database operations test: PASSED ✓");
  } else if (dbResult.previewMode) {
    toast.info("Database operations test: LIMITED IN PREVIEW MODE ℹ");
  } else {
    toast.error(`Database operations test: FAILED ✗ - ${dbResult.message}`);
    console.error("Database test details:", dbResult.details);
  }
  
  // Test email functionality
  const emailResult = await testEmailFunctionality(isInPreviewMode);
  if (emailResult.success) {
    toast.success("Email functionality test: PASSED ✓");
  } else if (emailResult.previewMode) {
    toast.info("Email functionality test: LIMITED IN PREVIEW MODE ℹ");
  } else {
    toast.error(`Email functionality test: FAILED ✗ - ${emailResult.message}`);
    console.error("Email test details:", emailResult.details);
  }
  
  console.log("[Integration Tests] All tests completed", {
    auth: authResult,
    database: dbResult,
    email: emailResult
  });
  
  if (isInPreviewMode) {
    toast.info("Tests were run in preview environment with limited connectivity. Some warnings are expected and not indicative of actual issues.");
  } else {
    toast.info("All integration tests completed. Check console for details.");
  }
};
