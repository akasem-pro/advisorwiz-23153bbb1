
import { useState } from 'react';
import { AdvisorProfile, ConsumerProfile } from '../types/userTypes';

export type SortOption = 'name' | 'default' | 'expertise' | 'assets';
export type SortDirection = 'asc' | 'desc';

interface UseMatchSortingProps {
  userType: 'consumer' | 'advisor' | null;
}

interface UseMatchSortingReturn {
  sortOption: SortOption;
  sortDirection: SortDirection;
  setSortOption: (option: SortOption) => void;
  setSortDirection: (direction: SortDirection) => void;
  toggleSortDirection: () => void;
  handleSortChange: (option: SortOption) => void;
  applySorting: (profiles: (AdvisorProfile | ConsumerProfile)[]) => (AdvisorProfile | ConsumerProfile)[];
}

export const useMatchSorting = ({ userType }: UseMatchSortingProps): UseMatchSortingReturn => {
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

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

  // Function to apply sorting
  const applySorting = (itemsToSort: (AdvisorProfile | ConsumerProfile)[]) => {
    if (sortOption === 'default') {
      return [...itemsToSort];
    }

    return [...itemsToSort].sort((a, b) => {
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
  };

  return {
    sortOption,
    sortDirection,
    setSortOption,
    setSortDirection,
    toggleSortDirection,
    handleSortChange,
    applySorting
  };
};
