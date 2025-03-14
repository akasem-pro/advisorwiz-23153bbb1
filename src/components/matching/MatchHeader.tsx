
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import MatchingExplanation from './MatchingExplanation';

interface MatchHeaderProps {
  userType: 'consumer' | 'advisor' | null;
  viewingMatches: boolean;
  onBackToMatching: () => void;
  matchesCount: number;
}

const MatchHeader: React.FC<MatchHeaderProps> = ({ 
  userType, 
  viewingMatches, 
  onBackToMatching,
  matchesCount
}) => {
  return (
    <div className="mb-10">
      {viewingMatches ? (
        <div>
          <div className="flex items-center justify-center mb-4">
            <button 
              onClick={onBackToMatching}
              className="mr-2 flex items-center text-sm text-navy-900 hover:text-teal-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Matching
            </button>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4 text-center">
            Your Matches
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-center">
            Here are the {userType === 'consumer' ? 'advisors' : 'potential clients'} you've matched with.
            Take your time to review their profiles and reach out when you're ready.
          </p>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4 text-center">
            {userType === 'consumer' ? 'Find Your Advisor' : 'Find Potential Clients'}
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8 text-center">
            {userType === 'consumer' 
              ? "Swipe right on advisors you'd like to connect with. If they match with you too, you can start chatting." 
              : "Review potential clients who might benefit from your services."}
          </p>
          
          {/* Add the matching explanation component */}
          <MatchingExplanation userType={userType} />
        </div>
      )}

      {matchesCount > 0 && !viewingMatches && (
        <div className="mt-8 mb-8 p-4 bg-teal-50 border border-teal-200 rounded-lg text-center">
          <p className="text-teal-800 font-medium">
            You have {matchesCount} match{matchesCount !== 1 ? 'es' : ''}!
          </p>
          <p className="text-teal-600 text-sm mt-1">
            View your matches to connect with them.
          </p>
        </div>
      )}
    </div>
  );
};

export default MatchHeader;
