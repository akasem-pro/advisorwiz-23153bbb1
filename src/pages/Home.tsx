
import React from 'react';
import { useEffect } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import ASOBanner from '../components/marketing/ASOBanner';
import ReviewRequestModal from '../components/marketing/ReviewRequestModal';
import MarketingChannelsWidget from '../components/marketing/MarketingChannelsWidget';
import MobileAppPromotion from '../components/marketing/MobileAppPromotion';
import PromotionalBanner from '../components/promotions/PromotionalBanner';
import { trackAppStoreEvent } from '../utils/analytics/marketingHelper';
import OnboardingTour from '../components/onboarding/OnboardingTour';
import ConsistentSection from '../components/ui/design-system/ConsistentSection';
import ConsistentContainer from '../components/ui/design-system/ConsistentContainer';

// Fixing imports to use default imports instead of named imports
import HeroSection from '../components/home/HeroSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import BenefitsSection from '../components/home/BenefitsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';
import MainCTASection from '../components/home/MainCTASection';
import PricingCTASection from '../components/home/PricingCTASection';
import NewsletterSection from '../components/home/NewsletterSection';
import AppLayout from '../components/layout/AppLayout';

const Home = () => {
  const isMobile = useIsMobile();
  
  // Show app review modal on the home page
  useEffect(() => {
    // Track home page view for ASO
    trackAppStoreEvent('view', 'web', { page: 'home' });
  }, []);

  const handleReviewSubmitted = (rating: number, feedback?: string) => {
    console.log('Review submitted:', rating, feedback);
  };

  return (
    <AppLayout fullWidth withoutPadding>
      {/* App Store Optimization Banner */}
      <ASOBanner variant="both" position="top" />
      
      {/* Main Home Content */}
      <div className="overflow-hidden">
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
        
        {/* Only show marketing widget if not on mobile */}
        {!isMobile && (
          <ConsistentSection background="light" className="py-4">
            <ConsistentContainer>
              <MarketingChannelsWidget orientation="horizontal" />
            </ConsistentContainer>
          </ConsistentSection>
        )}
        
        <div id="how-it-works-section">
          <HowItWorksSection />
        </div>
        
        <div id="benefits-section">
          <BenefitsSection />
        </div>
        
        {/* Mobile App Promotion Section - replacing ASOOptimizationInfo */}
        <ConsistentSection centered background="accent" className="py-6">
          <ConsistentContainer width="md">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-3 text-navy-900 dark:text-white">
              AdvisorWiz Mobile App
            </h2>
            <MobileAppPromotion className="max-w-4xl mx-auto" />
          </ConsistentContainer>
        </ConsistentSection>
        
        <div id="testimonials-section">
          <TestimonialsSection />
        </div>
        
        <div id="faq-section">
          <FAQSection />
        </div>
        
        <div id="cta-section">
          <MainCTASection />
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
    </AppLayout>
  );
};

export default Home;
