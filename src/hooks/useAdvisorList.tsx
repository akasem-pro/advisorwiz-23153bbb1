
import { AdvisorProfile, FinancialFirm } from '../context/UserContext';
import { useAdvisorFetch } from './advisor/useAdvisorFetch';
import { useAdvisorSearch } from './advisor/useAdvisorSearch';

interface UseAdvisorListProps {
  firm?: FinancialFirm;
}

interface UseAdvisorListReturn {
  advisors: AdvisorProfile[];
  filteredAdvisors: AdvisorProfile[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

/**
 * Hook to fetch, filter, and manage advisor lists
 */
export const useAdvisorList = ({ firm }: UseAdvisorListProps): UseAdvisorListReturn => {
  // Fetch advisors
  const { advisors } = useAdvisorFetch({ firm });
  
  // Handle search filtering
  const { filteredAdvisors, searchQuery, setSearchQuery } = useAdvisorSearch({ advisors });
  
  return {
    advisors,
    filteredAdvisors,
    searchQuery,
    setSearchQuery
  };
};
