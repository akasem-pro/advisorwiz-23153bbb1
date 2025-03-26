import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import BenefitsSection from '../components/sections/BenefitsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import FAQSection from '../components/sections/FAQSection';
import MainCTASection from '../components/sections/MainCTASection';
import TrustedPartners from '../components/sections/TrustedPartners';
import PricingCTASection from '../components/sections/PricingCTASection';
import NewsletterSection from '../components/sections/NewsletterSection';
import ASOBanner from '../components/marketing/ASOBanner';
import ReviewRequestModal from '../components/marketing/ReviewRequestModal';
import MarketingChannelsWidget from '../components/marketing/MarketingChannelsWidget';
import ASOOptimizationInfo from '../components/marketing/ASOOptimizationInfo';
import PromotionalBanner from '../components/promotions/PromotionalBanner';
import { useEffect } from 'react';
import { trackAppStoreEvent } from '../utils/analytics/marketingHelper';

const Home = () => {
  // Show app review modal on the home page
  useEffect(() => {
    // Track home page view for ASO
    trackAppStoreEvent('view', 'web', { page: 'home' });
  }, []);

  const handleReviewSubmitted = (rating: number, feedback?: string) => {
    console.log('Review submitted:', rating, feedback);
  };

  return (
    <>
      {/* App Store Optimization Banner */}
      <ASOBanner variant="both" position="top" />
      
      {/* Main Home Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Promotional Banner for Marketing */}
        <PromotionalBanner
          id="home-promo-1"
          message="Download our mobile app for a better experience. Get it now!"
          ctaText="Download App"
          ctaUrl="/download"
          variant="primary"
        />
        
        {/* Original Home Content */}
        <HeroSection />
        
        {/* Marketing Channels Widget - after hero section */}
        <div className="my-8">
          <MarketingChannelsWidget orientation="horizontal" />
        </div>
        
        <HowItWorksSection />
        <BenefitsSection />
        
        {/* ASO Optimization Info - strategic placement */}
        <div className="my-12">
          <h2 className="text-2xl font-bold text-center mb-6">Discover Our Mobile App</h2>
          <ASOOptimizationInfo className="max-w-3xl mx-auto" />
        </div>
        
        <TestimonialsSection />
        <FAQSection />
        <MainCTASection />
        <TrustedPartners />
        <PricingCTASection />
        <NewsletterSection />
      </div>
      
      {/* Review Request Modal */}
      <ReviewRequestModal 
        sessionCount={2}
        minTimeOnSite={120}
        pageVisitThreshold={3}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </>
  );
};

export default Home;
