
/**
 * This utility provides integration verification functions to test the app's
 * connection with Supabase, Resend, and other services.
 */

import { supabase, checkSupabaseConnection } from "../../integrations/supabase/client";
import { toast } from "sonner";
import { mockAuthTest, mockDatabaseTest, mockEmailTest } from "./mock-integration";

/**
 * Tests the authentication flow by attempting to sign in with test credentials
 * and then signing out
 */
export const testAuthenticationFlow = async (
  isPreviewEnvironment = false
): Promise<{
  success: boolean;
  message: string;
  details?: any;
  previewMode?: boolean;
}> => {
  try {
    console.log("[Integration Test] Starting authentication flow test");
    
    // If in preview environment, return a mock result
    if (isPreviewEnvironment) {
      console.log("[Integration Test] Preview environment detected, returning mock result");
      return mockAuthTest();
    }
    
    // 1. Check if we're already logged in
    const { data: sessionData } = await supabase.auth.getSession();
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
      return {
        success: false,
        message: "Failed to sign in with test credentials",
        details: signInError
      };
    }
    
    console.log("[Integration Test] Sign in successful, now signing out");
    
    // 3. Attempt to sign out
    const { error: signOutError } = await supabase.auth.signOut();
    
    if (signOutError) {
      return {
        success: false,
        message: "Signed in successfully but failed to sign out",
        details: signOutError
      };
    }
    
    // 4. Verify we're signed out
    const { data: verifyData } = await supabase.auth.getSession();
    if (verifyData?.session) {
      return {
        success: false,
        message: "Sign out reported success but user is still logged in",
        details: verifyData
      };
    }
    
    return {
      success: true,
      message: "Authentication flow test completed successfully"
    };
  } catch (error) {
    console.error("[Integration Test] Authentication test failed with exception:", error);
    return {
      success: false,
      message: "Authentication test failed with exception",
      details: error,
      previewMode: isPreviewEnvironment
    };
  }
};

/**
 * Tests Supabase database operations by performing test read/write operations
 */
export const testDatabaseOperations = async (
  isPreviewEnvironment = false
): Promise<{
  success: boolean;
  message: string;
  details?: any;
  previewMode?: boolean;
}> => {
  try {
    console.log("[Integration Test] Starting database operations test");
    
    // If in preview environment, return a mock result
    if (isPreviewEnvironment) {
      console.log("[Integration Test] Preview environment detected, returning mock result");
      return mockDatabaseTest();
    }
    
    // 1. First verify connection to Supabase
    const isConnected = await checkSupabaseConnection();
    if (!isConnected) {
      return {
        success: false,
        message: "Failed to connect to Supabase"
      };
    }
    
    // 2. Test read operation (using public data that doesn't require auth)
    console.log("[Integration Test] Testing read operation");
    const { data: readData, error: readError } = await supabase
      .from('tooltip_content')
      .select('*')
      .limit(1);
    
    if (readError) {
      return {
        success: false,
        message: "Failed to read from database",
        details: readError
      };
    }
    
    console.log("[Integration Test] Read operation successful:", readData);
    
    // 3. Test for RLS policies working as expected
    // Try to read from a protected table when not authenticated
    const { error: rlsError } = await supabase.auth.signOut();
    console.log("[Integration Test] Testing RLS policies");
    
    const { data: protectedData, error: protectedError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
      
    // If we get data without being authenticated, RLS may not be properly set up
    // If we get an error about permissions, RLS is working as expected
    const rlsWorking = protectedError && protectedError.message.includes('permission');
    
    return {
      success: true,
      message: `Database operations test completed. RLS policies ${rlsWorking ? 'are' : 'may not be'} working as expected.`,
      details: { readData, protectedResult: protectedData || protectedError }
    };
  } catch (error) {
    console.error("[Integration Test] Database test failed with exception:", error);
    return {
      success: false,
      message: "Database test failed with exception",
      details: error,
      previewMode: isPreviewEnvironment
    };
  }
};

/**
 * Tests email functionality by submitting a test contact form
 */
export const testEmailFunctionality = async (
  isPreviewEnvironment = false
): Promise<{
  success: boolean;
  message: string;
  details?: any;
  previewMode?: boolean;
}> => {
  try {
    console.log("[Integration Test] Starting email functionality test");
    
    // If in preview environment, return a mock result
    if (isPreviewEnvironment) {
      console.log("[Integration Test] Preview environment detected, returning mock result");
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
    
    // Call the edge function directly
    const { data, error } = await supabase.functions.invoke('handle-contact', {
      body: testContactData,
    });
    
    if (error) {
      return {
        success: false,
        message: "Failed to invoke handle-contact edge function",
        details: error
      };
    }
    
    console.log("[Integration Test] Contact form submission result:", data);
    
    return {
      success: true,
      message: "Email functionality test completed successfully",
      details: data
    };
  } catch (error) {
    console.error("[Integration Test] Email test failed with exception:", error);
    return {
      success: false,
      message: "Email test failed with exception",
      details: error,
      previewMode: isPreviewEnvironment
    };
  }
};

/**
 * Run all integration tests and display results
 */
export const runAllIntegrationTests = async (): Promise<void> => {
  const isPreviewEnvironment = typeof window !== 'undefined' && (
    window.location.hostname.includes('preview') ||
    window.location.hostname.includes('lovableproject') ||
    window.location.hostname.includes('localhost')
  );
  
  toast.info("Starting integration tests...");
  
  // Test authentication
  const authResult = await testAuthenticationFlow(isPreviewEnvironment);
  if (authResult.success) {
    toast.success("Authentication test: PASSED ✓");
  } else if (authResult.previewMode) {
    toast.info("Authentication test: LIMITED IN PREVIEW MODE ℹ");
  } else {
    toast.error(`Authentication test: FAILED ✗ - ${authResult.message}`);
    console.error("Auth test details:", authResult.details);
  }
  
  // Test database operations
  const dbResult = await testDatabaseOperations(isPreviewEnvironment);
  if (dbResult.success) {
    toast.success("Database operations test: PASSED ✓");
  } else if (dbResult.previewMode) {
    toast.info("Database operations test: LIMITED IN PREVIEW MODE ℹ");
  } else {
    toast.error(`Database operations test: FAILED ✗ - ${dbResult.message}`);
    console.error("Database test details:", dbResult.details);
  }
  
  // Test email functionality
  const emailResult = await testEmailFunctionality(isPreviewEnvironment);
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
  
  if (isPreviewEnvironment) {
    toast.info("Tests were run in preview environment with limited connectivity. Some failures are expected and not indicative of actual issues.");
  } else {
    toast.info("All integration tests completed. Check console for details.");
  }
};
