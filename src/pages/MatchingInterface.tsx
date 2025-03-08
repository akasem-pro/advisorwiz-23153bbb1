
import React, { useState, useEffect } from 'react';
import { AnimatedRoute } from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AdvisorCard from '../components/advisor/AdvisorCard';
import ConsumerCard from '../components/consumer/ConsumerCard';
import { useUser, AdvisorProfile, ConsumerProfile, ServiceCategory } from '../context/UserContext';
import { Inbox, Calendar } from 'lucide-react';
import AvailabilityViewer from '../components/advisor/AvailabilityViewer';
import SearchFilters from '../components/search/SearchFilters';

const DEFAULT_CATEGORIES = [
  {
    id: 'cat-free_consultation',
    name: 'free_consultation' as const,
    label: 'Free Consultation',
    description: 'A short introductory call to discuss your financial needs.',
    duration: 30,
    enabled: true
  },
  {
    id: 'cat-discovery_call',
    name: 'discovery_call' as const,
    label: 'Discovery Call',
    description: 'An in-depth discussion to understand your financial situation.',
    duration: 60,
    enabled: true
  },
  {
    id: 'cat-investment_call',
    name: 'investment_call' as const,
    label: 'Investment Strategy',
    description: 'Review and discuss your investment portfolio and strategies.',
    duration: 60,
    enabled: true
  }
];

const mockAdvisors: AdvisorProfile[] = [
  {
    id: 'advisor-1',
    name: 'Sarah Johnson',
    organization: 'Prosperity Financial Group',
    isAccredited: true,
    website: 'https://example.com/sarahjohnson',
    testimonials: [
      {
        client: 'Michael Chen',
        text: "Sarah helped me plan for retirement and invest my savings wisely. I feel much more secure about my financial future now."
      }
    ],
    languages: ['english', 'french'],
    pricing: {
      hourlyRate: 175
    },
    assetsUnderManagement: 25000000,
    expertise: ['retirement', 'investment', 'tax'] as ServiceCategory[],
    matches: [],
    chats: [],
    availability: [
      { day: 'monday', startTime: '09:00', endTime: '11:00', isAvailable: true },
      { day: 'wednesday', startTime: '13:00', endTime: '15:00', isAvailable: true },
      { day: 'friday', startTime: '10:00', endTime: '12:00', isAvailable: true }
    ],
    chatEnabled: true,
    appointmentCategories: DEFAULT_CATEGORIES,
    appointments: [],
    onlineStatus: 'online',
    lastOnline: new Date().toISOString(),
    showOnlineStatus: true
  },
  {
    id: 'advisor-2',
    name: 'David Singh',
    organization: 'Wealth Partners',
    isAccredited: true,
    website: 'https://example.com/davidsingh',
    testimonials: [
      {
        client: 'Emma Rodriguez',
        text: "David's expertise in tax planning saved me thousands of dollars. His advice was clear and easy to follow."
      }
    ],
    languages: ['english', 'punjabi', 'hindi'],
    pricing: {
      portfolioFee: 1.2
    },
    assetsUnderManagement: 40000000,
    expertise: ['tax', 'estate', 'business'] as ServiceCategory[],
    matches: [],
    chats: [],
    availability: [
      { day: 'tuesday', startTime: '14:00', endTime: '16:00', isAvailable: true },
      { day: 'thursday', startTime: '10:00', endTime: '12:00', isAvailable: true },
      { day: 'saturday', startTime: '09:00', endTime: '12:00', isAvailable: true }
    ],
    chatEnabled: true,
    appointmentCategories: DEFAULT_CATEGORIES,
    appointments: [],
    onlineStatus: 'away',
    lastOnline: new Date().toISOString(),
    showOnlineStatus: true
  },
  {
    id: 'advisor-3',
    name: 'Michelle Lee',
    organization: 'Heritage Investments',
    isAccredited: true,
    website: 'https://example.com/michellelee',
    testimonials: [
      {
        client: 'Robert Wilson',
        text: "Michelle helped me navigate a complex inheritance situation with professionalism and clarity. Highly recommend!"
      }
    ],
    languages: ['english', 'mandarin', 'cantonese'],
    pricing: {
      hourlyRate: 150,
      portfolioFee: 0.9
    },
    assetsUnderManagement: 30000000,
    expertise: ['estate', 'investment', 'philanthropic'] as ServiceCategory[],
    matches: [],
    chats: [],
    availability: [
      { day: 'monday', startTime: '15:00', endTime: '17:00', isAvailable: true },
      { day: 'wednesday', startTime: '09:00', endTime: '11:00', isAvailable: true },
      { day: 'friday', startTime: '13:00', endTime: '15:00', isAvailable: true }
    ],
    chatEnabled: true,
    appointmentCategories: DEFAULT_CATEGORIES,
    appointments: [],
    onlineStatus: 'online',
    lastOnline: new Date().toISOString(),
    showOnlineStatus: true
  },
  {
    id: 'advisor-4',
    name: 'Carlos Martinez',
    organization: 'Future Financial',
    isAccredited: false,
    website: 'https://example.com/carlosmartinez',
    testimonials: [
      {
        client: 'Sophia Adams',
        text: "Carlos provided excellent guidance for my small business finances and helped me plan for growth."
      }
    ],
    languages: ['english', 'spanish'],
    pricing: {
      hourlyRate: 125
    },
    assetsUnderManagement: 15000000,
    expertise: ['business', 'investment', 'education'] as ServiceCategory[],
    matches: [],
    chats: [],
    chatEnabled: true,
    appointmentCategories: DEFAULT_CATEGORIES,
    appointments: [],
    onlineStatus: 'offline',
    lastOnline: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    showOnlineStatus: true
  },
  {
    id: 'advisor-5',
    name: 'Amanda Cohen',
    organization: 'Clarity Financial Services',
    isAccredited: true,
    website: 'https://example.com/amandacohen',
    testimonials: [
      {
        client: 'James Taylor',
        text: "Amanda's investment strategy helped me achieve better returns than I expected while maintaining a comfortable risk level."
      }
    ],
    languages: ['english', 'french'],
    pricing: {
      portfolioFee: 1.0
    },
    assetsUnderManagement: 35000000,
    expertise: ['investment', 'retirement', 'insurance'] as ServiceCategory[],
    matches: [],
    chats: [],
    availability: [
      { day: 'tuesday', startTime: '09:00', endTime: '11:00', isAvailable: true },
      { day: 'thursday', startTime: '14:00', endTime: '16:00', isAvailable: true }
    ],
    chatEnabled: true,
    appointmentCategories: DEFAULT_CATEGORIES,
    appointments: [],
    onlineStatus: 'online',
    lastOnline: new Date().toISOString(),
    showOnlineStatus: true
  }
];

