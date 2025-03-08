
import React, { useState } from 'react';
import { Search, Filter, Languages, Calendar, X } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ServiceCategory } from '../../context/UserContext';

interface SearchFiltersProps {
  userType: 'consumer' | 'advisor' | null;
  onSearch: (term: string) => void;
  onFilterChange: (filters: any) => void;
}

const ServiceCategoryOptions = [
  { value: 'retirement', label: 'Retirement Planning' },
  { value: 'investment', label: 'Investment Management' },
  { value: 'tax', label: 'Tax Planning' },
  { value: 'estate', label: 'Estate Planning' },
  { value: 'business', label: 'Business Planning' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'philanthropic', label: 'Philanthropic Planning' },
  { value: 'education', label: 'Education Planning' }
];

const LanguageOptions = [
  { value: 'english', label: 'English' },
  { value: 'french', label: 'French' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'mandarin', label: 'Mandarin' },
  { value: 'cantonese', label: 'Cantonese' },
  { value: 'punjabi', label: 'Punjabi' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'arabic', label: 'Arabic' }
];

const StartTimelineOptions = [
  { value: 'immediately', label: 'Immediately' },
  { value: 'next_3_months', label: 'Next 3 months' },
  { value: 'next_6_months', label: 'Next 6 months' },
  { value: 'not_sure', label: 'Not sure' }
];

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

  return (
    <div className="w-full mb-6">
      <div className="flex gap-2 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            type="text" 
            placeholder={userType === 'consumer' ? "Search advisors by name..." : "Search consumers by name..."}
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
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
            <div>
              <div className="flex items-center mb-2">
                <Languages size={16} className="mr-2 text-gray-500" />
                <h4 className="text-sm font-medium">Languages</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {LanguageOptions.map(lang => (
                  <Button
                    key={lang.value}
                    variant={selectedLanguages.includes(lang.value) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleLanguage(lang.value)}
                    className={`text-xs h-7 ${selectedLanguages.includes(lang.value) ? 'bg-teal-600' : ''}`}
                  >
                    {lang.label}
                  </Button>
                ))}
              </div>
            </div>

            {userType === 'consumer' && (
              <div>
                <div className="flex items-center mb-2">
                  <span className="w-4 h-4 mr-2 flex items-center justify-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 9a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9Z"></path>
                      <path d="M10 17h4"></path>
                    </svg>
                  </span>
                  <h4 className="text-sm font-medium">Services</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ServiceCategoryOptions.map(service => (
                    <Button
                      key={service.value}
                      variant={selectedServices.includes(service.value as ServiceCategory) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleService(service.value as ServiceCategory)}
                      className={`text-xs h-7 ${selectedServices.includes(service.value as ServiceCategory) ? 'bg-teal-600' : ''}`}
                    >
                      {service.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {userType === 'advisor' && (
              <div>
                <div className="flex items-center mb-2">
                  <Calendar size={16} className="mr-2 text-gray-500" />
                  <h4 className="text-sm font-medium">Start Timeline</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {StartTimelineOptions.map(timeline => (
                    <Button
                      key={timeline.value}
                      variant={selectedTimelines.includes(timeline.value) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleTimeline(timeline.value)}
                      className={`text-xs h-7 ${selectedTimelines.includes(timeline.value) ? 'bg-teal-600' : ''}`}
                    >
                      {timeline.label}
                    </Button>
                  ))}
                </div>
              </div>
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
