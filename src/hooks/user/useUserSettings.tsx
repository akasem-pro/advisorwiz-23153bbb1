
import { useState } from 'react';
import { MatchPreferences } from '../../types/compatibilityTypes';

/**
 * Hook to manage user preferences and settings
 */
export const useUserSettings = () => {
  const [matchPreferences, setMatchPreferences] = useState<MatchPreferences | null>(null);

  /**
   * Update user's matching preferences
   */
  const updateMatchPreferences = (preferences: MatchPreferences) => {
    setMatchPreferences(prev => ({
      ...prev,
      ...preferences
    }));
    
    // Here you could add logic to persist preferences to a backend
    console.log("[UserSettings] Updated match preferences:", preferences);
  };

  return {
    matchPreferences,
    updateMatchPreferences
  };
};
