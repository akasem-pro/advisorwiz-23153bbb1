
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ServiceCategory } from '../../types/userTypes';
import { Search, SlidersHorizontal, ArrowDownAZ, ArrowUpAZ, FilterX, Briefcase, Languages, Banknote } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '../ui/dropdown-menu';

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
  const [filtersOpen, setFiltersOpen] = useState(false);

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
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={`Search ${userType === 'consumer' ? 'advisors' : 'clients'}...`}
            className="w-full pl-9 h-9 text-sm"
          />
        </div>
        
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
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              {sortDirection === 'asc' ? 
                <ArrowUpAZ className="h-4 w-4 mr-1" /> : 
                <ArrowDownAZ className="h-4 w-4 mr-1" />}
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => onSortChange('name')}
              className={sortOption === 'name' ? 'bg-slate-100' : ''}
            >
              <ArrowUpAZ className="h-4 w-4 mr-2" />
              Name {sortOption === 'name' && (sortDirection === 'asc' ? '(A-Z)' : '(Z-A)')}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onSortChange('assets')}
              className={sortOption === 'assets' ? 'bg-slate-100' : ''}
            >
              <Banknote className="h-4 w-4 mr-2" />
              {userType === 'consumer' ? 'Assets Under Management' : 'Investable Assets'} {' '}
              {sortOption === 'assets' && (sortDirection === 'asc' ? '(Low-High)' : '(High-Low)')}
            </DropdownMenuItem>
            {userType === 'consumer' && (
              <DropdownMenuItem 
                onClick={() => onSortChange('expertise')}
                className={sortOption === 'expertise' ? 'bg-slate-100' : ''}
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Expertise Areas {sortOption === 'expertise' && (sortDirection === 'asc' ? '(Fewer-More)' : '(More-Fewer)')}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MatchFilterSort;
