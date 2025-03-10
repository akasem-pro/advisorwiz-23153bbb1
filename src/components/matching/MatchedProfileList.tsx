
import React from 'react';
import { AdvisorProfile, ConsumerProfile } from '../../context/UserContext';
import { Calendar, Inbox } from 'lucide-react';
import MatchFilterSort from './MatchFilterSort';
import { useMatchFiltering } from '../../hooks/useMatchFiltering';

interface MatchedProfileListProps {
  userType: 'consumer' | 'advisor' | null;
  profiles: (AdvisorProfile | ConsumerProfile)[];
  onSchedule: (profileId: string) => void;
  onMessage: (profileId: string) => void;
}

const MatchedProfileList: React.FC<MatchedProfileListProps> = ({ 
  userType, 
  profiles, 
  onSchedule, 
  onMessage 
}) => {
  const {
    searchTerm,
    setSearchTerm,
    sortOption,
    sortDirection,
    selectedExpertise,
    setSelectedExpertise,
    selectedLanguages,
    setSelectedLanguages,
    filteredAndSortedProfiles,
    handleSortChange,
    clearFilters
  } = useMatchFiltering(profiles, userType);

  if (profiles.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-10 text-center">
        <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <Inbox className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-serif font-semibold text-navy-900 mb-2">
          No Matches Yet
        </h3>
        <p className="text-slate-600 mb-6">
          You haven't matched with any {userType === 'consumer' ? 'advisors' : 'clients'} yet.
          Start swiping to find your perfect match!
        </p>
        <button
          onClick={() => window.history.pushState({}, '', '/')}
          className="btn-outline"
        >
          Start Matching
        </button>
      </div>
    );
  }

  return (
    <div>
      <MatchFilterSort
        userType={userType}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortOption={sortOption}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
        selectedExpertise={selectedExpertise}
        onExpertiseChange={setSelectedExpertise}
        selectedLanguages={selectedLanguages}
        onLanguageChange={setSelectedLanguages}
        onClearFilters={clearFilters}
        matchCount={filteredAndSortedProfiles.length}
      />
      
      {filteredAndSortedProfiles.length > 0 ? (
        <div className="space-y-8">
          {filteredAndSortedProfiles.map((profile) => (
            <div key={profile.id} className="glass-card rounded-2xl p-6">
              {userType === 'consumer' ? (
                <div>
                  <h3 className="text-xl font-serif font-semibold text-navy-900 mb-2">
                    {(profile as AdvisorProfile).name}
                  </h3>
                  <p className="text-slate-600 mb-2">
                    {(profile as AdvisorProfile).organization}
                  </p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-teal-600 mr-2">
                        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                      <span className="text-sm text-slate-700">
                        {(profile as AdvisorProfile).expertise.join(', ')}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-teal-600 mr-2">
                        <path d="M12 2v6M12 22v-6M4.93 10.93l4.24 4.24M14.83 8.83l4.24 4.24M2 16h6M22 16h-6M10.93 19.07l4.24-4.24M8.83 5.17l4.24 4.24" />
                      </svg>
                      <span className="text-sm text-slate-700">
                        {(profile as AdvisorProfile).pricing.hourlyRate 
                          ? `$${(profile as AdvisorProfile).pricing.hourlyRate}/hr` 
                          : `${(profile as AdvisorProfile).pricing.portfolioFee}% AUM`}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-serif font-semibold text-navy-900 mb-2">
                    {(profile as ConsumerProfile).name}
                  </h3>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-teal-600 mr-2">
                        <rect width="20" height="14" x="2" y="3" rx="2" />
                        <line x1="2" x2="22" y1="9" y2="9" />
                        <path d="M7 15h.01" />
                        <path d="M11 15h2" />
                      </svg>
                      <span className="text-sm text-slate-700">
                        ${(profile as ConsumerProfile).investableAssets.toLocaleString()} assets
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-teal-600 mr-2">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                      </svg>
                      <span className="text-sm text-slate-700">
                        {(profile as ConsumerProfile).riskTolerance} risk
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex justify-center space-x-4">
                <button 
                  className="btn-outline px-4 py-2"
                  onClick={() => onSchedule(profile.id)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </button>
                <button 
                  className="btn-primary px-4 py-2"
                  onClick={() => onMessage(profile.id)}
                >
                  <Inbox className="w-4 h-4 mr-2" />
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-8 text-center">
          <h3 className="text-lg font-medium text-navy-900 mb-2">No matches found</h3>
          <p className="text-slate-600 mb-4">
            Try adjusting your filters to see more results.
          </p>
          <button
            onClick={clearFilters}
            className="btn-outline px-4 py-2 text-sm"
          >
            <FilterX className="w-4 h-4 mr-2" />
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default MatchedProfileList;
