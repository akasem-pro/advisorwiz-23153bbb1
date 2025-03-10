
import { AdvisorProfile, ConsumerProfile, ServiceCategory } from '../types/userTypes';
import { filterAdvisors, filterConsumers } from '../services/filterService';

/**
 * Hook that provides filtering operations
 */
export const useFilterOperations = () => {
  const getFilteredAdvisors = (filters: {
    languages?: string[];
    services?: ServiceCategory[];
  }) => {
    return filterAdvisors(filters);
  };

  const getFilteredConsumers = (filters: {
    startTimeline?: ConsumerProfile['startTimeline'][];
    preferredLanguage?: string[];
  }) => {
    return filterConsumers(filters);
  };

  return {
    getFilteredAdvisors,
    getFilteredConsumers
  };
};
