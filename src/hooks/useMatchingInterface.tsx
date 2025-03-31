
import { useMatchingState } from './matching/useMatchingState';
import { useMatchingNavigation } from './matching/useMatchingNavigation';
import { useMatchingFilters } from './matching/useMatchingFilters';
import { useMatchingMessages } from './matching/useMatchingMessages';
import { useMatchingActions } from './matching/useMatchingActions';
import { useMatchedProfiles } from './matching/useMatchedProfiles';
import { useEffect, useCallback, useRef } from 'react';

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

  // Track component mounted state
  const isMountedRef = useRef(true);
  
  // Set up unmount cleanup
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Memoize the loadProfilesIfNeeded callback to prevent infinite loops
  const loadProfilesIfNeeded = useCallback(() => {
    // Only proceed if the component is still mounted
    if (viewingMatches && isMountedRef.current) {
      loadMatchedProfiles();
    }
  }, [viewingMatches, loadMatchedProfiles]);
  
  useEffect(() => {
    if (isMountedRef.current) {
      loadProfilesIfNeeded();
    }
    // No explicit cleanup needed here as we're using isMountedRef
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