const mockConsumers: ConsumerProfile[] = [
  {
    id: 'consumer-1',
    name: 'Alex Johnson',
    age: 35,
    status: 'employed',
    investableAssets: 250000,
    riskTolerance: 'medium',
    preferredCommunication: ['email', 'phone'],
    preferredLanguage: ['english', 'spanish'],
    startTimeline: 'immediately',
    matches: [],
    chats: [],
    chatEnabled: true,
    appointments: [],
    onlineStatus: 'online',
    lastOnline: new Date().toISOString(),
    showOnlineStatus: true
  },
  {
    id: 'consumer-2',
    name: 'Taylor Smith',
    age: 42,
    status: 'self-employed',
    investableAssets: 500000,
    riskTolerance: 'high',
    preferredCommunication: ['video', 'inPerson'],
    preferredLanguage: ['english', 'french'],
    startTimeline: 'next_3_months',
    matches: [],
    chats: [],
    chatEnabled: true,
    appointments: [],
    onlineStatus: 'away',
    lastOnline: new Date().toISOString(),
    showOnlineStatus: true
  },
  {
    id: 'consumer-3',
    name: 'Jordan Lee',
    age: 29,
    status: 'employed',
    investableAssets: 150000,
    riskTolerance: 'low',
    preferredCommunication: ['email'],
    preferredLanguage: ['english', 'mandarin'],
    startTimeline: 'next_6_months',
    matches: [],
    chats: [],
    chatEnabled: true,
    appointments: [],
    onlineStatus: 'offline',
    lastOnline: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    showOnlineStatus: false
  },
  {
    id: 'consumer-4',
    name: 'Morgan Chen',
    age: 55,
    status: 'retired',
    investableAssets: 1200000,
    riskTolerance: 'medium',
    preferredCommunication: ['phone', 'inPerson'],
    preferredLanguage: ['english', 'cantonese'],
    startTimeline: 'not_sure',
    matches: [],
    chats: [],
    chatEnabled: true,
    appointments: [],
    onlineStatus: 'offline',
    lastOnline: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    showOnlineStatus: true
  }
];

