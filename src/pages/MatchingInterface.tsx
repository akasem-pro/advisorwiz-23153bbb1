
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
import SEO from '../components/seo/SEO';
import StructuredData from '../components/seo/StructuredData';
import { generateServiceSchema, generateBreadcrumbSchema } from '../utils/jsonLdData';
import { Link } from 'react-router-dom';

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
  
  // TypeScript narrowing - ensures userType is 'consumer' | 'advisor' for components that need it
  const userTypeForComponents = validUserType ? userType as 'consumer' | 'advisor' : null;
  
  // Page title and description based on user type
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
  
  // Breadcrumb data
  const breadcrumbs = [
    { name: "Home", url: "https://advisorwiz.com/" },
    { name: "Matches", url: "https://advisorwiz.com/matches" }
  ];
  
  // Combined structured data
  const structuredData = [
    generateServiceSchema(),
    generateBreadcrumbSchema(breadcrumbs)
  ];

  return (
    <AnimatedRoute animation="fade">
      <SEO 
        title={pageTitle}
        description={pageDescription}
        keywords="financial advisor matching, find financial advisor, connect with clients, advisor-client matching"
        canonicalUrl="https://advisorwiz.com/matches"
      />
      <StructuredData data={structuredData} />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            {validUserType ? (
              <>
                <nav className="mb-6" aria-label="Breadcrumb">
                  <ol className="flex text-sm text-slate-500">
                    <li><Link to="/" className="hover:text-teal-600">Home</Link></li>
                    <li className="mx-2">/</li>
                    <li className="text-teal-600">Matches</li>
                  </ol>
                </nav>
                
                <MatchHeader 
                  userType={userTypeForComponents}
                  viewingMatches={viewingMatches}
                  onBackToMatching={goBackToMatching}
                  matchesCount={matches.length}
                />

                {!viewingMatches && (
                  <SearchFilters 
                    userType={userTypeForComponents}
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
        </main>

        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default MatchingInterface;
