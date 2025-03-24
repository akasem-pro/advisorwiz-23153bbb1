
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';
import BenefitsSection from '../components/advisors/BenefitsSection';
import FAQSection from '../components/advisors/FAQSection';
import CTASection from '../components/advisors/CTASection';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

const ForAdvisors: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'For Advisors', url: '/for-advisors' }
  ];

  const faqs = [
    {
      question: "How do I sign up as a financial advisor?",
      answer: "To join our platform, click the 'Sign In' button in the header, then select 'Create an Account' and choose 'Advisor' as your account type. Once registered, you'll complete a profile with your professional information."
    },
    {
      question: "What types of advisors can join the platform?",
      answer: "We welcome a wide range of financial professionals including CFPs, investment advisors, insurance specialists, tax professionals, estate planners, and wealth managers. All advisors must meet our verification standards."
    },
    {
      question: "Is there a fee to join?",
      answer: "We offer several flexible pricing options including a basic free tier with limited features, and premium subscription tiers with advanced functionality. Visit our Pricing page for detailed information."
    },
    {
      question: "How does the matching process work?",
      answer: "Our proprietary algorithm matches advisors with potential clients based on expertise, location, specialty, and client needs. The more complete your profile, the better your matching results will be."
    },
    {
      question: "Can I manage my availability on the platform?",
      answer: "Yes, our platform includes a comprehensive scheduling system where you can set your availability, block off time, and manage appointment requests from potential clients."
    },
  ];

  return (
    <AppLayout>
      <BreadcrumbNav items={breadcrumbs} />
      
      <section className="bg-gradient-to-b from-slate-50 to-white dark:from-navy-950 dark:to-navy-900 pt-16 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 dark:text-white mb-6 leading-tight">
              Grow Your Advisory Practice with Qualified Leads
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
              Connect with pre-screened clients who are actively seeking your expertise. Our advanced matching system pairs you with prospects most likely to benefit from your services.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-6 text-lg h-auto">
                <Link to="/onboarding">
                  Join as an Advisor
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-navy-300 text-navy-700 dark:border-navy-600 dark:text-slate-200 rounded-full px-8 py-6 text-lg h-auto">
                <Link to="/pricing">
                  View Pricing Options
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white dark:bg-navy-800 p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center">
                    <Check className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-lg font-semibold ml-3 text-navy-900 dark:text-slate-100">Qualified Leads</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300">Connect with clients who are actively seeking financial advice and match your expertise.</p>
              </div>
              
              <div className="bg-white dark:bg-navy-800 p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center">
                    <Check className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-lg font-semibold ml-3 text-navy-900 dark:text-slate-100">Digital Presence</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300">Showcase your expertise with a professionally designed profile that builds client trust.</p>
              </div>
              
              <div className="bg-white dark:bg-navy-800 p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center">
                    <Check className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-lg font-semibold ml-3 text-navy-900 dark:text-slate-100">Scheduling Tools</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300">Manage appointments, consultations, and follow-ups with our integrated scheduling system.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <BenefitsSection />
      
      <section className="py-16 bg-white dark:bg-navy-900" aria-labelledby="how-it-works-heading">
        <div className="container mx-auto px-4">
          <h2 id="how-it-works-heading" className="text-3xl font-serif font-bold text-center text-navy-900 dark:text-slate-100 mb-12">
            How It Works
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-teal-200 dark:bg-teal-900/60"></div>
              
              <div className="relative z-10 mb-12">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-teal-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-8">1</div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy-900 dark:text-slate-100 mb-2">Create Your Advisor Profile</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">Sign up and build your professional profile, highlighting your expertise, credentials, and services. The more complete your profile, the better our matching algorithm works.</p>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 mb-12">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-teal-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-8">2</div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy-900 dark:text-slate-100 mb-2">Get Matched with Potential Clients</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">Our proprietary algorithm connects you with consumers who match your specialty, location, and expertise. You'll receive notifications when potential clients are interested in your services.</p>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 mb-12">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-teal-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-8">3</div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy-900 dark:text-slate-100 mb-2">Schedule Consultations</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">Use our integrated scheduling system to book appointments with interested prospects. You control your availability and consultation format (in-person, video call, or phone).</p>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-teal-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-8">4</div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy-900 dark:text-slate-100 mb-2">Grow Your Practice</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">Convert consultations into long-term client relationships. Our platform helps you track prospects, follow up, and expand your practice efficiently.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FAQSection faqs={faqs} />
      
      <CTASection />
    </AppLayout>
  );
};

export default ForAdvisors;
