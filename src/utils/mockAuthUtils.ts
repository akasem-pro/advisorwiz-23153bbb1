/**
 * Utility to handle authentication status checking in preview environments
 */

/**
 * Returns whether the user is effectively authenticated, accounting for
 * both normal authentication and preview environment mock users
 */
export const getEffectiveAuthStatus = (isAuthenticated: boolean): boolean => {
  // Check if this is a preview environment
  const isPreviewEnv = window.location.hostname.includes('preview') || 
                       window.location.hostname.includes('lovableproject') ||
                       window.location.hostname.includes('localhost');
  
  // In preview environments, check for mock auth user in localStorage
  if (isPreviewEnv && localStorage.getItem('mock_auth_user')) {
    return true;
  }
  
  // Otherwise, use the provided authentication status
  return isAuthenticated;
};

/**
 * Gets the user type from various sources, including mock user data
 */
export const getEffectiveUserType = (userType: string | null): string | null => {
  // Check if this is a preview environment
  const isPreviewEnv = window.location.hostname.includes('preview') || 
                       window.location.hostname.includes('lovableproject') ||
                       window.location.hostname.includes('localhost');
  
  // If we already have a userType, return it
  if (userType) {
    return userType;
  }
  
  // In preview environments, check for mock user type in localStorage
  if (isPreviewEnv) {
    const mockUserType = localStorage.getItem('mock_user_type');
    if (mockUserType) {
      return mockUserType;
    }
    
    // Try to infer from mock auth user
    const mockAuthUser = localStorage.getItem('mock_auth_user');
    if (mockAuthUser) {
      try {
        const parsedUser = JSON.parse(mockAuthUser);
        return parsedUser?.user_metadata?.user_type || 'consumer';
      } catch (e) {
        console.error('Error parsing mock user data:', e);
      }
    }
  }
  
  // Default to null if no type is found
  return null;
};
