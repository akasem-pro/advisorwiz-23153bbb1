import { useState } from 'react';
import { AdvisorProfile, ConsumerProfile } from '../../types/userTypes';

interface UseMatchSearchProps {
  profiles: (AdvisorProfile | ConsumerProfile)[];
  userType: 'consumer' | 'advisor' | null;
}

interface UseMatchSearchReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedExpertise: string[];
  setSelectedExpertise: (expertise: string[]) => void;
  selectedLanguages: string[];
  setSelectedLanguages: (languages: string[]) => void;
  applySearchFilters: (profiles: (AdvisorProfile | ConsumerProfile)[]) => (AdvisorProfile | ConsumerProfile)[];
}

export const useMatchSearch = ({
  profiles,
  userType
}: UseMatchSearchProps): UseMatchSearchReturn => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Function to apply search and expertise/language filters
  const applySearchFilters = (itemsToFilter: (AdvisorProfile | ConsumerProfile)[]) => {
    return itemsToFilter.filter(profile => {
      // Apply search term filter
      if (searchTerm) {
        if (!profile.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
      }

      // Apply expertise filter (for advisors when user is consumer)
      if (userType === 'consumer' && selectedExpertise.length > 0) {
        const advisorProfile = profile as AdvisorProfile;
        if (!selectedExpertise.some(exp => 
          advisorProfile.expertise && advisorProfile.expertise.includes(exp as any)
        )) {
          return false;
        }
      }

      // Apply language filter
      if (selectedLanguages.length > 0) {
        if (userType === 'consumer') {
          const advisorProfile = profile as AdvisorProfile;
          if (!selectedLanguages.some(lang => 
            advisorProfile.languages && advisorProfile.languages.includes(lang)
          )) {
            return false;
          }
        } else {
          const consumerProfile = profile as ConsumerProfile;
          if (!selectedLanguages.some(lang => 
            consumerProfile.preferredLanguage && consumerProfile.preferredLanguage.includes(lang)
          )) {
            return false;
          }
        }
      }

      return true;
    });
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedExpertise,
    setSelectedExpertise,
    selectedLanguages,
    setSelectedLanguages,
    applySearchFilters
  };
};
