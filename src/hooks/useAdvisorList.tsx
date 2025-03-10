
import { useState } from 'react';
import { AdvisorProfile, FinancialFirm, useUser } from '../context/UserContext';

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
  const { getFilteredAdvisors } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get all advisors first
  const allAdvisors = getFilteredAdvisors({});
  
  // If a firm is provided, filter down to just the firm's advisors
  const advisors = firm 
    ? allAdvisors.filter(advisor => firm.advisorIds.includes(advisor.id))
    : allAdvisors;
  
  // Apply search filter if there's a search query
  const filteredAdvisors = searchQuery
    ? advisors.filter(advisor => 
        advisor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        advisor.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : advisors;
  
  return {
    advisors,
    filteredAdvisors,
    searchQuery,
    setSearchQuery
  };
};
