
import React from 'react';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/seo/SEO';

// Import all the component sections
import HeroSection from '../components/home/HeroSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import BenefitsSection from '../components/home/BenefitsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';
import PricingSection from '../components/home/PricingSection';
import NewsletterSection from '../components/home/NewsletterSection';
import MainCTASection from '../components/home/MainCTASection';
import SocialShare from '../components/ui/SocialShare';

const Index: React.FC = () => {
  return (
    <AnimatedRoute animation="fade">
      <SEO 
        title="Match with the Perfect Financial Advisor"
        description="AdvisorWiz connects you with experienced financial advisors who match your specific needs and preferences. Find your perfect financial match today."
        keywords="financial advisor, advisor matching, financial planning, investment advisor, retirement planning"
        canonicalUrl="https://advisorwiz.com/"
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <div className="fixed bottom-6 right-6 z-10">
            <SocialShare />
          </div>
          
          <HeroSection />
          <HowItWorksSection />
          <BenefitsSection />
          <TestimonialsSection />
          <PricingSection />
          <FAQSection />
          <NewsletterSection />
          <MainCTASection />
        </main>

        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default Index;
