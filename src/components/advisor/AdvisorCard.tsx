
import React, { useState } from 'react';
import { Star, User, DollarSign, Briefcase, Globe, Heart, Award, ChevronDown, ChevronUp, CircleDot, X } from 'lucide-react';
import { AdvisorProfile } from '../../context/UserContext';
import { formatDistanceToNow } from 'date-fns';

interface AdvisorCardProps {
  advisor: AdvisorProfile;
  onSwipeRight: (advisor: AdvisorProfile) => void;
  onSwipeLeft: (advisor: AdvisorProfile) => void;
}

const AdvisorCard: React.FC<AdvisorCardProps> = ({ advisor, onSwipeRight, onSwipeLeft }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [animation, setAnimation] = useState<string | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const handleSwipeRight = () => {
    setSwipeDirection('right');
    setAnimation('swipe-right');
    setTimeout(() => {
      onSwipeRight(advisor);
      setAnimation(null);
      setSwipeDirection(null);
    }, 500);
  };

  const handleSwipeLeft = () => {
    setSwipeDirection('left');
    setAnimation('swipe-left');
    setTimeout(() => {
      onSwipeLeft(advisor);
      setAnimation(null);
      setSwipeDirection(null);
    }, 500);
  };

  const renderOnlineStatus = (status: 'online' | 'offline' | 'away') => {
    switch (status) {
      case 'online': 
        return (
          <span className="flex items-center">
            <CircleDot className="w-3 h-3 mr-1 text-green-500" />
            <span className="text-green-600">Online</span>
          </span>
        );
      case 'away': 
        return (
          <span className="flex items-center">
            <CircleDot className="w-3 h-3 mr-1 text-amber-500" />
            <span className="text-amber-600">Away</span>
          </span>
        );
      case 'offline': 
        return (
          <span className="flex items-center">
            <CircleDot className="w-3 h-3 mr-1 text-slate-400" />
            <span className="text-slate-500">Offline</span>
          </span>
        );
    }
  };

  const formatLastOnline = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "Unknown";
    }
  };

  return (
    <div 
      className={`w-full max-w-md mx-auto relative overflow-hidden glass-card rounded-2xl transition-transform ${
        animation ? `animate-${animation}` : ''
      }`}
    >
      {swipeDirection && (
        <div 
          className={`absolute top-6 ${swipeDirection === 'left' ? 'left-6' : 'right-6'} z-10 bg-${swipeDirection === 'left' ? 'red-500' : 'teal-500'} text-white p-2 rounded-lg uppercase text-xl font-bold transform ${swipeDirection === 'left' ? 'rotate-[-20deg]' : 'rotate-[20deg]'} opacity-90 border-2 border-white shadow-md`}
        >
          {swipeDirection === 'left' ? 'Skip' : 'Connect'}
        </div>
      )}
      
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
            {advisor.showOnlineStatus && (
              <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                advisor.onlineStatus === 'online' ? 'bg-green-500' : 
                advisor.onlineStatus === 'away' ? 'bg-amber-500' : 'bg-slate-400'
              }`}></div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-serif font-semibold text-navy-900">{advisor.name}</h3>
            <p className="text-slate-600">{advisor.organization}</p>
            {advisor.showOnlineStatus && (
              <div className="mt-1 flex items-center text-sm">
                {renderOnlineStatus(advisor.onlineStatus)}
                <span className="mx-1.5 text-slate-400">•</span>
                <span className="text-slate-500">Last seen {formatLastOnline(advisor.lastOnline)}</span>
              </div>
            )}
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
            aria-label="Skip"
          >
            <X className="w-6 h-6" />
          </button>
          
          <button 
            onClick={handleSwipeRight}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors shadow-sm"
            aria-label="Connect"
          >
            <Heart className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvisorCard;
