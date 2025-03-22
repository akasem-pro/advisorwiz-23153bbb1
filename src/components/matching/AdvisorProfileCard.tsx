
import React from 'react';
import { AdvisorProfile } from '../../types/userTypes';
import { Badge } from '../ui/badge';
import { Star, MapPin, Clock, Award, CheckCircle, MessageCircle, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import MatchExplanation from './MatchExplanation';

interface AdvisorProfileCardProps {
  advisor: AdvisorProfile;
  matchScore?: number;
  matchExplanations?: string[];
  matchId?: string;
  onContact?: (advisorId: string) => void;
  onSchedule?: (advisorId: string) => void;
}

const AdvisorProfileCard: React.FC<AdvisorProfileCardProps> = ({
  advisor,
  matchScore,
  matchExplanations,
  matchId,
  onContact,
  onSchedule
}) => {
  const navigate = useNavigate();
  
  const viewProfile = () => {
    navigate(`/advisor/${advisor.id}`);
  };

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden bg-white">
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Profile Picture */}
          <div className="shrink-0">
            <img
              src={advisor.profilePicture || '/placeholder-avatar.png'}
              alt={advisor.name}
              className="h-16 w-16 rounded-full object-cover border"
            />
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-navy-800 mb-1">{advisor.name}</h3>
            
            <div className="text-sm text-slate-500 mb-2">
              {advisor.organization && (
                <div className="mb-1">{advisor.organization}</div>
              )}
              
              {advisor.location && (advisor.location.city || advisor.location.state) && (
                <div className="flex items-center mb-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 mr-1" />
                  <span>
                    {[advisor.location.city, advisor.location.state]
                      .filter(Boolean)
                      .join(', ')}
                  </span>
                </div>
              )}
              
              {advisor.averageRating !== undefined && (
                <div className="flex items-center mb-1">
                  <Star className="h-3.5 w-3.5 text-amber-400 mr-1 fill-amber-400" />
                  <span>
                    {advisor.averageRating.toFixed(1)} ({advisor.ratingCount} reviews)
                  </span>
                </div>
              )}
              
              {advisor.yearsOfExperience !== undefined && (
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 text-slate-400 mr-1" />
                  <span>{advisor.yearsOfExperience} years of experience</span>
                </div>
              )}
            </div>
            
            {/* Certifications */}
            {advisor.certifications && advisor.certifications.length > 0 && (
              <div className="flex items-center gap-1 mb-2">
                <Award className="h-4 w-4 text-teal-600" />
                <div className="text-xs text-slate-700">
                  {advisor.certifications.join(', ')}
                </div>
              </div>
            )}
            
            {/* Expertise Tags */}
            {advisor.expertise && advisor.expertise.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {advisor.expertise.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-slate-50">
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Match Score */}
            {matchScore !== undefined && (
              <div className="flex items-center mb-2">
                <div 
                  className={`text-white text-xs font-medium px-2 py-0.5 rounded-full mr-2 ${
                    matchScore >= 80 ? 'bg-emerald-500' :
                    matchScore >= 60 ? 'bg-teal-500' :
                    matchScore >= 40 ? 'bg-amber-500' :
                    'bg-slate-500'
                  }`}
                >
                  {matchScore}% Match
                </div>
                
                {advisor.chatEnabled && (
                  <div className="flex items-center text-xs text-teal-600">
                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                    <span>Available to chat</span>
                  </div>
                )}
              </div>
            )}
            
            {/* Match Explanation */}
            {matchScore !== undefined && matchExplanations && matchExplanations.length > 0 && (
              <MatchExplanation 
                score={matchScore} 
                explanations={matchExplanations} 
                matchId={matchId}
              />
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Button variant="outline" className="flex-1" onClick={viewProfile}>
            View Profile
          </Button>
          
          {onContact && (
            <Button 
              variant="outline" 
              className="flex items-center" 
              onClick={() => onContact(advisor.id)}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Contact
            </Button>
          )}
          
          {onSchedule && (
            <Button 
              variant="default" 
              className="flex items-center bg-teal-600 hover:bg-teal-700" 
              onClick={() => onSchedule(advisor.id)}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Schedule
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvisorProfileCard;
