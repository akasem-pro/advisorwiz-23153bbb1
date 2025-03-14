
import React from 'react';
import { Button } from '../ui/button';
import { FilterX } from 'lucide-react';
import SearchInput from './SearchInput';
import FilterDropdown from './FilterDropdown';
import SortDropdown from './SortDropdown';

interface MatchFilterSortProps {
  userType: 'consumer' | 'advisor' | null;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortOption: string;
  sortDirection: 'asc' | 'desc';
  onSortChange: (option: any) => void;
  selectedExpertise: string[];
  onExpertiseChange: (expertise: string[]) => void;
  selectedLanguages: string[];
  onLanguageChange: (languages: string[]) => void;
  onClearFilters: () => void;
  matchCount: number;
}

const MatchFilterSort: React.FC<MatchFilterSortProps> = ({
  userType,
  searchTerm,
  onSearchChange,
  sortOption,
  sortDirection,
  onSortChange,
  selectedExpertise,
  onExpertiseChange,
  selectedLanguages,
  onLanguageChange,
  onClearFilters,
  matchCount
}) => {
  // Count of active filters (excluding sort)
  const activeFilterCount = 
    (searchTerm ? 1 : 0) + 
    selectedExpertise.length + 
    selectedLanguages.length;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium text-gray-700">
          {matchCount} {userType === 'consumer' ? 'Advisor' : 'Client'} Match{matchCount !== 1 ? 'es' : ''}
        </h2>
        
        {activeFilterCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            <FilterX className="h-3 w-3 mr-1" />
            Clear filters
          </Button>
        )}
      </div>
      
      <div className="flex gap-2 mb-2">
        <SearchInput
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          userType={userType}
        />
        
        <FilterDropdown
          userType={userType}
          selectedExpertise={selectedExpertise}
          onExpertiseChange={onExpertiseChange}
          selectedLanguages={selectedLanguages}
          onLanguageChange={onLanguageChange}
          activeFilterCount={activeFilterCount}
        />
        
        <SortDropdown
          userType={userType}
          sortOption={sortOption}
          sortDirection={sortDirection}
          onSortChange={onSortChange}
        />
      </div>
    </div>
  );
};

export default MatchFilterSort;
