import React from 'react';
import { ArrowLeft, RefreshCcw } from 'lucide-react';
import { Button } from '../ui/button';
import { useMatchingCache } from '../../hooks/useMatchingCache';

interface MatchHeaderProps {
  userType: 'consumer' | 'advisor' | null;
  viewingMatches: boolean;
  onBackToMatching: () => void;
  matchesCount: number;
}

const MatchHeader = ({ 
  userType, 
  viewingMatches, 
  onBackToMatching, 
  matchesCount 
}: MatchHeaderProps) => {
  const { clearAllCaches, cacheStats } = useMatchingCache();
  
  const title = userType === 'consumer'
    ? viewingMatches ? 'Your Matches' : 'Find Your Perfect Advisor'
    : viewingMatches ? 'Your Matches' : 'Connect with Clients';

  const description = userType === 'consumer'
    ? viewingMatches
      ? 'Here are the advisors that you have matched with. Review their profiles and connect with them.'
      : 'Browse advisors and find the perfect match for your financial needs.'
    : viewingMatches
      ? 'Here are the consumers that you have matched with. Reach out to start a conversation.'
      : 'Find potential clients who are looking for your expertise.';
  
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-serif text-navy-900 dark:text-navy-50 mb-1">
            {title}
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            {description}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          {viewingMatches && (
            <Button 
              variant="outline" 
              onClick={onBackToMatching}
              className="text-sm"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Matching
            </Button>
          )}
          
          {process.env.NODE_ENV === 'development' && (
            <Button
              variant="ghost"
              onClick={clearAllCaches}
              className="text-xs"
              title={`Cache size: ${cacheStats.size} entries`}
            >
              <RefreshCcw className="mr-1 h-3 w-3" />
              Clear Cache
            </Button>
          )}
        </div>
      </div>
      
      {viewingMatches && (
        <div className="bg-slate-50 dark:bg-navy-900/30 px-4 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300">
          {matchesCount > 0 ? (
            <span>You have <strong>{matchesCount}</strong> match{matchesCount !== 1 ? 'es' : ''}</span>
          ) : (
            <span>You don't have any matches yet. Start matching to find perfect matches!</span>
          )}
        </div>
      )}
    </div>
  );
};

export default MatchHeader;
