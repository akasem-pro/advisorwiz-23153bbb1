
import React from 'react';
import { X, Languages, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import FilterGroup from './FilterGroup';
import { ServiceCategoryOptions, LanguageOptions, StartTimelineOptions } from './SearchFilterOptions';
import { ServiceCategory } from '../../types/userTypes';

interface FilterPanelProps {
  userType: 'consumer' | 'advisor' | null;
  selectedLanguages: string[];
  selectedServices: ServiceCategory[];
  selectedTimelines: string[];
  toggleLanguage: (language: string) => void;
  toggleService: (service: ServiceCategory) => void;
  toggleTimeline: (timeline: string) => void;
  onClose: () => void;
  onApply: () => void;
  onClear: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  userType,
  selectedLanguages,
  selectedServices,
  selectedTimelines,
  toggleLanguage,
  toggleService,
  toggleTimeline,
  onClose,
  onApply,
  onClear
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-navy-800">Filter Results</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-7 px-2">
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
            icon={Calendar}
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
          <Button variant="outline" size="sm" onClick={onClear}>
            Clear All
          </Button>
          <Button size="sm" onClick={onApply} className="bg-teal-600 hover:bg-teal-700">
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
