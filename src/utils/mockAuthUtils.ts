/**
 * Comprehensive utilities to handle authentication in preview environments
 */

// Constants
const STORAGE_KEYS = {
  MOCK_AUTH_USER: 'mock_auth_user',
  MOCK_USER_TYPE: 'mock_user_type',
  MOCK_AUTH_TOKEN: 'mock_auth_token',
};

/**
 * Improved environment detection with explicit production domain checks
 */
export const isPreviewEnvironment = (): boolean => {
  try {
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
        return false;
      }
    }
    
    // If it's not explicitly a production domain, check if it looks like a production domain
    if (hostname.endsWith('.app') || !hostname.includes('.')) {
      return false;
    }
    
    // Consider everything else as preview/test
    return hostname.includes('preview') || hostname.includes('lovableproject');
  } catch (e) {
    console.error('[MockAuth] Error checking environment:', e);
    return false; // Default to production on error
  }
};

/**
 * Returns whether the user is effectively authenticated, accounting for
 * both normal authentication and preview environment mock users
 */
export const getEffectiveAuthStatus = (isAuthenticated: boolean): boolean => {
  // In preview environments, check for mock auth user
  if (isPreviewEnvironment() && localStorage.getItem(STORAGE_KEYS.MOCK_AUTH_USER)) {
    return true;
  }
  
  // Otherwise, use the provided authentication status
  return isAuthenticated;
};

/**
 * Gets the user type from various sources, including mock user data
 */
export const getEffectiveUserType = (userType: string | null): string | null => {
  // If we already have a userType, return it
  if (userType) {
    return userType;
  }
  
  // In preview environments, try to get mock user type
  if (isPreviewEnvironment()) {
    // First check for explicitly set user type
    const mockUserType = localStorage.getItem(STORAGE_KEYS.MOCK_USER_TYPE);
    if (mockUserType) {
      return mockUserType;
    }
    
    // Try to infer from mock auth user
    try {
      const mockAuthUserData = localStorage.getItem(STORAGE_KEYS.MOCK_AUTH_USER);
      if (mockAuthUserData) {
        const parsedUser = JSON.parse(mockAuthUserData);
        return parsedUser?.user_metadata?.user_type || 'consumer';
      }
    } catch (e) {
      console.error('[MockAuth] Error parsing mock user data:', e);
    }
  }
  
  // Default to null if no type is found
  return null;
};

/**
 * Get mock user information if available
 */
export const getMockUser = () => {
  if (!isPreviewEnvironment()) return null;
  
  try {
    const userData = localStorage.getItem(STORAGE_KEYS.MOCK_AUTH_USER);
    return userData ? JSON.parse(userData) : null;
  } catch (e) {
    console.error('[MockAuth] Error getting mock user:', e);
    return null;
  }
};

/**
 * Set up a mock authenticated user for development and testing
 */
export const setupMockAuth = (userType: 'consumer' | 'advisor' | 'firm_admin' = 'consumer'): void => {
  if (!isPreviewEnvironment()) {
    console.warn('[MockAuth] Mock authentication only works in preview environments');
    return;
  }
  
  // Create a mock user
  const mockUser = {
    id: `mock-${userType}-${Date.now()}`,
    email: `mock-${userType}@example.com`,
    created_at: new Date().toISOString(),
    app_metadata: {
      provider: 'email',
    },
    user_metadata: {
      name: `Mock ${userType.charAt(0).toUpperCase() + userType.slice(1)}`,
      user_type: userType,
      avatar_url: '',
    },
    aud: 'authenticated',
    role: 'authenticated'
  };
  
  // Create a mock token (for any API calls that might need it)
  const mockToken = btoa(JSON.stringify({
    sub: mockUser.id,
    email: mockUser.email,
    role: 'authenticated',
    exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour expiry
  }));
  
  // Store in localStorage
  localStorage.setItem(STORAGE_KEYS.MOCK_AUTH_USER, JSON.stringify(mockUser));
  localStorage.setItem(STORAGE_KEYS.MOCK_USER_TYPE, userType);
  localStorage.setItem(STORAGE_KEYS.MOCK_AUTH_TOKEN, mockToken);
  
  console.log(`[MockAuth] Set up mock ${userType} user for testing:`, mockUser);
};

/**
 * Clear mock authentication data
 */
export const clearMockAuth = (): void => {
  localStorage.removeItem(STORAGE_KEYS.MOCK_AUTH_USER);
  localStorage.removeItem(STORAGE_KEYS.MOCK_USER_TYPE);
  localStorage.removeItem(STORAGE_KEYS.MOCK_AUTH_TOKEN);
  console.log('[MockAuth] Cleared mock authentication data');
};

/**
 * Check if using mock authentication
 */
export const isUsingMockAuth = (): boolean => {
  return isPreviewEnvironment() && !!localStorage.getItem(STORAGE_KEYS.MOCK_AUTH_USER);
};

/**
 * Update mock user data
 */
export const updateMockUser = (userData: Partial<any>): void => {
  if (!isPreviewEnvironment()) return;
  
  try {
    const currentUserData = localStorage.getItem(STORAGE_KEYS.MOCK_AUTH_USER);
    if (currentUserData) {
      const currentUser = JSON.parse(currentUserData);
      const updatedUser = {
        ...currentUser,
        ...userData,
        user_metadata: {
          ...currentUser.user_metadata,
          ...(userData.user_metadata || {})
        }
      };
      localStorage.setItem(STORAGE_KEYS.MOCK_AUTH_USER, JSON.stringify(updatedUser));
      console.log('[MockAuth] Updated mock user:', updatedUser);
    }
  } catch (e) {
    console.error('[MockAuth] Error updating mock user:', e);
  }
};
