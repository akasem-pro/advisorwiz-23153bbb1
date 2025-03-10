
import React from 'react';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SearchFilters from '../components/search/SearchFilters';
import MatchCard from '../components/matching/MatchCard';
import EmptyState from '../components/matching/EmptyState';
import MatchedProfileList from '../components/matching/MatchedProfileList';
import MatchHeader from '../components/matching/MatchHeader';
import { useMatchingInterface } from '../hooks/useMatchingInterface';

const MatchingInterface: React.FC = () => {
  const {
    userType,
    matches,
    empty,
    viewingMatches,
    filteredItems,
    currentIndex,
    matchedProfiles,
    handleSearch,
    handleFilterChange,
    handleSchedule,
    handleMessage,
    handleSwipeRight,
    handleSwipeLeft,
    resetItems,
    goBackToMatching,
    getCurrentItem
  } = useMatchingInterface();

  // Only show the interface for consumer or advisor users
  const validUserType = userType === 'consumer' || userType === 'advisor';
  
  // TypeScript type narrowing to make sure userType is 'consumer' | 'advisor' for components that need it
  const userTypeForComponents = userType === 'consumer' || userType === 'advisor' 
    ? userType 
    : null;

  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            {validUserType ? (
              <>
                <MatchHeader 
                  userType={userTypeForComponents}
                  viewingMatches={viewingMatches}
                  onBackToMatching={goBackToMatching}
                  matchesCount={matches.length}
                />

                {!viewingMatches && (
                  <SearchFilters 
                    userType={userTypeForComponents as 'consumer' | 'advisor'}
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                  />
                )}

                <div className="max-w-md mx-auto">
                  {viewingMatches ? (
                    <MatchedProfileList 
                      userType={userTypeForComponents}
                      profiles={matchedProfiles}
                      onSchedule={handleSchedule}
                      onMessage={handleMessage}
                    />
                  ) : (
                    !empty && filteredItems.length > 0 ? (
                      <MatchCard 
                        item={getCurrentItem()} 
                        userType={userTypeForComponents}
                        onSwipeRight={handleSwipeRight} 
                        onSwipeLeft={handleSwipeLeft} 
                      />
                    ) : (
                      <EmptyState 
                        isEmpty={empty} 
                        onReset={resetItems} 
                      />
                    )
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-serif text-navy-900 mb-4">Access Restricted</h2>
                <p className="text-slate-600">
                  This feature is only available to advisors and consumers.
                </p>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default MatchingInterface;
