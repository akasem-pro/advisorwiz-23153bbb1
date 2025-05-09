
import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import PricingHeader from '../components/pricing/PricingHeader';
import ConsumerPlan from '../components/pricing/ConsumerPlan';
import AdvisorPlans from '../components/pricing/AdvisorPlans';
import EnterprisePlans from '../components/pricing/EnterprisePlans';
import PricingFAQs from '../components/pricing/PricingFAQs';
import PricingTrustSignals from '../components/pricing/PricingTrustSignals';
import PricingValueProposition from '../components/pricing/PricingValueProposition';
import PricingCTA from '../components/pricing/PricingCTA';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';
import PageSEO from '../components/seo/PageSEO';
import TrustBadges from '../components/ui/TrustBadges';
import FloatingSupportButton from '../components/support/FloatingSupportButton';
import PricingPageTour from '../components/onboarding/PricingPageTour';
import { useTrackPageView } from '../hooks/use-analytics';
import { PricingUserType } from '../hooks/onboarding/types';

const Pricing: React.FC = () => {
  const [userType, setUserType] = useState<PricingUserType>('consumer');
  
  // Track page view
  useTrackPageView('Pricing Page');

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Pricing", url: "/pricing" }
  ];

  return (
    <AppLayout>
      <PageSEO 
        title="Transparent Pricing Plans | AdvisorWiz"
        description="Explore our flexible pricing options for consumers, advisors, and enterprises. Find the perfect plan for your financial journey."
        keywords="financial advisor pricing, advisor subscriptions, enterprise advisor platform, transparent pricing"
        canonicalUrl="https://advisorwiz.com/pricing"
      />
      
      <BreadcrumbNav items={breadcrumbs} />
      
      {/* Pricing Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950">
        <div className="container mx-auto px-4">
          <PricingHeader userType={userType} setUserType={setUserType} />
          
          {/* Show value proposition based on selected user type */}
          <PricingValueProposition userType={userType} />
          
          {/* Display the appropriate pricing plans */}
          {userType === 'consumer' && <ConsumerPlan />}
          {userType === 'advisor' && <AdvisorPlans />}
          {userType === 'enterprise' && <EnterprisePlans />}
          
          {/* Trust badges */}
          <div className="my-8">
            <TrustBadges className="justify-center" />
          </div>
          
          {/* Trust signals section */}
          <PricingTrustSignals />
          
          {/* Call-to-action */}
          <PricingCTA userType={userType} />
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-12 bg-white dark:bg-navy-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center text-navy-900 dark:text-slate-100 mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <PricingFAQs />
          </div>
        </div>
      </section>
      
      <FloatingSupportButton />
      
      {/* Add the pricing tour component */}
      <PricingPageTour userType={userType} autoStart={true} />
    </AppLayout>
  );
};

export default Pricing;
