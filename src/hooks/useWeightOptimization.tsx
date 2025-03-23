
import { useState, useCallback } from 'react';
import { useUser } from '../context/UserContext';
import { MatchPreferences } from '../context/UserContextDefinition';
import { supabase } from '../integrations/supabase/client';
import { trackPreferenceUpdate } from '../utils/analytics/preferenceTracker';

export const useWeightOptimization = () => {
  const { userType, consumerProfile, advisorProfile, matchPreferences, updateMatchPreferences } = useUser();
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [optimizing, setOptimizing] = useState(false);

  const userId = userType === 'consumer' 
    ? consumerProfile?.id 
    : advisorProfile?.id;

  const startAdjusting = useCallback(() => {
    setIsAdjusting(true);
  }, []);

  const cancelAdjusting = useCallback(() => {
    setIsAdjusting(false);
  }, []);

  const saveWeightPreferences = useCallback(async (updatedPreferences: MatchPreferences) => {
    setOptimizing(true);
    
    try {
      // Track preference changes for analytics
      if (userId) {
        await trackPreferenceUpdate(userId, matchPreferences, updatedPreferences);
      }
      
      // Save to context/state
      updateMatchPreferences(updatedPreferences);
      
      // Store in database for persistence
      if (userId) {
        await supabase
          .from('user_preferences')
          .upsert({
            user_id: userId,
            matching_preferences: updatedPreferences,
            updated_at: new Date().toISOString()
          });
      }
      
      // Close the adjustment panel
      setIsAdjusting(false);
    } catch (error) {
      console.error('Failed to save weight preferences:', error);
    } finally {
      setOptimizing(false);
    }
  }, [userId, matchPreferences, updateMatchPreferences]);

  // Reset weights to default factory settings
  const resetToDefaults = useCallback(async () => {
    const defaultPreferences: MatchPreferences = {
      prioritizeLanguage: true,
      prioritizeExpertise: true,
      prioritizeAvailability: true,
      prioritizeLocation: false,
      minimumMatchScore: 40,
      considerInteractionData: true,
      weightFactors: {
        language: 50,
        expertise: 50,
        availability: 30,
        location: 20,
        interaction: 40
      }
    };
    
    await saveWeightPreferences(defaultPreferences);
  }, [saveWeightPreferences]);

  return {
    isAdjusting,
    optimizing,
    startAdjusting,
    cancelAdjusting,
    saveWeightPreferences,
    resetToDefaults,
    currentPreferences: matchPreferences
  };
};
