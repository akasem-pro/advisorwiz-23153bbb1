
import { supabase } from '../../integrations/supabase/client';

// Track feature usage
export const trackFeatureUsage = async (featureName: string): Promise<void> => {
  const user = supabase.auth.getSession();
  if (!user) return;
  
  try {
    const userId = (await user).data.session?.user.id;
    if (!userId) return;
    
    // Check if this feature has been used by this user
    const { data: existingUsage } = await supabase
      .from('feature_usage')
      .select('id, usage_count')
      .eq('user_id', userId)
      .eq('feature_name', featureName)
      .maybeSingle();
    
    if (existingUsage) {
      // Update existing feature usage
      await supabase
        .from('feature_usage')
        .update({
          usage_count: (existingUsage.usage_count || 0) + 1,
          last_used_at: new Date().toISOString()
        })
        .eq('id', existingUsage.id);
    } else {
      // Create new feature usage
      await supabase
        .from('feature_usage')
        .insert({
          user_id: userId,
          feature_name: featureName
        });
    }
  } catch (error) {
    console.error(`Failed to track feature usage for ${featureName}:`, error);
  }
};
