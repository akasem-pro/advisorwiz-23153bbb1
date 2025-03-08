
import React, { useState } from 'react';
import { Star, User, DollarSign, Briefcase, Globe, MessageCircle, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { AdvisorProfile } from '../../context/UserContext';

interface AdvisorCardProps {
  advisor: AdvisorProfile;
  onSwipeRight: (advisor: AdvisorProfile) => void;
  onSwipeLeft: (advisor: AdvisorProfile) => void;
}

const AdvisorCard: React.FC<AdvisorCardProps> = ({ advisor, onSwipeRight, onSwipeLeft }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [animation, setAnimation] = useState<string | null>(null);

  const handleSwipeRight = () => {
    setAnimation('swipe-right');
    setTimeout(() => {
      onSwipeRight(advisor);
      setAnimation(null);
    }, 500);
  };

  const handleSwipeLeft = () => {
    setAnimation('swipe-left');
    setTimeout(() => {
      onSwipeLeft(advisor);
      setAnimation(null);
    }, 500);
  };

  return (
    <div 
      className={`w-full max-w-md mx-auto relative overflow-hidden glass-card rounded-2xl transition-transform ${
        animation ? `animate-${animation}` : ''
      }`}
    >
      <div className="relative p-6">
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 bg-navy-100 rounded-full overflow-hidden border-2 border-teal-400">
            {advisor.profilePicture ? (
              <img 
                src={advisor.profilePicture} 
                alt={advisor.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="absolute inset-0 w-full h-full p-4 text-navy-500" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-serif font-semibold text-navy-900">{advisor.name}</h3>
            <p className="text-slate-600">{advisor.organization}</p>
            <div className="flex items-center mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  className={`w-4 h-4 ${star <= 4 ? 'text-gold-500 fill-gold-500' : 'text-slate-300'}`}
                />
              ))}
              <span className="ml-1 text-sm text-slate-600">(32 reviews)</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-teal-600" />
            <span className="text-sm text-slate-700">
              {advisor.pricing.hourlyRate 
                ? `$${advisor.pricing.hourlyRate}/hr` 
                : `${advisor.pricing.portfolioFee}% portfolio fee`}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-teal-600" />
            <span className="text-sm text-slate-700">
              ${(advisor.assetsUnderManagement / 1000000).toFixed(1)}M AUM
            </span>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-medium text-navy-800">Areas of Expertise</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {advisor.expertise.map((area, index) => (
              <span 
                key={index}
                className="inline-block px-3 py-1 bg-navy-50 text-navy-700 rounded-full text-xs font-medium"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-medium text-navy-800">Languages</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {advisor.languages.map((language, index) => (
              <span 
                key={index}
                className="inline-block px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium"
              >
                {language}
              </span>
            ))}
          </div>
        </div>

        <button 
          className="mt-4 flex items-center text-teal-600 font-medium focus:outline-none"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? (
            <>
              <span>Show less</span>
              <ChevronUp className="ml-1 w-4 h-4" />
            </>
          ) : (
            <>
              <span>Show more</span>
              <ChevronDown className="ml-1 w-4 h-4" />
            </>
          )}
        </button>

        {showDetails && (
          <div className="mt-4 animate-fade-in">
            <div className="mt-4">
              <h4 className="font-medium text-navy-800">Testimonials</h4>
              {advisor.testimonials.length > 0 ? (
                <div className="mt-2 bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm italic text-slate-700">"{advisor.testimonials[0].text}"</p>
                  <p className="mt-2 text-sm font-medium text-navy-700">- {advisor.testimonials[0].client}</p>
                </div>
              ) : (
                <p className="text-sm text-slate-500 mt-2">No testimonials yet</p>
              )}
            </div>

            {advisor.website && (
              <div className="mt-4 flex items-center">
                <Globe className="w-5 h-5 text-teal-600 mr-2" />
                <a 
                  href={advisor.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:underline"
                >
                  Personal Website
                </a>
              </div>
            )}

            {advisor.isAccredited && (
              <div className="mt-4 flex items-center text-navy-800">
                <Award className="w-5 h-5 text-gold-500 mr-2" />
                <span>Certified Financial Advisor</span>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button 
            onClick={handleSwipeLeft}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:border-red-400 hover:text-red-500 transition-colors shadow-sm"
            aria-label="Decline"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button 
            onClick={handleSwipeRight}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors shadow-sm"
            aria-label="Accept"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvisorCard;
