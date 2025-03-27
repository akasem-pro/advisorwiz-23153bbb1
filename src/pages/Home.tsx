
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
      {/* Main Home Content */}
      <div className="overflow-hidden">
        {/* Promotional Banner - Only show on mobile */}
        {isMobile && (
          <PromotionalBanner
            id="home-promo-1"
            message="Get our mobile app for a better experience!"
            ctaText="Download"
            ctaUrl="/download"
            variant="primary"
          />
        )}
        
        {/* Hero Section */}
        <div id="hero-section" className="animate-fade-in" style={{animationDuration: '0.8s'}}>
          <HeroSection />
        </div>
        
        {/* Marketing widget - Only on desktop with reduced prominence */}
        {!isMobile && (
          <ConsistentSection background="transparent" className="py-2">
            <ConsistentContainer>
              <MarketingChannelsWidget orientation="horizontal" />
            </ConsistentContainer>
          </ConsistentSection>
        )}
        
        {/* How It Works - Add animation */}
        <div id="how-it-works-section" className="scroll-mt-20 animate-fade-in" style={{animationDuration: '0.8s', animationDelay: '0.1s'}}>
          <HowItWorksSection />
        </div>
        
        {/* Benefits Section */}
        <div id="benefits-section" className="scroll-mt-20">
          <BenefitsSection />
        </div>
        
        {/* Mobile App Promotion - Only show when relevant */}
        {!isMobile && (
          <ConsistentSection background="accent" className="py-4" centered={true}>
            <ConsistentContainer width="md">
              <h2 className="text-xl md:text-2xl font-bold text-center mb-3 text-navy-900 dark:text-white">
                AdvisorWiz Mobile App
              </h2>
              <MobileAppPromotion className="max-w-4xl mx-auto" />
            </ConsistentContainer>
          </ConsistentSection>
        )}
        
        {/* Testimonials Section */}
        <div id="testimonials-section" className="scroll-mt-20">
          <TestimonialsSection />
        </div>
        
        {/* FAQ Section */}
        <div id="faq-section" className="scroll-mt-20">
          <FAQSection />
        </div>
        
        {/* CTA Section */}
        <div id="cta-section" className="scroll-mt-20">
          <MainCTASection />
        </div>
        
        {/* Pricing CTA - Positioned strategically */}
        <div id="pricing-section" className="scroll-mt-20">
          <PricingCTASection />
        </div>
        
        {/* Newsletter - Simplified */}
        <div id="newsletter-section" className="scroll-mt-20">
          <NewsletterSection />
        </div>
      </div>
      
      {/* Review Request Modal - Less intrusive */}
      <ReviewRequestModal 
        sessionCount={3} /* Increased threshold so it shows less frequently */
        minTimeOnSite={180} /* Increased time threshold */
        pageVisitThreshold={4} /* Increased threshold */
        onReviewSubmitted={handleReviewSubmitted}
      />
      
      {/* App Store Banner - Show at bottom only */}
      <ASOBanner variant="both" position="bottom" />
    </AppLayout>
  );
};

export default Home;