const MatchingInterface: React.FC = () => {
  const { userType } = useUser();
  const [advisors, setAdvisors] = useState<AdvisorProfile[]>([]);
  const [consumers, setConsumers] = useState<ConsumerProfile[]>([]);
  const [filteredItems, setFilteredItems] = useState<AdvisorProfile[] | ConsumerProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<string[]>([]);
  const [empty, setEmpty] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (userType === 'consumer') {
      setAdvisors(mockAdvisors);
      setFilteredItems(mockAdvisors);
    } else if (userType === 'advisor') {
      setConsumers(mockConsumers);
      setFilteredItems(mockConsumers);
    }
  }, [userType]);

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

  const handleSwipeRight = (item: AdvisorProfile | ConsumerProfile) => {
    setMatches(prev => [...prev, item.id]);
    nextItem();
  };

  const handleSwipeLeft = (item: AdvisorProfile | ConsumerProfile) => {
    nextItem();
  };

  const nextItem = () => {
    if (currentIndex < filteredItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAvailability(false);
    } else {
      setEmpty(true);
    }
  };

  const resetItems = () => {
    setCurrentIndex(0);
    setEmpty(false);
    setShowAvailability(false);
    applySearchAndFilters(searchTerm, {});
  };

  const toggleAvailability = () => {
    setShowAvailability(!showAvailability);
  };

  const getCurrentItem = () => {
    return filteredItems[currentIndex];
  };

  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4">
                {userType === 'consumer' ? 'Find Your Advisor' : 'Find Potential Clients'}
              </h1>
              <p className="text-slate-600 max-w-2xl mx-auto">
                {userType === 'consumer' 
                  ? "Swipe right on advisors you'd like to connect with. If they match with you too, you can start chatting." 
                  : "Review potential clients who might benefit from your services."}
              </p>
            </div>

            <SearchFilters 
              userType={userType as 'consumer' | 'advisor'}
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
            />

            {matches.length > 0 && (
              <div className="mb-8 p-4 bg-teal-50 border border-teal-200 rounded-lg text-center">
                <p className="text-teal-800 font-medium">
                  You have {matches.length} match{matches.length !== 1 ? 'es' : ''}!
                </p>
                <p className="text-teal-600 text-sm mt-1">
                  Check your messages to connect with them.
                </p>
              </div>
            )}

            <div className="max-w-md mx-auto">
              {!empty && filteredItems.length > 0 ? (
                <div>
                  {userType === 'consumer' ? (
                    <AdvisorCard 
                      advisor={getCurrentItem() as AdvisorProfile} 
                      onSwipeRight={handleSwipeRight} 
                      onSwipeLeft={handleSwipeLeft} 
                    />
                  ) : (
                    <ConsumerCard 
                      consumer={getCurrentItem() as ConsumerProfile}
                      onSwipeRight={handleSwipeRight}
                      onSwipeLeft={handleSwipeLeft}
                    />
                  )}
                  
                  {userType === 'consumer' && (getCurrentItem() as AdvisorProfile).availability && (
                    <div className="mt-4">
                      <button
                        onClick={toggleAvailability}
                        className="btn-outline w-full flex items-center justify-center"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {showAvailability ? 'Hide Availability' : 'View Availability & Book'}
                      </button>
                      
                      {showAvailability && (
                        <div className="mt-4 glass-card rounded-2xl p-6">
                          <AvailabilityViewer 
                            availability={(getCurrentItem() as AdvisorProfile).availability || []}
                            advisorName={(getCurrentItem() as AdvisorProfile).name}
                            advisorId={(getCurrentItem() as AdvisorProfile).id}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="glass-card rounded-2xl p-10 text-center">
                  <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Inbox className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-navy-900 mb-2">
                    No Matching Profiles
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {empty 
                      ? "You've reviewed all available profiles for now. Adjust your filters or check back later."
                      : "No profiles match your current filters. Try adjusting your search criteria."}
                  </p>
                  <button
                    onClick={resetItems}
                    className="btn-outline"
                  >
                    {empty ? "Start Over" : "Clear Filters"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default MatchingInterface;
