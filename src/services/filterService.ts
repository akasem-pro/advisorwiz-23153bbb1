
import { AdvisorProfile, ConsumerProfile, ServiceCategory } from '../types/userTypes';
import { mockAdvisors, mockConsumers } from '../data/mockUsers';

export const filterAdvisors = (filters: {
  languages?: string[];
  services?: ServiceCategory[];
}): AdvisorProfile[] => {
  return mockAdvisors.filter(advisor => {
    // Check language match
    if (filters.languages && filters.languages.length > 0) {
      if (!filters.languages.some(lang => advisor.languages.includes(lang))) {
        return false;
      }
    }

    // Check service match
    if (filters.services && filters.services.length > 0) {
      if (!filters.services.some(service => advisor.expertise.includes(service))) {
        return false;
      }
    }

    return true;
  });
};

export const filterConsumers = (filters: {
  startTimeline?: ConsumerProfile['startTimeline'][];
  preferredLanguage?: string[];
}): ConsumerProfile[] => {
  return mockConsumers.filter(consumer => {
    // Check timeline match
    if (filters.startTimeline && filters.startTimeline.length > 0) {
      if (!filters.startTimeline.includes(consumer.startTimeline)) {
        return false;
      }
    }

    // Check language match
    if (filters.preferredLanguage && filters.preferredLanguage.length > 0) {
      if (!filters.preferredLanguage.some(lang => consumer.preferredLanguage.includes(lang))) {
        return false;
      }
    }

    return true;
  });
};
