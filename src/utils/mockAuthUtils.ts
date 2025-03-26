
/**
 * Utility to handle authentication status checking in preview environments
 */

/**
 * Check if the current environment is a preview environment
 */
export const isPreviewEnvironment = (): boolean => {
  return window.location.hostname.includes('preview') || 
         window.location.hostname.includes('lovableproject') ||
         window.location.hostname.includes('localhost');
};

/**
 * Returns whether the user is effectively authenticated, accounting for
 * both normal authentication and preview environment mock users
 */
export const getEffectiveAuthStatus = (isAuthenticated: boolean): boolean => {
  // Check if this is a preview environment
  const isPreviewEnv = isPreviewEnvironment();
  
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
  const isPreviewEnv = isPreviewEnvironment();
  
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

/**
 * Set up a mock authenticated user for development and testing
 */
export const setupMockAuth = (userType: 'consumer' | 'advisor' | 'firm_admin' = 'consumer'): void => {
  if (!isPreviewEnvironment()) {
    console.warn('Mock authentication only works in preview environments');
    return;
  }
  
  // Create a mock user
  const mockUser = {
    id: `mock-${userType}-user`,
    email: `mock-${userType}@example.com`,
    created_at: new Date().toISOString(),
    app_metadata: {},
    user_metadata: {
      name: `Mock ${userType.charAt(0).toUpperCase() + userType.slice(1)}`,
      user_type: userType,
      avatar_url: '',
    },
    aud: 'authenticated',
    role: 'authenticated'
  };
  
  // Store in localStorage
  localStorage.setItem('mock_auth_user', JSON.stringify(mockUser));
  localStorage.setItem('mock_user_type', userType);
  
  console.log(`[MockAuth] Set up mock ${userType} user for testing`);
};

/**
 * Clear mock authentication data
 */
export const clearMockAuth = (): void => {
  localStorage.removeItem('mock_auth_user');
  localStorage.removeItem('mock_user_type');
  console.log('[MockAuth] Cleared mock authentication data');
};
