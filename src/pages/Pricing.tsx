
import React, { useState } from 'react';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Check, X, ArrowRight, Star } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

// Feature list component with check/x icons
const FeatureItem = ({ included, text }: { included: boolean; text: string }) => (
  <div className="flex items-center gap-2 py-1">
    {included ? (
      <Check className="h-5 w-5 flex-shrink-0 text-teal-500" />
    ) : (
      <X className="h-5 w-5 flex-shrink-0 text-slate-300" />
    )}
    <span className={included ? "text-slate-700" : "text-slate-400"}>{text}</span>
  </div>
);

// Price display component
const PriceDisplay = ({ 
  price, 
  period, 
  discount = null 
}: { 
  price: number; 
  period: 'monthly' | 'annually'; 
  discount?: string | null;
}) => (
  <div className="mt-2 mb-6">
    <div className="flex items-end">
      <span className="text-4xl font-bold text-navy-900">${price}</span>
      <span className="text-slate-500 ml-2">/{period === 'monthly' ? 'mo' : 'yr'}</span>
    </div>
    {discount && (
      <div className="mt-1">
        <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
          {discount}
        </Badge>
      </div>
    )}
  </div>
);

// Plan card component
const PlanCard = ({ 
  name, 
  description, 
  monthlyPrice, 
  annualPrice, 
  discount,
  features,
  recommended = false,
  ctaText = "Get Started",
  advisorCount = null
}: { 
  name: string; 
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  discount: string;
  features: string[];
  recommended?: boolean;
  ctaText?: string;
  advisorCount?: string | null;
}) => {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = React.useState<'monthly' | 'annually'>('annually');

  return (
    <div className={`relative rounded-xl p-6 ${recommended ? 'border-2 border-teal-500' : 'border border-slate-200'} bg-white shadow-sm transition-all hover:shadow-md`}>
      {recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-teal-500 text-white text-sm font-medium rounded-full flex items-center gap-1">
          <Star className="h-4 w-4" />
          Recommended
        </div>
      )}
      
      <h3 className={`text-xl font-bold mt-${recommended ? '4' : '0'}`}>{name}</h3>
      <p className="text-slate-500 mt-2 h-12">{description}</p>
      
      <div className="flex gap-2 mt-4 mb-4">
        <Button
          variant={billingPeriod === 'monthly' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setBillingPeriod('monthly')}
          className={billingPeriod === 'monthly' ? 'bg-navy-800 hover:bg-navy-900' : ''}
        >
          Monthly
        </Button>
        <Button
          variant={billingPeriod === 'annually' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setBillingPeriod('annually')}
          className={billingPeriod === 'annually' ? 'bg-navy-800 hover:bg-navy-900' : ''}
        >
          Annually
        </Button>
      </div>
      
      <PriceDisplay 
        price={billingPeriod === 'monthly' ? monthlyPrice : annualPrice} 
        period={billingPeriod}
        discount={billingPeriod === 'annually' ? discount : null}
      />
      
      {advisorCount && (
        <div className="mb-4 mt-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {advisorCount}
          </Badge>
        </div>
      )}
      
      <div className="border-t border-slate-200 my-6 pt-6">
        <p className="font-medium mb-4">Key Features</p>
        <div className="space-y-2">
          {features.map((feature, index) => (
            <FeatureItem key={index} included={true} text={feature} />
          ))}
        </div>
      </div>
      
      <Button 
        className={`w-full ${recommended ? 'bg-teal-600 hover:bg-teal-700' : 'bg-navy-800 hover:bg-navy-900'}`}
        onClick={() => navigate('/onboarding')}
      >
        {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

const Pricing: React.FC = () => {
  const [userType, setUserType] = useState<'consumer' | 'advisor' | 'enterprise'>('consumer');

  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-8">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-6">
                  Simple, Transparent Pricing
                </h1>
                <p className="text-xl text-slate-600 mb-8">
                  Choose the plan that's right for your needs.
                </p>
                
                <Tabs defaultValue="consumer" value={userType} onValueChange={(value) => setUserType(value as 'consumer' | 'advisor' | 'enterprise')} className="w-full max-w-md mx-auto">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="consumer">Consumer</TabsTrigger>
                    <TabsTrigger value="advisor">Advisor</TabsTrigger>
                    <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {userType === 'consumer' && (
                <div className="max-w-md mx-auto">
                  <div className="rounded-xl p-6 border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
                    <h3 className="text-xl font-bold">For Consumers</h3>
                    <p className="text-slate-500 mt-2 h-12">Find your perfect financial advisor, completely free.</p>
                    
                    <PriceDisplay price={0} period="monthly" />
                    
                    <div className="border-t border-slate-200 my-6 pt-6">
                      <p className="font-medium mb-4">Included Features</p>
                      <div className="space-y-2">
                        <FeatureItem included={true} text="Advisor matching" />
                        <FeatureItem included={true} text="Secure communication" />
                        <FeatureItem included={true} text="Appointment scheduling" />
                        <FeatureItem included={true} text="Financial profile creation" />
                        <FeatureItem included={true} text="Advisor reviews" />
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-navy-800 hover:bg-navy-900"
                      onClick={() => window.location.href = '/onboarding'}
                    >
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              {userType === 'advisor' && (
                <div className="grid md:grid-cols-3 gap-8 lg:gap-6 max-w-7xl mx-auto">
                  {/* Basic Plan */}
                  <PlanCard 
                    name="Basic"
                    description="Essential tools for independent advisors"
                    monthlyPrice={49}
                    annualPrice={499}
                    discount="Save 15%"
                    features={[
                      "Advisor profile listing",
                      "Access to potential clients",
                      "Standard support",
                      "Client messaging",
                      "Basic scheduling tools"
                    ]}
                  />
                  
                  {/* Professional Plan - Recommended */}
                  <PlanCard 
                    name="Professional"
                    description="Enhanced visibility and client insights"
                    monthlyPrice={99}
                    annualPrice={999}
                    discount="Save 16%"
                    features={[
                      "Priority listing",
                      "Higher visibility",
                      "Client insights",
                      "Enhanced scheduling",
                      "Priority support",
                      "Performance analytics"
                    ]}
                    recommended={true}
                    ctaText="Try Professional"
                  />
                  
                  {/* Premium Plan */}
                  <PlanCard 
                    name="Premium"
                    description="The ultimate solution for serious advisors"
                    monthlyPrice={199}
                    annualPrice={1999}
                    discount="Save 17%"
                    features={[
                      "Featured advisor status",
                      "Exclusive marketing tools",
                      "Unlimited leads",
                      "Advanced analytics dashboard",
                      "Dedicated account manager",
                      "Priority client matching"
                    ]}
                    ctaText="Get Premium"
                  />
                </div>
              )}
              
              {userType === 'enterprise' && (
                <div className="grid md:grid-cols-3 gap-8 lg:gap-6 max-w-7xl mx-auto">
                  {/* Small Firm Plan */}
                  <PlanCard 
                    name="Small Firm"
                    description="Perfect for growing advisory firms"
                    monthlyPrice={399}
                    annualPrice={3999}
                    discount="Save 15%"
                    advisorCount="Up to 5 advisors"
                    features={[
                      "Standard advisor listings",
                      "Firm branding",
                      "Lead access",
                      "Basic CRM tools",
                      "Standard support"
                    ]}
                  />
                  
                  {/* Growth Plan - Recommended */}
                  <PlanCard 
                    name="Growth"
                    description="For established firms looking to scale"
                    monthlyPrice={799}
                    annualPrice={7999}
                    discount="Save 17%"
                    advisorCount="Up to 15 advisors"
                    features={[
                      "Priority firm listing",
                      "CRM tools",
                      "Client insights",
                      "Analytics dashboard",
                      "Team management tools",
                      "Priority support"
                    ]}
                    recommended={true}
                    ctaText="Try Growth Plan"
                  />
                  
                  {/* Enterprise Plan */}
                  <PlanCard 
                    name="Enterprise"
                    description="For large firms with extensive needs"
                    monthlyPrice={1499}
                    annualPrice={14999}
                    discount="Save 20%"
                    advisorCount="Unlimited advisors"
                    features={[
                      "Featured firm status",
                      "Unlimited leads",
                      "Exclusive marketing tools",
                      "VIP client matching",
                      "Advanced analytics",
                      "Customizable workflows",
                      "Dedicated account team"
                    ]}
                    ctaText="Contact Sales"
                  />
                </div>
              )}
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-serif font-bold text-center text-navy-900 mb-12">Frequently Asked Questions</h2>
              
              <div className="max-w-3xl mx-auto space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I change plans later?</h3>
                  <p className="text-slate-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Is there a trial period?</h3>
                  <p className="text-slate-600">We offer a 14-day free trial for all advisor plans. No credit card required until you're ready to continue.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">What payment methods do you accept?</h3>
                  <p className="text-slate-600">We accept all major credit cards, and for annual plans, we can also accommodate invoicing for enterprise customers.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">How do I get featured as an advisor?</h3>
                  <p className="text-slate-600">The Premium plan includes featured advisor status, which gives you priority placement in search results and highlighted profiles.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Do you offer discounts for non-profits?</h3>
                  <p className="text-slate-600">Yes, we offer special pricing for non-profit organizations. Please contact our sales team for more information.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">How does the enterprise plan differ from individual advisor plans?</h3>
                  <p className="text-slate-600">Enterprise plans are designed for firms with multiple advisors and include features for team management, firm branding, and more extensive client matching capabilities.</p>
                </div>
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
