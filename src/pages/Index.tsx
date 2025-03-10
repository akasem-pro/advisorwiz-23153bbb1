
import React, { useEffect } from 'react';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/seo/SEO';
import StructuredData from '../components/seo/StructuredData';
import Preload from '../components/seo/Preload';
import { generateFAQSchema } from '../utils/jsonLdData';

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

// FAQ data for structured data
const faqData = [
  {
    question: "How does AdvisorWiz match me with a financial advisor?",
    answer: "AdvisorWiz uses a proprietary algorithm that considers your financial goals, investment preferences, and personal circumstances to match you with advisors who have the relevant expertise and experience."
  },
  {
    question: "Is there a fee to use AdvisorWiz?",
    answer: "No, AdvisorWiz is completely free for consumers. Financial advisors pay a subscription fee to be featured on our platform."
  },
  {
    question: "How qualified are the financial advisors on AdvisorWiz?",
    answer: "All financial advisors on our platform undergo a thorough verification process. We verify their professional credentials, regulatory standing, and client reviews before they can be matched with clients."
  },
  {
    question: "Can I switch advisors if I'm not satisfied?",
    answer: "Absolutely. If you're not satisfied with your matched advisor, you can request a new match at any time without any penalty or additional cost."
  },
  {
    question: "How do financial advisors on AdvisorWiz get paid?",
    answer: "Financial advisors have different fee structures which are transparently displayed on their profiles. These may include fee-only, commission-based, or a combination of both."
  }
];

// Critical resources to preload
const criticalResources = [
  {
    url: '/logo.png',
    as: 'image' as const,
  },
  {
    url: '/og-image.png',
    as: 'image' as const,
  }
];

// Most likely navigation paths
const likelyNavigation = [
  '/onboarding',
  '/for-consumers',
  '/for-advisors'
];

const Index: React.FC = () => {
  // Track page view on mount
  useEffect(() => {
    // For analytics tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('event', 'page_view', {
        page_title: 'Home',
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
  }, []);

  return (
    <AnimatedRoute animation="fade">
      <SEO 
        title="Match with the Perfect Financial Advisor"
        description="AdvisorWiz connects you with experienced financial advisors who match your specific needs and preferences. Find your perfect financial match today."
        keywords="financial advisor, advisor matching, financial planning, investment advisor, retirement planning"
        canonicalUrl="https://advisorwiz.com/"
      />
      <StructuredData data={generateFAQSchema(faqData)} />
      <Preload 
        resources={criticalResources}
        preconnect={['https://fonts.googleapis.com', 'https://fonts.gstatic.com']}
        prefetch={likelyNavigation}
        dnsPrefetch={['https://www.google-analytics.com']}
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
