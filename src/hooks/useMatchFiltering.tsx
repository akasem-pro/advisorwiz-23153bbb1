
import { useMemo } from 'react';
import { AdvisorProfile, ConsumerProfile } from '../types/userTypes';
import { useMatchSearch } from './matching/useMatchSearch';
import { useMatchSorting, SortOption } from './matching/useMatchSorting';

export const useMatchFiltering = (profiles: (AdvisorProfile | ConsumerProfile)[], userType: 'consumer' | 'advisor' | null) => {
  // Use our search hook
  const {
    searchTerm,
    setSearchTerm,
    selectedExpertise,
    setSelectedExpertise,
    selectedLanguages,
    setSelectedLanguages,
    applySearchFilters
  } = useMatchSearch({ profiles, userType });

  // Use our sorting hook
  const {
    sortOption,
    sortDirection,
    handleSortChange,
    applySorting,
    toggleSortDirection
  } = useMatchSorting({ userType });

  // Combine search/filter and sorting in a single pass
  const filteredAndSortedProfiles = useMemo(() => {
    // First apply filters
    const filteredResults = applySearchFilters(profiles);
    
    // Then sort the filtered results
    return applySorting(filteredResults);
  }, [profiles, searchTerm, sortOption, sortDirection, selectedExpertise, selectedLanguages, applySearchFilters, applySorting]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedExpertise([]);
    setSelectedLanguages([]);
    // Reset sorting to default
    handleSortChange('default');
  };

  return {
    searchTerm,
    setSearchTerm,
    sortOption,
    sortDirection,
    selectedExpertise,
    setSelectedExpertise,
    selectedLanguages,
    setSelectedLanguages,
    filteredAndSortedProfiles,
    handleSortChange,
    toggleSortDirection,
    clearFilters
  };
};
