
import { useState, useMemo } from 'react';
import { AdvisorProfile, ConsumerProfile } from '../types/userTypes';

type SortOption = 'name' | 'default' | 'expertise' | 'assets';
type SortDirection = 'asc' | 'desc';

export const useMatchFiltering = (profiles: (AdvisorProfile | ConsumerProfile)[], userType: 'consumer' | 'advisor' | null) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const filteredAndSortedProfiles = useMemo(() => {
    // First apply filters
    let result = [...profiles];
    
    // Apply search term filter
    if (searchTerm) {
      result = result.filter(profile => 
        profile.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply expertise filter (for advisors when user is consumer)
    if (userType === 'consumer' && selectedExpertise.length > 0) {
      result = result.filter(profile => {
        const advisorProfile = profile as AdvisorProfile;
        return selectedExpertise.some(exp => 
          advisorProfile.expertise && advisorProfile.expertise.includes(exp as any)
        );
      });
    }

    // Apply language filter
    if (selectedLanguages.length > 0) {
      result = result.filter(profile => {
        if (userType === 'consumer') {
          const advisorProfile = profile as AdvisorProfile;
          return selectedLanguages.some(lang => 
            advisorProfile.languages && advisorProfile.languages.includes(lang)
          );
        } else {
          const consumerProfile = profile as ConsumerProfile;
          return selectedLanguages.some(lang => 
            consumerProfile.preferredLanguage && consumerProfile.preferredLanguage.includes(lang)
          );
        }
      });
    }

    // Then sort the filtered results
    if (sortOption !== 'default') {
      result.sort((a, b) => {
        let comparison = 0;
        
        if (sortOption === 'name') {
          comparison = a.name.localeCompare(b.name);
        } 
        else if (sortOption === 'expertise' && userType === 'consumer') {
          // Sort by number of expertise areas
          const aExpertise = (a as AdvisorProfile).expertise?.length || 0;
          const bExpertise = (b as AdvisorProfile).expertise?.length || 0;
          comparison = aExpertise - bExpertise;
        }
        else if (sortOption === 'assets') {
          if (userType === 'consumer') {
            const aAssets = (a as AdvisorProfile).assetsUnderManagement || 0;
            const bAssets = (b as AdvisorProfile).assetsUnderManagement || 0;
            comparison = aAssets - bAssets;
          } else {
            const aAssets = (a as ConsumerProfile).investableAssets || 0;
            const bAssets = (b as ConsumerProfile).investableAssets || 0;
            comparison = aAssets - bAssets;
          }
        }
        
        // Apply sort direction
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }
    
    return result;
  }, [profiles, searchTerm, sortOption, sortDirection, selectedExpertise, selectedLanguages, userType]);

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleSortChange = (option: SortOption) => {
    if (sortOption === option) {
      toggleSortDirection();
    } else {
      setSortOption(option);
      setSortDirection('asc');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSortOption('default');
    setSortDirection('asc');
    setSelectedExpertise([]);
    setSelectedLanguages([]);
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
