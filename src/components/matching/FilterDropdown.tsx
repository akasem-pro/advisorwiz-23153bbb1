
import React from 'react';
import { SlidersHorizontal, Languages, Briefcase } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '../ui/dropdown-menu';
import { ServiceCategoryOptions, LanguageOptions } from './FilterOptions';

interface FilterDropdownProps {
  userType: 'consumer' | 'advisor' | null;
  selectedExpertise: string[];
  onExpertiseChange: (expertise: string[]) => void;
  selectedLanguages: string[];
  onLanguageChange: (languages: string[]) => void;
  activeFilterCount: number;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  userType,
  selectedExpertise,
  onExpertiseChange,
  selectedLanguages,
  onLanguageChange,
  activeFilterCount,
}) => {
  const toggleExpertise = (value: string) => {
    if (selectedExpertise.includes(value)) {
      onExpertiseChange(selectedExpertise.filter(v => v !== value));
    } else {
      onExpertiseChange([...selectedExpertise, value]);
    }
  };

  const toggleLanguage = (value: string) => {
    if (selectedLanguages.includes(value)) {
      onLanguageChange(selectedLanguages.filter(v => v !== value));
    } else {
      onLanguageChange([...selectedLanguages, value]);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9">
          <SlidersHorizontal className="h-4 w-4 mr-1" />
          Filter
          {activeFilterCount > 0 && (
            <span className="ml-1 text-xs bg-teal-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Filter Matches</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="flex items-center">
          <Languages className="h-4 w-4 mr-2 text-gray-500" />
          Languages
        </DropdownMenuLabel>
        {LanguageOptions.map((lang) => (
          <DropdownMenuCheckboxItem
            key={lang.value}
            checked={selectedLanguages.includes(lang.value)}
            onCheckedChange={() => toggleLanguage(lang.value)}
          >
            {lang.label}
          </DropdownMenuCheckboxItem>
        ))}
        
        {userType === 'consumer' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
              Expertise
            </DropdownMenuLabel>
            {ServiceCategoryOptions.map((service) => (
              <DropdownMenuCheckboxItem
                key={service.value}
                checked={selectedExpertise.includes(service.value)}
                onCheckedChange={() => toggleExpertise(service.value)}
              >
                {service.label}
              </DropdownMenuCheckboxItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
