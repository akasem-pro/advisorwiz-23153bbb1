/**
 * Utility functions for handling mock authentication in development/preview environments
 */

/**
 * Get the effective authentication status based on the current environment
 * In development or preview environments, we can override the auth status
 */
export const getEffectiveAuthStatus = (isAuthenticated: boolean): boolean => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isPreviewEnv = window.location.hostname.includes('preview') || 
                       window.location.hostname.includes('lovableproject') ||
                       window.location.hostname.includes('localhost');
  
  // In development or preview environments, consider the user authenticated
  if (isDevelopment || isPreviewEnv) {
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
