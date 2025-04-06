
// This file just re-exports the hooks from our main toast implementation
import { toast } from 'sonner';

// Create a simplified hook that's compatible with existing code
export const useToast = () => {
  return {
    toast,
    dismiss: (toastId?: string) => {
      // Sonner's dismiss function takes the id directly
      if (toastId) {
        toast.dismiss(toastId);
      } else {
        toast.dismiss();
      }
    }
  };
};

export { toast };
