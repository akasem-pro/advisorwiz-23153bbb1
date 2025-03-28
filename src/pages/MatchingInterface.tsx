
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import SearchFilters from '../components/search/SearchFilters';
import MatchCard from '../components/matching/MatchCard';
import EmptyState from '../components/matching/EmptyState';
import MatchedProfileList from '../components/matching/MatchedProfileList';
import MatchHeader from '../components/matching/MatchHeader';
import { useMatchingInterface } from '../hooks/useMatchingInterface';
import PageSEO from '../components/seo/PageSEO';
import { generateServiceSchema, generateBreadcrumbSchema } from '../utils/schemas';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';
import { Link } from 'react-router-dom';
import MatchWeightAdjuster from '../components/matching/MatchWeightAdjuster';

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

  const validUserType = userType === 'consumer' || userType === 'advisor';
  
  const userTypeForComponents = validUserType ? userType as 'consumer' | 'advisor' : null;
  
  const pageTitle = userType === 'consumer' 
    ? 'Find Your Perfect Financial Advisor Match' 
    : userType === 'advisor' 
      ? 'Connect with Potential Clients' 
      : 'AdvisorWiz Matching';
      
  const pageDescription = userType === 'consumer'
    ? 'Find financial advisors who match your specific needs and preferences. Browse and connect with pre-vetted professionals.'
    : userType === 'advisor'
      ? 'Connect with potential clients who are looking for your specific expertise and services.'
      : 'AdvisorWiz matches financial advisors with consumers based on their specific needs and preferences.';
  
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Matches", url: "/matches" }
  ];
  
  const structuredData = [
    generateServiceSchema(),
    generateBreadcrumbSchema(breadcrumbs)
  ];

  return (
    <AppLayout>
      <PageSEO 
        title={pageTitle}
        description={pageDescription}
        keywords="financial advisor matching, find financial advisor, connect with clients, advisor-client matching"
        canonicalUrl="https://advisorwiz.com/matches"
        structuredData={structuredData}
      />
      
      {validUserType && <BreadcrumbNav items={breadcrumbs} />}
      
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
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <SearchFilters 
                    userType={userTypeForComponents}
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                  />
                  <div className="mt-4 sm:mt-0">
                    <MatchWeightAdjuster />
                  </div>
                </div>
              </div>
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
            
            <div className="mt-12 text-center">
              <h3 className="text-xl font-serif font-bold text-navy-900 mb-4">
                {userType === 'consumer' 
                  ? 'Looking for more information about working with a financial advisor?' 
                  : 'Want to improve your profile to attract more clients?'}
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {userType === 'consumer' ? (
                  <>
                    <Link to="/for-consumers" className="btn-outline">Learn More</Link>
                    <Link to="/pricing" className="text-teal-600 hover:underline">View Pricing</Link>
                  </>
                ) : (
                  <>
                    <Link to="/for-advisors" className="btn-outline">Advisor Tips</Link>
                    <Link to="/pricing" className="text-teal-600 hover:underline">Upgrade Plan</Link>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-serif text-navy-900 mb-4">Access Restricted</h2>
            <p className="text-slate-600 mb-6">
              This feature is only available to advisors and consumers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/onboarding" className="btn-primary">Get Started</Link>
              <Link to="/" className="btn-outline">Return Home</Link>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default MatchingInterface;
