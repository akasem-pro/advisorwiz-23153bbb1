
import { setupMockAuth, clearMockAuth, isPreviewEnvironment } from './mockAuthUtils';

/**
 * Development and testing helpers
 * ONLY for use in development and preview environments
 */
export const devHelpers = {
  /**
   * Set up a mock user for testing in preview environments
   */
  mockSignIn: (userType: 'consumer' | 'advisor' | 'firm_admin' = 'consumer') => {
    if (!isPreviewEnvironment()) {
      console.warn('[Dev Helpers] Mock sign in only works in preview environments');
      return false;
    }
    
    setupMockAuth(userType);
    console.log(`[Dev Helpers] Mock ${userType} user signed in for testing`);
    return true;
  },
  
  /**
   * Clear mock authentication
   */
  mockSignOut: () => {
    if (!isPreviewEnvironment()) {
      console.warn('[Dev Helpers] Mock sign out only works in preview environments');
      return false;
    }
    
    clearMockAuth();
    console.log('[Dev Helpers] Mock user signed out');
    return true;
  },
  
  /**
   * Log the current authentication state for debugging
   */
  logAuthState: () => {
    if (!isPreviewEnvironment()) {
      console.warn('[Dev Helpers] This helper only works in preview environments');
      return;
    }
    
    const mockUser = localStorage.getItem('mock_auth_user');
    const mockUserType = localStorage.getItem('mock_user_type');
    
    console.log('[Dev Helpers] Auth State:', {
      isMockAuth: !!mockUser,
      mockUserType: mockUserType || 'none',
      mockUser: mockUser ? JSON.parse(mockUser) : null
    });
  }
};

// Add to window for console access in development
if (isPreviewEnvironment()) {
  (window as any).devHelpers = devHelpers;
}
