
import UserContext from './UserContextDefinition';
import { UserProviderRefactored as UserProvider } from './UserProviderRefactored';
import { useContext } from 'react';

// Re-export all the types
export * from '../types/userTypes';
export * from './UserContextDefinition';

// Export AppointmentCategory explicitly
export { AppointmentCategory } from '../types/timeTypes';

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);

// Export the provider
export { UserProvider };

// Export the context for direct use if needed
export default UserContext;
