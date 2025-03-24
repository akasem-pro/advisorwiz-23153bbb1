
import { useCallback } from 'react';
import { ServiceCategory } from '../../types/serviceTypes';
import { AdvisorProfile, ConsumerProfile } from '../../types/profileTypes';
import { useFilterOperations as useOriginalFilterOperations } from '../useFilterOperations';

/**
 * Hook to provide filtering operations for advisors and consumers
 */
export const useFilterOperations = () => {
  const { getFilteredAdvisors, getFilteredConsumers } = useOriginalFilterOperations();

  const getFilteredAdvisorsWithTypings = useCallback((filters: {
    languages?: string[];
    services?: ServiceCategory[];
  }): AdvisorProfile[] => {
    return getFilteredAdvisors(filters);
  }, [getFilteredAdvisors]);

  const getFilteredConsumersWithTypings = useCallback((filters: {
    startTimeline?: ConsumerProfile['startTimeline'][];
    preferredLanguage?: string[];
  }): ConsumerProfile[] => {
    return getFilteredConsumers(filters);
  }, [getFilteredConsumers]);

  return {
    getFilteredAdvisors: getFilteredAdvisorsWithTypings,
    getFilteredConsumers: getFilteredConsumersWithTypings
  };
};
