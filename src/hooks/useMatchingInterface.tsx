
import { useMatchingState } from './matching/useMatchingState';
import { useMatchingNavigation } from './matching/useMatchingNavigation';
import { useMatchingFilters } from './matching/useMatchingFilters';
import { useMatchingMessages } from './matching/useMatchingMessages';
import { useMatchingActions } from './matching/useMatchingActions';
import { useMatchedProfiles } from './matching/useMatchedProfiles';
import { useEffect, useCallback } from 'react';

export const useMatchingInterface = () => {
  const {
    userType,
    advisors,
    consumers,
    filteredItems,
    setFilteredItems,
    currentIndex,
    setCurrentIndex,
    matches,
    setMatches,
    empty,
    setEmpty,
    viewingMatches,
    setViewingMatches,
    matchedProfiles,
    setMatchedProfiles,
    searchTerm,
    setSearchTerm
  } = useMatchingState();

  const { loadMatchedProfiles } = useMatchedProfiles(
    userType,
    matches,
    advisors,
    consumers,
    setMatchedProfiles
  );

  const { navigate, handleSchedule, goBackToMatching } = useMatchingNavigation(
    setViewingMatches,
    loadMatchedProfiles
  );

  const { handleSearch, handleFilterChange } = useMatchingFilters(
    userType,
    advisors,
    consumers,
    setFilteredItems,
    setCurrentIndex,
    setEmpty
  );

  const { handleMessage } = useMatchingMessages();

  const { handleSwipeRight, handleSwipeLeft, resetItems, getCurrentItem } = useMatchingActions(
    setMatches,
    currentIndex,
    filteredItems,
    setCurrentIndex,
    setEmpty
  );

  // Load matched profiles when viewing matches changes or matches are updated
  // Memoize the loadProfilesIfNeeded callback to prevent infinite loops
  const loadProfilesIfNeeded = useCallback(() => {
    if (viewingMatches) {
      loadMatchedProfiles();
    }
  }, [viewingMatches, loadMatchedProfiles]);
  
  useEffect(() => {
    loadProfilesIfNeeded();
    // No cleanup needed for this effect
  }, [loadProfilesIfNeeded, matches]);

  return {
    userType,
    matches,
    empty,
    viewingMatches,
    filteredItems,
    currentIndex,
    matchedProfiles,
    handleSearch,
    handleFilterChange,
    handleSchedule,
    handleMessage,
    handleSwipeRight,
    handleSwipeLeft,
    resetItems,
    goBackToMatching,
    getCurrentItem
  };
};
