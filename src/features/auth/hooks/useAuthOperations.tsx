
import { useNavigate } from 'react-router-dom';
import { 
  useSignInOperation, 
  useSignUpOperation, 
  useSignOutOperation 
} from './auth-operations';

/**
 * Custom hook for authentication operations with improved error handling
 */
export const useAuthOperations = (
  networkStatus: 'online' | 'offline' | 'checking', 
  setLoading: (loading: boolean) => void,
  checkNetworkStatus: () => Promise<boolean>
) => {
  const navigate = useNavigate();
  const { signIn } = useSignInOperation(networkStatus, setLoading);
  const { signUp } = useSignUpOperation(networkStatus, setLoading);
  const { signOut } = useSignOutOperation(setLoading);
  
  return {
    signIn,
    signUp,
    signOut
  };
};
