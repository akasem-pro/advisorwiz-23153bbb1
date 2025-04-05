// List of production domains for deployment
export const PRODUCTION_DOMAINS = [
  'advisorwiz.com',
  'www.advisorwiz.com',
  'app.advisorwiz.com',
  'staging.advisorwiz.com',
  'dev.advisorwiz.com'
];

// Helper to determine if we're in a preview/development environment
export const isPreviewEnvironment = (): boolean => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return false;
  
  // Check if we have a mocked user in localStorage (for development)
  const hasMockUser = !!localStorage.getItem('mock_auth_user');
  
  // Check if the URL is a localhost or development URL
  const hostname = window.location.hostname;
  const isDevelopmentDomain = hostname === 'localhost' 
    || hostname === '127.0.0.1'
    || hostname.includes('.lovable.') 
    || hostname.includes('.vercel.app');
  
  return isDevelopmentDomain || hasMockUser;
};

// Get the effective auth status for preview environments
export const getEffectiveAuthStatus = (isAuthenticated: boolean): boolean => {
  // In preview environments, we may want to bypass authentication
  const isPreview = isPreviewEnvironment();
  
  // If we're in a preview environment and there's a mock user, consider as authenticated
  if (isPreview && localStorage.getItem('mock_auth_user')) {
    return true;
  }
  
  // Otherwise, return the actual authentication status
  return isAuthenticated;
};

// Set up mock authentication for development
export const setupMockAuth = (userType = 'consumer', userId = '123') => {
  const mockUser = {
    id: userId,
    email: 'test@example.com',
    app_metadata: { userType },
    user_metadata: { name: 'Test User', userType }
  };
  
  localStorage.setItem('mock_auth_user', JSON.stringify(mockUser));
  localStorage.setItem('mock_user_type', userType);
  console.log('Mock auth setup complete:', { userType, userId });
  
  // Force reload to apply changes
  window.location.reload();
};

// Clear mock authentication
export const clearMockAuth = () => {
  localStorage.removeItem('mock_auth_user');
  localStorage.removeItem('mock_user_type');
  console.log('Mock auth cleared');
  
  // Force reload to apply changes
  window.location.reload();
};
