
import React from 'react';
import { ConsumerProfile } from '../../context/UserContext';
import { Clock, CreditCard, TrendingUp, Languages, Check, X } from 'lucide-react';
import { Button } from '../ui/button';

interface ConsumerCardProps {
  consumer: ConsumerProfile;
  onSwipeRight: (consumer: ConsumerProfile) => void;
  onSwipeLeft: (consumer: ConsumerProfile) => void;
}

const ConsumerCard: React.FC<ConsumerCardProps> = ({ consumer, onSwipeRight, onSwipeLeft }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
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

  return (
    <div className="glass-card rounded-2xl overflow-hidden shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-navy-900">{consumer.name}</h2>
            <p className="text-slate-600 capitalize">
              {consumer.age} years old • {consumer.status}
            </p>
          </div>
          {consumer.profilePicture ? (
            <img
              src={consumer.profilePicture}
              alt={consumer.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-navy-500 flex items-center justify-center text-white text-xl font-bold">
              {consumer.name.charAt(0)}
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

        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            onClick={() => onSwipeLeft(consumer)}
            className="flex items-center justify-center"
          >
            <X className="mr-1 h-4 w-4" />
            Skip
          </Button>
          <Button 
            onClick={() => onSwipeRight(consumer)}
            className="bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center"
          >
            <Check className="mr-1 h-4 w-4" />
            Connect
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConsumerCard;
