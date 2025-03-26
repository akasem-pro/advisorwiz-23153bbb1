
import React from 'react';
import { useEffect } from 'react';
import ASOBanner from '../components/marketing/ASOBanner';
import ReviewRequestModal from '../components/marketing/ReviewRequestModal';
import MarketingChannelsWidget from '../components/marketing/MarketingChannelsWidget';
import ASOOptimizationInfo from '../components/marketing/ASOOptimizationInfo';
import PromotionalBanner from '../components/promotions/PromotionalBanner';
import { trackAppStoreEvent } from '../utils/analytics/marketingHelper';

// Fixing imports to use default imports instead of named imports
import HeroSection from '../components/home/HeroSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import BenefitsSection from '../components/home/BenefitsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';
import MainCTASection from '../components/home/MainCTASection';
import TrustedPartners from '../components/home/TrustedPartners';
import PricingCTASection from '../components/home/PricingCTASection';
import NewsletterSection from '../components/home/NewsletterSection';

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
        
        {/* Original Home Content - adding IDs for onboarding tour targeting */}
        <div id="hero-section">
          <HeroSection />
        </div>
        
        {/* Marketing Channels Widget - after hero section */}
        <div className="my-8">
          <MarketingChannelsWidget orientation="horizontal" />
        </div>
        
        <div id="how-it-works-section">
          <HowItWorksSection />
        </div>
        
        <div id="benefits-section">
          <BenefitsSection />
        </div>
        
        {/* ASO Optimization Info - strategic placement */}
        <div className="my-12">
          <h2 className="text-2xl font-bold text-center mb-6">Discover Our Mobile App</h2>
          <ASOOptimizationInfo className="max-w-3xl mx-auto" />
        </div>
        
        <div id="testimonials-section">
          <TestimonialsSection />
        </div>
        
        <div id="faq-section">
          <FAQSection />
        </div>
        
        <div id="cta-section">
          <MainCTASection />
        </div>
        
        <div id="partners-section">
          <TrustedPartners />
        </div>
        
        <div id="pricing-section">
          <PricingCTASection />
        </div>
        
        <div id="newsletter-section">
          <NewsletterSection />
        </div>
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
