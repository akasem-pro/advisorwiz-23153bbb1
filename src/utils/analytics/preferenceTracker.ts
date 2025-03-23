
import { supabase } from '../../integrations/supabase/client';
import { UserBehaviorEvent } from './types';
import { trackUserBehavior } from './eventTracker';

/**
 * Track preference updates for dynamic matching
 */
export const trackPreferenceUpdate = async (
  userId: string,
  prevPreferences: Record<string, any>,
  newPreferences: Record<string, any>
): Promise<void> => {
  // Determine what preferences were changed
  const changedPrefs: Record<string, { from: any, to: any }> = {};
  
  for (const [key, value] of Object.entries(newPreferences)) {
    if (JSON.stringify(prevPreferences[key]) !== JSON.stringify(value)) {
      changedPrefs[key] = {
        from: prevPreferences[key],
        to: value
      };
    }
  }
  
  // Track the preference update event
  await trackUserBehavior(
    UserBehaviorEvent.PREFERENCE_UPDATED,
    userId,
    {
      changes: changedPrefs,
      timestamp: new Date().toISOString()
    }
  );
  
  // Update the preferences in the database for future reference
  try {
    await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        matching_preferences: newPreferences,
        updated_at: new Date().toISOString()
      });
  } catch (error) {
    console.error('Failed to store updated preferences:', error);
  }
};
