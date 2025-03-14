
import React, { useState } from 'react';
import { AdvisorProfile, ConsumerProfile, useUser } from '../../context/UserContext';
import AdvisorCard from '../advisor/AdvisorCard';
import ConsumerCard from '../consumer/ConsumerCard';
import AvailabilityViewer from '../advisor/AvailabilityViewer';
import { Calendar, CheckCircle } from 'lucide-react';

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
  const { getLeadByConsumer, updateLeadStatus, addLead, advisorProfile } = useUser();

  const toggleAvailability = () => {
    setShowAvailability(!showAvailability);
  };

  const handleSwipeRight = () => {
    // If advisor, create or update lead when matching with a consumer
    if (userType === 'advisor' && advisorProfile) {
      const consumer = item as ConsumerProfile;
      
      // Check if lead already exists
      const existingLead = getLeadByConsumer(consumer.id, advisorProfile.id);
      
      if (existingLead) {
        // Update existing lead
        if (existingLead.status === 'matched') {
          updateLeadStatus(existingLead.id, 'contacted', 'Advisor expressed interest in match');
        }
      } else {
        // Create new lead
        const matchScore = Math.round(Math.random() * 30) + 60; // Just for demo, should use real score
        addLead(
          advisorProfile.id, 
          consumer.id, 
          consumer.name, 
          matchScore, 
          'platform_match'
        );
      }
    }
    
    onSwipeRight(item);
  };

  if (!userType) {
    return null; // Don't render anything if userType is null
  }

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
          onSwipeRight={handleSwipeRight}
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
