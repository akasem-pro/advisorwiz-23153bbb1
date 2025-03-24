
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../../integrations/supabase/client';

/**
 * Custom hook for sign-out operation with improved error handling
 */
export const useSignOutOperation = (
  setLoading: (loading: boolean) => void
) => {
  const navigate = useNavigate();

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      
      console.log("[Auth Debug] Starting sign out process");
      
      await supabase.auth.signOut();
      console.log("[Auth Debug] Sign out successful");
      toast.success("Successfully signed out");
      navigate('/sign-in');
    } catch (error: any) {
      console.error("[Auth Debug] Error signing out:", error.message);
      console.error("[Auth Debug] Detailed sign out error:", error);
      toast.error("Failed to sign out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { signOut };
};
