
import React, { useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';
import PageSEO from '../components/seo/PageSEO';
import Preload from '../components/seo/Preload';
import SocialShare from '../components/ui/SocialShare';
import { generateFAQSchema, generateWebsiteSchema, generateOrganizationSchema } from '../utils/schemas';
import { initPerformanceOptimizations } from '../utils/performanceTracking';
import SocialProofBar from '../components/ui/SocialProofBar';
import TrustBadges from '../components/ui/TrustBadges';
import FloatingSupportButton from '../components/support/FloatingSupportButton';

// Import all the component sections
import HeroSection from '../components/home/HeroSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import BenefitsSection from '../components/home/BenefitsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';
import PricingSection from '../components/home/PricingSection';
import NewsletterSection from '../components/home/NewsletterSection';
import MainCTASection from '../components/home/MainCTASection';

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
  },
  {
    question: "What types of financial services can I get through AdvisorWiz?",
    answer: "Our network includes advisors specializing in retirement planning, investment management, tax planning, estate planning, insurance, college funding, and comprehensive financial planning."
  },
  {
    question: "How is my personal information protected?",
    answer: "We take data security seriously. All personal and financial information is encrypted using industry-standard protocols. We never share your information with third parties without your explicit consent."
  }
];

// Critical resources to preload
const criticalResources = [
  {
    url: '/lovable-uploads/d66162b8-d098-4ffe-a300-d14aa6ffe38e.png',
    as: 'image' as const,
    importance: 'high' as const,
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
  '/for-advisors',
  '/pricing'
];

const Home: React.FC = () => {
  // Track page view on mount and initialize performance optimizations
  useEffect(() => {
    // Initialize performance tracking
    initPerformanceOptimizations();
    
    // For analytics tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('event', 'page_view', {
        page_title: 'Find Your Perfect Financial Advisor Match | AdvisorWiz',
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
  }, []);

  return (
    <>
      <PageSEO 
        title="Find Your Perfect Financial Advisor Match"
        description="AdvisorWiz connects you with experienced financial advisors who match your specific needs and preferences. Our proprietary algorithm ensures you find your ideal financial match. Free for consumers."
        keywords="financial advisor, advisor matching, financial planning, investment advisor, retirement planning, wealth management, CFP, certified financial planner"
        canonicalUrl="https://advisorwiz.com/"
        structuredData={[
          generateFAQSchema(faqData),
          generateWebsiteSchema(),
          generateOrganizationSchema()
        ]}
      />
      
      <Preload 
        resources={criticalResources}
        preconnect={['https://fonts.googleapis.com', 'https://fonts.gstatic.com']}
        prefetch={likelyNavigation}
        dnsPrefetch={['https://www.google-analytics.com']}
      />
      
      <AppLayout>
        <FloatingSupportButton />
        
        <div className="fixed bottom-6 right-6 z-10">
          <SocialShare />
        </div>
        
        <HeroSection />
        
        <SocialProofBar />
        
        <HowItWorksSection />
        
        <div className="py-8 bg-slate-50 dark:bg-navy-950">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold text-center text-navy-900 dark:text-white mb-6">
              Trusted by Financial Professionals Nationwide
            </h2>
            <TrustBadges className="flex flex-wrap justify-center" />
          </div>
        </div>
        
        <BenefitsSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <NewsletterSection />
        <MainCTASection />
      </AppLayout>
    </>
  );
};

export default Home;
