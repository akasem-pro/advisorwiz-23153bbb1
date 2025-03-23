
import { supabase } from '../../integrations/supabase/client';

// Track AI interaction
export const trackAIInteraction = async (
  sessionId: string,
  interactionType: string,
  prompt?: string,
  response?: string,
  tokensUsed?: number,
  latencyMs?: number
): Promise<void> => {
  const user = supabase.auth.getSession();
  
  try {
    const userId = (await user).data.session?.user.id;
    
    await supabase
      .from('ai_interactions')
      .insert({
        user_id: userId,
        session_id: sessionId,
        interaction_type: interactionType,
        prompt,
        response,
        tokens_used: tokensUsed,
        latency_ms: latencyMs
      });
  } catch (error) {
    console.error('Failed to track AI interaction:', error);
  }
};
