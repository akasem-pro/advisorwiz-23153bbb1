
import React, { useState } from 'react';
import { AdvisorProfile, ConsumerProfile } from '../../context/UserContext';
import AdvisorCard from '../advisor/AdvisorCard';
import ConsumerCard from '../consumer/ConsumerCard';
import AvailabilityViewer from '../advisor/AvailabilityViewer';
import { Calendar } from 'lucide-react';

interface MatchCardProps {
  item: AdvisorProfile | ConsumerProfile;
  userType: 'consumer' | 'advisor' | null;
  onSwipeRight: (item: AdvisorProfile | ConsumerProfile) => void;
  onSwipeLeft: (item: AdvisorProfile | ConsumerProfile) => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ 
  item, 
  userType, 
  onSwipeRight, 
  onSwipeLeft 
}) => {
  const [showAvailability, setShowAvailability] = useState(false);

  const toggleAvailability = () => {
    setShowAvailability(!showAvailability);
  };

  return (
    <div>
      {userType === 'consumer' ? (
        <AdvisorCard 
          advisor={item as AdvisorProfile} 
          onSwipeRight={onSwipeRight} 
          onSwipeLeft={onSwipeLeft} 
        />
      ) : (
        <ConsumerCard 
          consumer={item as ConsumerProfile}
          onSwipeRight={onSwipeRight}
          onSwipeLeft={onSwipeLeft}
        />
      )}
      
      {userType === 'consumer' && (item as AdvisorProfile).availability && (
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
                availability={(item as AdvisorProfile).availability || []}
                advisorName={(item as AdvisorProfile).name}
                advisorId={(item as AdvisorProfile).id}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MatchCard;
