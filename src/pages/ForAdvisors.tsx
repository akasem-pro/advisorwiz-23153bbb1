
import React from 'react';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, BarChart3, Users, CheckCircle } from 'lucide-react';
import SEO from '../components/seo/SEO';
import StructuredData from '../components/seo/StructuredData';
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '../utils/jsonLdData';

const ForAdvisors: React.FC = () => {
  const navigate = useNavigate();
  
  // FAQs for this page
  const faqs = [
    {
      question: "How does AdvisorWiz help financial advisors grow their practice?",
      answer: "AdvisorWiz connects you with pre-qualified potential clients who are actively seeking financial guidance. Our matching algorithm ensures you connect with prospects who align with your expertise and practice style."
    },
    {
      question: "What does it cost to join AdvisorWiz as an advisor?",
      answer: "AdvisorWiz offers flexible pricing plans designed for advisors at every stage. Visit our pricing page for detailed information on our subscription options and features."
    },
    {
      question: "How are potential clients vetted before matching?",
      answer: "All potential clients complete a comprehensive profile detailing their financial situation, goals, and advisor preferences. Our platform verifies basic information and uses advanced algorithms to match clients with advisors who can best meet their needs."
    }
  ];
  
  // Breadcrumb data
  const breadcrumbs = [
    { name: "Home", url: "https://advisorwiz.com/" },
    { name: "For Advisors", url: "https://advisorwiz.com/for-advisors" }
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
        title="Grow Your Advisory Practice | Financial Advisor Platform"
        description="Connect with qualified clients and streamline your financial advisory practice with our advanced advisor-client matching platform. Join thousands of successful advisors."
        keywords="financial advisor platform, advisor growth, client acquisition, financial practice management, grow advisory business, find clients financial advisor"
        canonicalUrl="https://advisorwiz.com/for-advisors"
      />
      <StructuredData data={structuredData} />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          {/* Hero Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50" aria-labelledby="advisor-heading">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="max-w-xl">
                  <h1 id="advisor-heading" className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-6">
                    Grow Your Advisory Practice
                  </h1>
                  <p className="text-xl text-slate-600 mb-10">
                    Connect with qualified clients and streamline your practice with our advanced platform. Join thousands of successful advisors already using AdvisorWiz.
                  </p>
                  
                  <button 
                    onClick={() => navigate('/onboarding')}
                    className="btn-primary inline-flex items-center text-lg"
                    aria-label="Start advisor registration process"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                
                <div className="rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1604594849809-dfedbc827105" 
                    alt="Financial advisor discussing investment strategy with clients" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                    width="600"
                    height="400"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 bg-navy-50" aria-labelledby="why-join-heading">
            <div className="container mx-auto px-4">
              <h2 id="why-join-heading" className="text-3xl font-serif font-bold text-center text-navy-900 mb-12">
                Why Join AdvisorWiz?
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-7 w-7 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Qualified Leads</h3>
                  <p className="text-slate-600">Connect with pre-qualified potential clients who are actively looking for financial guidance.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                    <BarChart3 className="h-7 w-7 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Practice Growth</h3>
                  <p className="text-slate-600">Expand your practice efficiently with powerful tools designed for modern advisors.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-7 w-7 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Trust & Security</h3>
                  <p className="text-slate-600">Build client trust with our secure platform designed for financial professionals.</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Key Features Section */}
          <section className="py-16 bg-white" aria-labelledby="features-heading">
            <div className="container mx-auto px-4">
              <h2 id="features-heading" className="text-3xl font-serif font-bold text-center text-navy-900 mb-12">
                Key Platform Features
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-navy-800">Client Acquisition Tools</h3>
                  <ul className="space-y-3">
                    {[
                      "AI-powered matching algorithm for high-quality leads",
                      "Customizable advisor profile to showcase your expertise",
                      "Direct messaging with potential clients",
                      "Scheduling integration for seamless appointments",
                      "Client relationship management tools"
                    ].map((feature, index) => (
                      <li key={index} className="flex">
                        <CheckCircle className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-navy-800">Practice Management</h3>
                  <ul className="space-y-3">
                    {[
                      "Client dashboard to track relationships and progress",
                      "Secure document sharing and storage",
                      "Compliance-ready communication records",
                      "Calendar integration with major providers",
                      "Performance analytics and reporting"
                    ].map((feature, index) => (
                      <li key={index} className="flex">
                        <CheckCircle className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="py-16 bg-slate-50" aria-labelledby="faq-heading">
            <div className="container mx-auto px-4">
              <h2 id="faq-heading" className="text-3xl font-serif font-bold text-center text-navy-900 mb-12">
                Frequently Asked Questions
              </h2>
              
              <div className="max-w-3xl mx-auto space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold mb-2 text-navy-800">{faq.question}</h3>
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-12 bg-navy-800 text-white" aria-labelledby="cta-heading">
            <div className="container mx-auto px-4 text-center">
              <h2 id="cta-heading" className="text-3xl font-serif font-bold mb-4">
                Ready to Grow Your Advisory Practice?
              </h2>
              <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">
                Join thousands of successful advisors who are growing their business with AdvisorWiz.
              </p>
              <button 
                onClick={() => navigate('/onboarding')}
                className="btn-accent inline-flex items-center text-lg"
                aria-label="Begin advisor registration"
              >
                Get Started Today
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

export default ForAdvisors;
