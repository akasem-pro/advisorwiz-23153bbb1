
import React from 'react';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Compass, Award, Heart } from 'lucide-react';
import SEO from '../components/seo/SEO';
import StructuredData from '../components/seo/StructuredData';
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '../utils/jsonLdData';
import FAQAccordion from '../components/shared/FAQAccordion';

const ForConsumers: React.FC = () => {
  const navigate = useNavigate();
  
  // FAQs for this page
  const faqs = [
    {
      question: "Is AdvisorWiz free for consumers?",
      answer: "Yes, AdvisorWiz is completely free for consumers. Our platform is designed to help you find the right financial advisor without any cost to you."
    },
    {
      question: "How does AdvisorWiz find the right advisor for me?",
      answer: "We use a sophisticated matching algorithm that considers your financial goals, investment preferences, communication style, and other factors to connect you with advisors who are best equipped to help you achieve your financial objectives."
    },
    {
      question: "Are the financial advisors on AdvisorWiz vetted?",
      answer: "Yes, all advisors on our platform undergo a verification process. We confirm their professional credentials, regulatory standing, and other qualifications before they can be matched with clients."
    }
  ];
  
  // Breadcrumb data
  const breadcrumbs = [
    { name: "Home", url: "https://advisorwiz.com/" },
    { name: "For Consumers", url: "https://advisorwiz.com/for-consumers" }
  ];
  
  // Combined structured data
  const structuredData = [
    generateServiceSchema(),
    generateFAQSchema(faqs),
    generateBreadcrumbSchema(breadcrumbs)
  ];
  
  return (
    <AnimatedRoute animation="fade">
      <SEO 
        title="Find Your Perfect Financial Advisor | Free Advisor Matching"
        description="Connect with qualified financial advisors that match your specific needs and goals. AdvisorWiz makes finding the right financial advisor simple and free."
        keywords="find financial advisor, advisor matching, financial planning help, investment advisor search, retirement planning advisor, wealth management expert"
        canonicalUrl="https://advisorwiz.com/for-consumers"
      />
      <StructuredData data={structuredData} />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          {/* Hero Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950" aria-labelledby="consumer-heading">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f" 
                    alt="Person reviewing financial plans with a professional advisor" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                    width="600"
                    height="400"
                    loading="eager"
                  />
                </div>
                
                <div className="order-1 md:order-2 max-w-xl">
                  <h1 id="consumer-heading" className="text-4xl md:text-5xl font-serif font-bold text-navy-900 dark:text-white mb-6">
                    Find Your Perfect Financial Advisor
                  </h1>
                  <p className="text-xl text-slate-600 dark:text-slate-300 mb-10">
                    Connect with qualified financial advisors that match your specific needs, goals, and preferences. Our service is completely free for consumers.
                  </p>
                  
                  <button 
                    onClick={() => navigate('/onboarding')}
                    className="btn-primary inline-flex items-center text-lg"
                    aria-label="Begin your advisor matching journey"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-16 bg-navy-50 dark:bg-navy-800" aria-labelledby="journey-heading">
            <div className="container mx-auto px-4">
              <h2 id="journey-heading" className="text-3xl font-serif font-bold text-center text-navy-900 dark:text-white mb-12">
                Your Financial Journey Made Simple
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-navy-700 rounded-xl p-6 shadow-sm">
                  <div className="w-14 h-14 bg-teal-100 dark:bg-teal-800/30 rounded-full flex items-center justify-center mb-4">
                    <Compass className="h-7 w-7 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-navy-900 dark:text-white">Personalized Matching</h3>
                  <p className="text-slate-600 dark:text-slate-300">Get matched with advisors based on your specific financial goals, investment preferences, and communication style.</p>
                </div>
                
                <div className="bg-white dark:bg-navy-700 rounded-xl p-6 shadow-sm">
                  <div className="w-14 h-14 bg-teal-100 dark:bg-teal-800/30 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-7 w-7 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-navy-900 dark:text-white">Verified Professionals</h3>
                  <p className="text-slate-600 dark:text-slate-300">Connect with pre-vetted, qualified financial advisors with verified credentials and regulatory standing.</p>
                </div>
                
                <div className="bg-white dark:bg-navy-700 rounded-xl p-6 shadow-sm">
                  <div className="w-14 h-14 bg-teal-100 dark:bg-teal-800/30 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-7 w-7 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-navy-900 dark:text-white">Secure Communication</h3>
                  <p className="text-slate-600 dark:text-slate-300">Communicate safely and securely within our protected platform before deciding to work together.</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Benefits Section */}
          <section className="py-16 bg-white dark:bg-navy-900" aria-labelledby="benefits-heading">
            <div className="container mx-auto px-4">
              <h2 id="benefits-heading" className="text-3xl font-serif font-bold text-center text-navy-900 dark:text-white mb-12">
                The AdvisorWiz Advantage
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-50 dark:bg-navy-800 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <Award className="h-6 w-6 text-teal-600 dark:text-teal-400 mr-3" />
                    <h3 className="text-xl font-bold text-navy-800 dark:text-white">Quality Matches</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    Our advanced matching algorithm considers over 100 data points to ensure you're connected with advisors who truly align with your needs and preferences.
                  </p>
                </div>
                
                <div className="bg-slate-50 dark:bg-navy-800 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <Heart className="h-6 w-6 text-teal-600 dark:text-teal-400 mr-3" />
                    <h3 className="text-xl font-bold text-navy-800 dark:text-white">No Pressure</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    Take your time to review advisor profiles, communicate through our platform, and schedule consultations before making any commitments.
                  </p>
                </div>
                
                <div className="bg-slate-50 dark:bg-navy-800 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-teal-600 dark:text-teal-400 mr-3" />
                    <h3 className="text-xl font-bold text-navy-800 dark:text-white">Complete Privacy</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    Your personal information is protected with bank-level security. You control what information is shared with advisors and when.
                  </p>
                </div>
                
                <div className="bg-slate-50 dark:bg-navy-800 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-6 w-6 text-teal-600 dark:text-teal-400 mr-3" />
                    <h3 className="text-xl font-bold text-navy-800 dark:text-white">Always Free</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    AdvisorWiz is completely free for consumers. We never charge you to use our platform, connect with advisors, or schedule consultations.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="py-16 bg-slate-50 dark:bg-navy-900" aria-labelledby="faq-heading">
            <div className="container mx-auto px-4">
              <h2 id="faq-heading" className="text-3xl font-serif font-bold text-center text-navy-900 dark:text-white mb-12">
                Frequently Asked Questions
              </h2>
              
              <div className="max-w-3xl mx-auto">
                <FAQAccordion 
                  faqs={faqs} 
                  defaultValue="item-0"
                  className="bg-white dark:bg-navy-800 shadow-sm"
                />
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-12 bg-navy-800 dark:bg-navy-950 text-white" aria-labelledby="cta-heading">
            <div className="container mx-auto px-4 text-center">
              <h2 id="cta-heading" className="text-3xl font-serif font-bold mb-4 text-white">
                Ready to Find Your Financial Advisor?
              </h2>
              <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">
                Start your journey to financial clarity today. Our matching process takes just a few minutes.
              </p>
              <button 
                onClick={() => navigate('/onboarding')}
                className="btn-accent inline-flex items-center text-lg"
                aria-label="Begin your financial advisor search"
              >
                Find My Advisor
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default ForConsumers;
