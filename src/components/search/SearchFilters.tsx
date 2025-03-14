
import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { ServiceCategory } from '../../types/userTypes';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';

interface SearchFiltersProps {
  userType: 'consumer' | 'advisor' | null;
  onSearch: (term: string) => void;
  onFilterChange: (filters: any) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ userType, onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<ServiceCategory[]>([]);
  const [selectedTimelines, setSelectedTimelines] = useState<string[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(l => l !== language) 
        : [...prev, language]
    );
  };

  const toggleService = (service: ServiceCategory) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service) 
        : [...prev, service]
    );
  };

  const toggleTimeline = (timeline: string) => {
    setSelectedTimelines(prev => 
      prev.includes(timeline) 
        ? prev.filter(t => t !== timeline) 
        : [...prev, timeline]
    );
  };

  const applyFilters = () => {
    const filters = userType === 'consumer' 
      ? { languages: selectedLanguages, services: selectedServices }
      : { startTimeline: selectedTimelines, preferredLanguage: selectedLanguages };
    
    onFilterChange(filters);
  };

  const clearFilters = () => {
    setSelectedLanguages([]);
    setSelectedServices([]);
    setSelectedTimelines([]);
    onFilterChange({});
  };

  const searchPlaceholder = userType === 'consumer' 
    ? "Search advisors by name..." 
    : "Search consumers by name...";

  return (
    <div className="w-full mb-6">
      <div className="flex gap-2 mb-4">
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          placeholder={searchPlaceholder}
        />
        <Button variant="outline" onClick={toggleFilters}>
          <Filter size={18} className="mr-1" />
          Filters
        </Button>
      </div>

      {filtersVisible && (
        <FilterPanel 
          userType={userType}
          selectedLanguages={selectedLanguages}
          selectedServices={selectedServices}
          selectedTimelines={selectedTimelines}
          toggleLanguage={toggleLanguage}
          toggleService={toggleService}
          toggleTimeline={toggleTimeline}
          onClose={toggleFilters}
          onApply={applyFilters}
          onClear={clearFilters}
        />
      )}
    </div>
  );
};

export default SearchFilters;
