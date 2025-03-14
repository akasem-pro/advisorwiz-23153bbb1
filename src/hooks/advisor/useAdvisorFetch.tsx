
import { AdvisorProfile, FinancialFirm, useUser } from '../../context/UserContext';

interface UseAdvisorFetchProps {
  firm?: FinancialFirm;
}

interface UseAdvisorFetchReturn {
  advisors: AdvisorProfile[];
}

/**
 * Hook to fetch advisors, optionally filtered by firm
 */
export const useAdvisorFetch = ({ firm }: UseAdvisorFetchProps): UseAdvisorFetchReturn => {
  const { getFilteredAdvisors } = useUser();
  
  // Get all advisors first
  const allAdvisors = getFilteredAdvisors({});
  
  // If a firm is provided, filter down to just the firm's advisors
  const advisors = firm 
    ? allAdvisors.filter(advisor => firm.advisorIds.includes(advisor.id))
    : allAdvisors;
  
  return {
    advisors
  };
};
