
import React, { useState } from 'react';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PricingHeader from '../components/pricing/PricingHeader';
import ConsumerPlan from '../components/pricing/ConsumerPlan';
import AdvisorPlans from '../components/pricing/AdvisorPlans';
import EnterprisePlans from '../components/pricing/EnterprisePlans';
import PricingFAQs from '../components/pricing/PricingFAQs';

const Pricing: React.FC = () => {
  const [userType, setUserType] = useState<'consumer' | 'advisor' | 'enterprise'>('consumer');

  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          {/* Pricing Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
            <div className="container mx-auto px-4">
              <PricingHeader userType={userType} setUserType={setUserType} />
              
              {userType === 'consumer' && <ConsumerPlan />}
              {userType === 'advisor' && <AdvisorPlans />}
              {userType === 'enterprise' && <EnterprisePlans />}
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-serif font-bold text-center text-navy-900 mb-12">
                Frequently Asked Questions
              </h2>
              
              <div className="max-w-3xl mx-auto">
                <PricingFAQs />
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default Pricing;
