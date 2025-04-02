
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useUser, AdvisorProfile, ConsumerProfile } from '../../context/UserContext';

export const useMatchingState = () => {
  const { userType, consumerProfile, advisorProfile } = useUser();
  const [advisors, setAdvisors] = useState<AdvisorProfile[]>([]);
  const [consumers, setConsumers] = useState<ConsumerProfile[]>([]);
  const [filteredItems, setFilteredItems] = useState<AdvisorProfile[] | ConsumerProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<string[]>([]);
  const [empty, setEmpty] = useState(false);
  const [viewingMatches, setViewingMatches] = useState(false);
  const [matchedProfiles, setMatchedProfiles] = useState<(AdvisorProfile | ConsumerProfile)[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Memoized import to prevent recreating the function on each render
  const importMockData = useCallback(() => {
    import('../../data/mockUsers').then(module => {
      if (userType === 'consumer') {
        setAdvisors(module.mockAdvisors);
        setFilteredItems(module.mockAdvisors);
        
        if (consumerProfile?.matches) {
          setMatches(consumerProfile.matches);
        }
      } else if (userType === 'advisor') {
        setConsumers(module.mockConsumers);
        setFilteredItems(module.mockConsumers);
        
        if (advisorProfile?.matches) {
          setMatches(advisorProfile.matches);
        }
      } else {
        setFilteredItems([]);
        setMatches([]);
      }
    });
  }, [userType, consumerProfile, advisorProfile]);

  // Run data import only when dependencies change
  useEffect(() => {
    importMockData();
  }, [importMockData]);
  
  // Memoized state setter functions to prevent recreation on each render
  const stateSetters = useMemo(() => ({
    setFilteredItems,
    setCurrentIndex,
    setMatches,
    setEmpty,
    setViewingMatches,
    setMatchedProfiles,
    setSearchTerm
  }), []);
  
  // Batch state updates to reduce re-renders
  const updateMatchingState = useCallback((updates: {
    filteredItems?: AdvisorProfile[] | ConsumerProfile[];
    currentIndex?: number;
    matches?: string[];
    empty?: boolean;
    viewingMatches?: boolean;
    matchedProfiles?: (AdvisorProfile | ConsumerProfile)[];
    searchTerm?: string;
  }) => {
    // Use a microtask to batch these updates
    queueMicrotask(() => {
      Object.entries(updates).forEach(([key, value]) => {
        switch (key) {
          case 'filteredItems':
            stateSetters.setFilteredItems(value as AdvisorProfile[] | ConsumerProfile[]);
            break;
          case 'currentIndex':
            stateSetters.setCurrentIndex(value as number);
            break;
          case 'matches':
            stateSetters.setMatches(value as string[]);
            break;
          case 'empty':
            stateSetters.setEmpty(value as boolean);
            break;
          case 'viewingMatches':
            stateSetters.setViewingMatches(value as boolean);
            break;
          case 'matchedProfiles':
            stateSetters.setMatchedProfiles(value as (AdvisorProfile | ConsumerProfile)[]);
            break;
          case 'searchTerm':
            stateSetters.setSearchTerm(value as string);
            break;
        }
      });
    });
  }, [stateSetters]);

  // Computed/derived state
  const isUserTypeValid = useMemo(() => 
    userType === 'consumer' || userType === 'advisor', 
  [userType]);

  return {
    userType,
    advisors,
    consumers,
    filteredItems,
    setFilteredItems,
    currentIndex,
    setCurrentIndex,
    matches,
    setMatches,
    empty,
    setEmpty,
    viewingMatches,
    setViewingMatches,
    matchedProfiles,
    setMatchedProfiles,
    searchTerm,
    setSearchTerm,
    // New optimized helpers
    updateMatchingState,
    isUserTypeValid
  };
};
