
import { useState, useEffect, useCallback } from 'react';
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

  useEffect(() => {
    importMockData();
  }, [importMockData]);

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
    setSearchTerm
  };
};
