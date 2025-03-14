
import React, { useState } from 'react';
import { Filter, Languages, Calendar, X } from 'lucide-react';
import { Button } from '../ui/button';
import { ServiceCategory } from '../../context/UserContext';
import SearchBar from './SearchBar';
import FilterGroup from './FilterGroup';
import { ServiceCategoryOptions, LanguageOptions, StartTimelineOptions } from './SearchFilterOptions';

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
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-navy-800">Filter Results</h3>
            <Button variant="ghost" size="sm" onClick={toggleFilters} className="h-7 px-2">
              <X size={16} />
            </Button>
          </div>

          <div className="space-y-4">
            <FilterGroup
              title="Languages"
              icon={Languages}
              options={LanguageOptions}
              selectedValues={selectedLanguages}
              onToggle={toggleLanguage}
            />

            {userType === 'consumer' && (
              <FilterGroup
                title="Services"
                icon={() => (
                  <span className="w-4 h-4 mr-2 flex items-center justify-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 9a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9Z"></path>
                      <path d="M10 17h4"></path>
                    </svg>
                  </span>
                )}
                options={ServiceCategoryOptions}
                selectedValues={selectedServices as string[]}
                onToggle={(value) => toggleService(value as ServiceCategory)}
              />
            )}

            {userType === 'advisor' && (
              <FilterGroup
                title="Start Timeline"
                icon={Calendar}
                options={StartTimelineOptions}
                selectedValues={selectedTimelines}
                onToggle={toggleTimeline}
              />
            )}

            <div className="flex justify-between pt-2 border-t border-gray-200">
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
              <Button size="sm" onClick={applyFilters} className="bg-teal-600 hover:bg-teal-700">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
