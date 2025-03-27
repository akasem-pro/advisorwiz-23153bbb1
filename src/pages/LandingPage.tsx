
import React, { useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';
import HeroSection from '../components/home/HeroSection';
import BenefitsSection from '../components/home/BenefitsSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';
import PricingCTASection from '../components/home/PricingCTASection';
import MainCTASection from '../components/home/MainCTASection';
import { Helmet } from 'react-helmet';
import useLandingPageTracking from '../hooks/useLandingPageTracking';

const LandingPage: React.FC = () => {
  const { trackSectionView } = useLandingPageTracking();
  
  useEffect(() => {
    // Track each section when the component mounts
    trackSectionView('hero-section', 'Hero');
    trackSectionView('benefits-section', 'Benefits');
    trackSectionView('how-it-works-section', 'How It Works');
    trackSectionView('testimonials-section', 'Testimonials');
    trackSectionView('faq-section', 'FAQ');
    trackSectionView('pricing-cta-section', 'Pricing CTA');
    trackSectionView('main-cta-section', 'Main CTA');
  }, [trackSectionView]);

  return (
    <AppLayout hideSocialProof={true}>
      <Helmet>
        <title>AdvisorWiz - Connecting Financial Advisors with Clients</title>
        <meta 
          name="description" 
          content="AdvisorWiz connects consumers with trusted financial advisors through an innovative matching platform." 
        />
      </Helmet>
      
      <div id="hero-section" className="mt-0"><HeroSection /></div>
      <div id="benefits-section" className="mt-0"><BenefitsSection /></div>
      <div id="how-it-works-section" className="mt-0"><HowItWorksSection /></div>
      <div id="testimonials-section" className="mt-0"><TestimonialsSection /></div>
      <div id="faq-section" className="mt-0"><FAQSection /></div>
      <div id="pricing-cta-section" className="mt-0"><PricingCTASection /></div>
      <div id="main-cta-section" className="mt-0"><MainCTASection /></div>
    </AppLayout>
  );
};

export default LandingPage;
