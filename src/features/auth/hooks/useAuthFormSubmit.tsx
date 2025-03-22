
import { supabase } from '../../../integrations/supabase/client';

export const useSignUpHandler = () => {
  const handleSignUp = async (e, email, password, validate, setFormError, setIsLoading, setActiveTab, setSignInEmail, clearForm) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    setIsLoading(true);
    setFormError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "https://preview--advisorwiz.lovable.app"
      }
    });

    if (error) {
      setFormError(error.message);
    } else {
      // Optionally show a "Check your inbox" message
      setActiveTab('signIn');
      setSignInEmail(email);
      clearForm();
    }

    setIsLoading(false);
  };

  return { handleSignUp };
};
