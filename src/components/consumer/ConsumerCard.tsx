
import React, { useState } from 'react';
import { ConsumerProfile } from '../../context/UserContext';
import { Clock, CreditCard, TrendingUp, Languages, Check, X, CircleDot, Heart } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ConsumerCardProps {
  consumer: ConsumerProfile;
  onSwipeRight: (consumer: ConsumerProfile) => void;
  onSwipeLeft: (consumer: ConsumerProfile) => void;
}

const ConsumerCard: React.FC<ConsumerCardProps> = ({ consumer, onSwipeRight, onSwipeLeft }) => {
  const [animation, setAnimation] = useState<string | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleSwipeRight = () => {
    setSwipeDirection('right');
    setAnimation('swipe-right');
    setTimeout(() => {
      onSwipeRight(consumer);
      setAnimation(null);
      setSwipeDirection(null);
    }, 500);
  };

  const handleSwipeLeft = () => {
    setSwipeDirection('left');
    setAnimation('swipe-left');
    setTimeout(() => {
      onSwipeLeft(consumer);
      setAnimation(null);
      setSwipeDirection(null);
    }, 500);
  };

  const renderTimelineText = (timeline: string | null) => {
    switch (timeline) {
      case 'immediately': return 'Wants to start immediately';
      case 'next_3_months': return 'Wants to start in the next 3 months';
      case 'next_6_months': return 'Wants to start in the next 6 months';
      case 'not_sure': return 'Not sure when to start';
      default: return 'Timeline not specified';
    }
  };

  const renderRiskLevel = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low': return 'Low risk tolerance';
      case 'medium': return 'Medium risk tolerance';
      case 'high': return 'High risk tolerance';
    }
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
      className={`glass-card rounded-2xl overflow-hidden shadow-lg relative transition-transform ${
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
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-navy-900">{consumer.name}</h2>
            <p className="text-slate-600 capitalize">
              {consumer.age} years old • {consumer.status}
            </p>
            {consumer.showOnlineStatus && (
              <div className="mt-1 flex items-center text-sm">
                {renderOnlineStatus(consumer.onlineStatus)}
                <span className="mx-1.5 text-slate-400">•</span>
                <span className="text-slate-500">Last seen {formatLastOnline(consumer.lastOnline)}</span>
              </div>
            )}
          </div>
          {consumer.profilePicture ? (
            <div className="relative">
              <img
                src={consumer.profilePicture}
                alt={consumer.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
              />
              {consumer.showOnlineStatus && (
                <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                  consumer.onlineStatus === 'online' ? 'bg-green-500' : 
                  consumer.onlineStatus === 'away' ? 'bg-amber-500' : 'bg-slate-400'
                }`}></div>
              )}
            </div>
          ) : (
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-navy-500 flex items-center justify-center text-white text-xl font-bold">
                {consumer.name.charAt(0)}
              </div>
              {consumer.showOnlineStatus && (
                <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                  consumer.onlineStatus === 'online' ? 'bg-green-500' : 
                  consumer.onlineStatus === 'away' ? 'bg-amber-500' : 'bg-slate-400'
                }`}></div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center text-slate-700">
            <CreditCard className="w-5 h-5 mr-2 text-teal-600" />
            <span>
              Investable Assets: <strong>{formatCurrency(consumer.investableAssets)}</strong>
            </span>
          </div>
          
          <div className="flex items-center text-slate-700">
            <TrendingUp className="w-5 h-5 mr-2 text-teal-600" />
            <span>{renderRiskLevel(consumer.riskTolerance)}</span>
          </div>
          
          <div className="flex items-center text-slate-700">
            <Clock className="w-5 h-5 mr-2 text-teal-600" />
            <span>{renderTimelineText(consumer.startTimeline)}</span>
          </div>

          <div className="flex items-start text-slate-700">
            <Languages className="w-5 h-5 mr-2 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="block mb-1">Languages:</span>
              <div className="flex flex-wrap gap-1">
                {consumer.preferredLanguage.map(lang => (
                  <span key={lang} className="px-2 py-0.5 bg-slate-100 rounded text-xs capitalize">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

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

export default ConsumerCard;
