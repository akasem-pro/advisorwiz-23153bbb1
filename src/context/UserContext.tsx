
import UserContext from './UserContextDefinition';
import { UserProvider } from './UserProvider';
import { useContext } from 'react';

// Re-export all the types
export * from '../types/userTypes';
export * from './UserContextDefinition';

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);

// Export the provider
export { UserProvider };

// Export the context for direct use if needed
export default UserContext;
