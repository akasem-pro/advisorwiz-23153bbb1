
import { useState } from 'react';
import { AdvisorProfile } from '../../context/UserContext';

interface UseAdvisorSearchProps {
  advisors: AdvisorProfile[];
}

interface UseAdvisorSearchReturn {
  filteredAdvisors: AdvisorProfile[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

/**
 * Hook to handle advisor search and filtering
 */
export const useAdvisorSearch = ({ advisors }: UseAdvisorSearchProps): UseAdvisorSearchReturn => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Apply search filter if there's a search query
  const filteredAdvisors = searchQuery
    ? advisors.filter(advisor => 
        advisor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        advisor.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : advisors;
  
  return {
    filteredAdvisors,
    searchQuery,
    setSearchQuery
  };
};
