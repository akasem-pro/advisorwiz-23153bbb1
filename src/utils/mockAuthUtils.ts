
/**
 * Utility functions for handling mock authentication in preview/development environments
 */

// Check if we're in a preview environment
export const isPreviewEnvironment = (): boolean => {
  return window.location.hostname.includes('preview') || 
         window.location.hostname.includes('lovableproject') ||
         window.location.hostname.includes('localhost');
};

// Setup mock authentication
export const setupMockAuth = (userType: 'consumer' | 'advisor' | 'firm_admin' = 'consumer'): void => {
  if (!isPreviewEnvironment()) return;
  
  localStorage.setItem('mock_auth_user', JSON.stringify({
    id: 'mock-user-id',
    email: 'mock-user@example.com',
    created_at: new Date().toISOString()
  }));
  
  localStorage.setItem('mock_user_type', userType);
  
  console.log(`[Mock Auth] Mock ${userType} user set up for preview environment`);
};

// Check if mock auth is active
export const isMockAuthActive = (): boolean => {
  if (!isPreviewEnvironment()) return false;
  return !!localStorage.getItem('mock_auth_user');
};

// Get effective authentication status
export const getEffectiveAuthStatus = (isAuthenticated: boolean): boolean => {
  return isAuthenticated || (isPreviewEnvironment() && isMockAuthActive());
};

// Clear mock authentication
export const clearMockAuth = (): void => {
  localStorage.removeItem('mock_auth_user');
  localStorage.removeItem('mock_user_type');
  console.log('[Mock Auth] Mock auth cleared');
};
