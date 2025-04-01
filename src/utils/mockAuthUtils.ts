
// This file centralizes the production domain configuration for consistent environment detection

/**
 * List of domains considered to be production environments
 * Used for authentication and Supabase client configuration
 */
export const PRODUCTION_DOMAINS = [
  'advisorwiz.com',
  'app.advisorwiz.com',
  'api.advisorwiz.com',
  'www.advisorwiz.com'
];

/**
 * Determines the effective auth status based on environment and localStorage
 * @param isAuthenticated The current authentication state
 * @returns The effective authentication state considering environment overrides
 */
export const getEffectiveAuthStatus = (isAuthenticated: boolean): boolean => {
  // Check if we're in a preview/development environment
  const isPreviewEnv = isPreviewEnvironment();
  
  // In preview environments, check for mock user
  if (isPreviewEnv && localStorage.getItem('mock_auth_user')) {
    return true;
  }
  
  return isAuthenticated;
};

/**
 * Determines if the current environment is a preview environment
 * @returns True if in a preview environment, false for production
 */
export const isPreviewEnvironment = (): boolean => {
  try {
    const hostname = window.location.hostname;
    
    // Check if the hostname exactly matches or ends with any production domain
    for (const domain of PRODUCTION_DOMAINS) {
      if (hostname === domain || hostname.endsWith('.' + domain)) {
        return false;
      }
    }
    
    // If it's not explicitly a production domain, check if it looks like a production domain
    if (hostname.endsWith('.app') || !hostname.includes('.')) {
      return false;
    }
    
    // Consider everything else as preview/test (including localhost, preview URLs)
    return true;
  } catch (e) {
    console.error("Error checking environment:", e);
    return false; // Default to production on error
  }
};

/**
 * Set up mock authentication for testing
 * @param userType Type of user to mock
 */
export const setupMockAuth = (userType: 'consumer' | 'advisor' | 'firm_admin' = 'consumer') => {
  const mockUser = {
    id: 'mock-user-id',
    email: `mock-${userType}@example.com`,
    user_metadata: {
      name: `Mock ${userType.charAt(0).toUpperCase() + userType.slice(1)}`,
      user_type: userType
    }
  };
  
  localStorage.setItem('mock_auth_user', JSON.stringify(mockUser));
  localStorage.setItem('mock_user_type', userType);
  
  console.log(`[Mock Auth] Set up mock ${userType} user`);
};

/**
 * Clear mock authentication
 */
export const clearMockAuth = () => {
  localStorage.removeItem('mock_auth_user');
  localStorage.removeItem('mock_user_type');
  console.log('[Mock Auth] Cleared mock authentication');
};
