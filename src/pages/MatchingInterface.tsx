
import React, { useState, useEffect } from 'react';
import { AnimatedRoute } from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AdvisorCard from '../components/advisor/AdvisorCard';
import { useUser, AdvisorProfile } from '../context/UserContext';
import { Inbox } from 'lucide-react';

// Mock data for advisors
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
        text: 'Sarah helped me plan for retirement and invest my savings wisely. I feel much more secure about my financial future now.'
      }
    ],
    languages: ['english', 'french'],
    pricing: {
      hourlyRate: 175
    },
    assetsUnderManagement: 25000000,
    expertise: ['retirement', 'investment', 'tax'],
    matches: [],
    chats: []
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
        text: 'David's expertise in tax planning saved me thousands of dollars. His advice was clear and easy to follow.'
      }
    ],
    languages: ['english', 'punjabi', 'hindi'],
    pricing: {
      portfolioFee: 1.2
    },
    assetsUnderManagement: 40000000,
    expertise: ['tax', 'estate', 'business'],
    matches: [],
    chats: []
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
        text: 'Michelle helped me navigate a complex inheritance situation with professionalism and clarity. Highly recommend!'
      }
    ],
    languages: ['english', 'mandarin', 'cantonese'],
    pricing: {
      hourlyRate: 150,
      portfolioFee: 0.9
    },
    assetsUnderManagement: 30000000,
    expertise: ['estate', 'investment', 'philanthropic'],
    matches: [],
    chats: []
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
        text: 'Carlos provided excellent guidance for my small business finances and helped me plan for growth.'
      }
    ],
    languages: ['english', 'spanish'],
    pricing: {
      hourlyRate: 125
    },
    assetsUnderManagement: 15000000,
    expertise: ['business', 'investment', 'education'],
    matches: [],
    chats: []
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
        text: 'Amanda's investment strategy helped me achieve better returns than I expected while maintaining a comfortable risk level.'
      }
    ],
    languages: ['english', 'french'],
    pricing: {
      portfolioFee: 1.0
    },
    assetsUnderManagement: 35000000,
    expertise: ['investment', 'retirement', 'insurance'],
    matches: [],
    chats: []
  }
];

const MatchingInterface: React.FC = () => {
  const { userType } = useUser();
  const [advisors, setAdvisors] = useState<AdvisorProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<string[]>([]);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch advisors from an API with filtering
    setAdvisors(mockAdvisors);
  }, []);

  const handleSwipeRight = (advisor: AdvisorProfile) => {
    setMatches(prev => [...prev, advisor.id]);
    nextAdvisor();
  };

  const handleSwipeLeft = (advisor: AdvisorProfile) => {
    nextAdvisor();
  };

  const nextAdvisor = () => {
    if (currentIndex < advisors.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setEmpty(true);
    }
  };

  const resetAdvisors = () => {
    setCurrentIndex(0);
    setEmpty(false);
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
                  ? 'Swipe right on advisors you'd like to connect with. If they match with you too, you can start chatting.' 
                  : 'Review potential clients who might benefit from your services.'}
              </p>
            </div>

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
              {!empty && advisors.length > 0 ? (
                <AdvisorCard 
                  advisor={advisors[currentIndex]} 
                  onSwipeRight={handleSwipeRight} 
                  onSwipeLeft={handleSwipeLeft} 
                />
              ) : (
                <div className="glass-card rounded-2xl p-10 text-center">
                  <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Inbox className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-navy-900 mb-2">
                    No More Profiles
                  </h3>
                  <p className="text-slate-600 mb-6">
                    You've reviewed all available profiles for now. Check back later for more matches.
                  </p>
                  <button
                    onClick={resetAdvisors}
                    className="btn-outline"
                  >
                    Start Over
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
