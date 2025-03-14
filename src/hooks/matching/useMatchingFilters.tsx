
import { AdvisorProfile, ConsumerProfile, ServiceCategory } from '../../context/UserContext';

export const useMatchingFilters = (
  userType: string | null,
  advisors: AdvisorProfile[],
  consumers: ConsumerProfile[],
  setFilteredItems: (items: AdvisorProfile[] | ConsumerProfile[]) => void,
  setCurrentIndex: (index: number) => void,
  setEmpty: (empty: boolean) => void
) => {
  const handleSearch = (term: string) => {
    applySearchAndFilters(term, {});
  };

  const handleFilterChange = (filters: any) => {
    applySearchAndFilters('', filters);
  };

  const applySearchAndFilters = (term: string, filters: any) => {
    let results: AdvisorProfile[] | ConsumerProfile[] = [];
    
    if (userType === 'consumer') {
      results = advisors.filter(advisor => {
        if (term && !advisor.name.toLowerCase().includes(term.toLowerCase())) {
          return false;
        }
        
        if (filters.languages && filters.languages.length > 0) {
          if (!filters.languages.some((lang: string) => advisor.languages.includes(lang))) {
            return false;
          }
        }
        
        if (filters.services && filters.services.length > 0) {
          if (!filters.services.some((service: ServiceCategory) => advisor.expertise.includes(service))) {
            return false;
          }
        }
        
        return true;
      });
    } else {
      results = consumers.filter(consumer => {
        if (term && !consumer.name.toLowerCase().includes(term.toLowerCase())) {
          return false;
        }
        
        if (filters.preferredLanguage && filters.preferredLanguage.length > 0) {
          if (!filters.preferredLanguage.some((lang: string) => consumer.preferredLanguage.includes(lang))) {
            return false;
          }
        }
        
        if (filters.startTimeline && filters.startTimeline.length > 0) {
          if (!filters.startTimeline.includes(consumer.startTimeline)) {
            return false;
          }
        }
        
        return true;
      });
    }
    
    setFilteredItems(results);
    setCurrentIndex(0);
    setEmpty(results.length === 0);
  };

  return {
    handleSearch,
    handleFilterChange,
    applySearchAndFilters
  };
};
