
/**
 * Utility functions for handling mock authentication in development/preview environments
 */

// Define production domains to distinguish from preview/development environments
export const PRODUCTION_DOMAINS = [
  'advisorwiz.com',
  'app.advisorwiz.com',
  'api.advisorwiz.com',
  'www.advisorwiz.com',
  'dashboard.advisorwiz.com'
];

/**
 * Check if the current environment is a preview/development environment
 */
export const isPreviewEnvironment = (): boolean => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  
  // If in development mode or running on localhost, consider it a preview environment
  if (isDevelopment || hostname.includes('localhost')) {
    return true;
  }
  
  // Check if it's a preview deployment site
  const isPreviewSite = hostname.includes('preview') || 
                         hostname.includes('lovableproject');
  
  // Check if it's a production domain
  const isProductionDomain = PRODUCTION_DOMAINS.some(domain => 
    hostname === domain || hostname.endsWith('.' + domain)
  );
  
  // It's a preview environment if it's a preview site and not a production domain
  return isPreviewSite && !isProductionDomain;
};

/**
 * Get the effective authentication status based on the current environment
 * In development or preview environments, we can override the auth status
 */
export const getEffectiveAuthStatus = (isAuthenticated: boolean): boolean => {
  // If it's a preview environment or development, consider the user authenticated
  if (isPreviewEnvironment()) {
    return true;
  }
  
  // Otherwise, use the actual auth status
  return isAuthenticated;
};

/**
 * Set a mock user in localStorage for development/preview environments
 */
export const setMockUser = (userType: 'consumer' | 'advisor' | 'firm_admin' | 'admin') => {
  localStorage.setItem('mock_auth_user', JSON.stringify({
    type: userType,
    email: `mock-${userType}@example.com`,
    name: `Mock ${userType.charAt(0).toUpperCase() + userType.slice(1)}`,
  }));
};

/**
 * Clear the mock user from localStorage
 */
export const clearMockUser = () => {
  localStorage.removeItem('mock_auth_user');
};

/**
 * Get the mock user from localStorage
 */
export const getMockUser = () => {
  const mockUserJson = localStorage.getItem('mock_auth_user');
  return mockUserJson ? JSON.parse(mockUserJson) : null;
};

/**
 * Setup mock auth for testing in preview environments
 * Alias for setMockUser for backwards compatibility
 */
export const setupMockAuth = setMockUser;

/**
 * Clear mock auth for testing in preview environments
 * Alias for clearMockUser for backwards compatibility
 */
export const clearMockAuth = clearMockUser;
