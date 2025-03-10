import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useUser, AdvisorProfile, ConsumerProfile, ServiceCategory, Chat } from '../context/UserContext';

export const useMatchingInterface = () => {
  const { userType, consumerProfile, advisorProfile, chats, setChats } = useUser();
  const [advisors, setAdvisors] = useState<AdvisorProfile[]>([]);
  const [consumers, setConsumers] = useState<ConsumerProfile[]>([]);
  const [filteredItems, setFilteredItems] = useState<AdvisorProfile[] | ConsumerProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<string[]>([]);
  const [empty, setEmpty] = useState(false);
  const [viewingMatches, setViewingMatches] = useState(false);
  const [matchedProfiles, setMatchedProfiles] = useState<(AdvisorProfile | ConsumerProfile)[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();

  const importMockData = useCallback(() => {
    import('../data/mockUsers').then(module => {
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
    if (location.pathname.includes('/matches')) {
      setViewingMatches(true);
      loadMatchedProfiles();
    } else {
      setViewingMatches(false);
    }
  }, [location]);

  useEffect(() => {
    importMockData();
  }, [importMockData]);

  const loadMatchedProfiles = useCallback(() => {
    if (!matches.length) return;
    
    let profiles: (AdvisorProfile | ConsumerProfile)[] = [];
    
    if (userType === 'consumer') {
      profiles = advisors.filter(advisor => matches.includes(advisor.id));
    } else if (userType === 'advisor') {
      profiles = consumers.filter(consumer => matches.includes(consumer.id));
    }
    
    setMatchedProfiles(profiles);
  }, [matches, userType, advisors, consumers]);

  useEffect(() => {
    if (viewingMatches) {
      loadMatchedProfiles();
    }
  }, [viewingMatches, loadMatchedProfiles]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applySearchAndFilters(term, {});
  };

  const handleFilterChange = (filters: any) => {
    applySearchAndFilters(searchTerm, filters);
  };

  const applySearchAndFilters = (term: string, filters: any) => {
    let results: AdvisorProfile[] | ConsumerProfile[] = [];
    
    if (userType === 'consumer') {
      results = advisors.filter(advisor => {
        if (term && !advisor.name.toLowerCase().includes(term.toLowerCase())) {
          return false;
        }
        
        if (filters.languages && filters.languages.length > 0) {
          if (!filters.languages.some((lang: string) => advisor.languages.includes(lang))) {
            return false;
          }
        }
        
        if (filters.services && filters.services.length > 0) {
          if (!filters.services.some((service: ServiceCategory) => advisor.expertise.includes(service))) {
            return false;
          }
        }
        
        return true;
      });
    } else {
      results = consumers.filter(consumer => {
        if (term && !consumer.name.toLowerCase().includes(term.toLowerCase())) {
          return false;
        }
        
        if (filters.preferredLanguage && filters.preferredLanguage.length > 0) {
          if (!filters.preferredLanguage.some((lang: string) => consumer.preferredLanguage.includes(lang))) {
            return false;
          }
        }
        
        if (filters.startTimeline && filters.startTimeline.length > 0) {
          if (!filters.startTimeline.includes(consumer.startTimeline)) {
            return false;
          }
        }
        
        return true;
      });
    }
    
    setFilteredItems(results);
    setCurrentIndex(0);
    setEmpty(results.length === 0);
  };

  const handleSchedule = (profileId: string) => {
    navigate('/schedule', { state: { selectedProfileId: profileId } });
  };

  const handleMessage = (profileId: string) => {
    const currentUserId = userType === 'consumer' 
      ? consumerProfile?.id 
      : advisorProfile?.id;
    
    if (!currentUserId) {
      toast.error("You need to be logged in to send messages");
      return;
    }
    
    const otherProfile = userType === 'consumer' 
      ? advisors.find(a => a.id === profileId)
      : consumers.find(c => c.id === profileId);
    
    if (!otherProfile) {
      toast.error("Could not find the selected profile");
      return;
    }
    
    if (!otherProfile.chatEnabled) {
      toast.error("Chat is not available for this user");
      return;
    }
    
    let existingChat = chats.find(chat => 
      chat.participants.includes(currentUserId) && 
      chat.participants.includes(profileId)
    );
    
    if (!existingChat) {
      const newChat: Chat = {
        id: `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        participants: [currentUserId, profileId],
        messages: [],
        lastUpdated: new Date().toISOString()
      };
      
      const updatedChats = [...chats, newChat];
      setChats(updatedChats);
      existingChat = newChat;
    }
    
    navigate(`/chat/${existingChat.id}`);
  };

  const handleSwipeRight = (item: AdvisorProfile | ConsumerProfile) => {
    setMatches(prev => [...prev, item.id]);
    nextItem();
  };

  const handleSwipeLeft = () => {
    nextItem();
  };

  const nextItem = () => {
    if (currentIndex < filteredItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setEmpty(true);
    }
  };

  const resetItems = () => {
    setCurrentIndex(0);
    setEmpty(false);
    applySearchAndFilters(searchTerm, {});
  };

  const goBackToMatching = () => {
    setViewingMatches(false);
    navigate('/');
  };

  const getCurrentItem = () => {
    return filteredItems[currentIndex];
  };

  return {
    userType,
    matches,
    empty,
    viewingMatches,
    filteredItems,
    currentIndex,
    matchedProfiles,
    handleSearch,
    handleFilterChange,
    handleSchedule,
    handleMessage,
    handleSwipeRight,
    handleSwipeLeft,
    resetItems,
    goBackToMatching,
    getCurrentItem
  };
};
