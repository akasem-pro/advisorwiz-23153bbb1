
import { useCallback } from 'react';
import { AdvisorProfile, ConsumerProfile } from '../../context/UserContext';

export const useMatchedProfiles = (
  userType: string | null,
  matches: string[],
  advisors: AdvisorProfile[],
  consumers: ConsumerProfile[],
  setMatchedProfiles: (profiles: (AdvisorProfile | ConsumerProfile)[]) => void
) => {
  const loadMatchedProfiles = useCallback(() => {
    if (!matches.length) return;
    
    let profiles: (AdvisorProfile | ConsumerProfile)[] = [];
    
    if (userType === 'consumer') {
      profiles = advisors.filter(advisor => matches.includes(advisor.id));
    } else if (userType === 'advisor') {
      profiles = consumers.filter(consumer => matches.includes(consumer.id));
    }
    
    setMatchedProfiles(profiles);
  }, [matches, userType, advisors, consumers, setMatchedProfiles]);

  return { loadMatchedProfiles };
};
