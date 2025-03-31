
import React, { Suspense } from 'react';
import AppLayout from '../components/layout/AppLayout';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';
import PageHero from '../components/shared/PageHero';
import PageHowItWorks from '../components/shared/PageHowItWorks';
import PageFAQ from '../components/shared/PageFAQ';
import PageCTA from '../components/shared/PageCTA';
import { Shield, Users, Award } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { SectionLoadingFallback } from '../components/LazyComponents';
import AppShareWidget from '../components/ui/AppShareWidget';

const ForConsumers: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Consumers', url: '/consumers' }
  ];

  // How it works steps
  const steps = [
    {
      number: 1,
      title: "Complete a Simple Profile",
      description: "Tell us about your financial situation, goals, and preferences. This helps us understand what you're looking for in an advisor."
    },
    {
      number: 2,
      title: "Review Your Matches",
      description: "We'll present you with a selection of advisors who best match your needs. Browse their profiles, credentials, and specialties."
    },
    {
      number: 3,
      title: "Connect with Advisors",
      description: "Schedule an initial consultation with advisors who interest you. This can be done directly through our platform."
    },
    {
      number: 4,
      title: "Choose Your Advisor",
      description: "After your consultations, select the advisor who best meets your needs and start working together on your financial future."
    }
  ];

  // FAQs for consumers
  const faqs = [
    {
      question: "Is it free to use AdvisorWiz as a consumer?",
      answer: "Yes, our matching service is completely free for consumers. We never charge you to find and connect with financial advisors on our platform."
    },
    {
      question: "How do you verify the advisors on your platform?",
      answer: "We thoroughly vet all advisors, checking their credentials, regulatory standing, and professional history. We also continuously monitor their status to ensure ongoing compliance."
    },
    {
      question: "Can I see advisors' fee structures before connecting?",
      answer: "Yes, advisor profiles include information about their fee structures and compensation methods, allowing you to make informed decisions before scheduling consultations."
    },
    {
      question: "What types of financial advice can I find on AdvisorWiz?",
      answer: "Our platform includes advisors specializing in retirement planning, investment management, estate planning, tax strategies, insurance needs, debt management, and more."
    },
    {
      question: "How do I prepare for my first consultation?",
      answer: "After scheduling, you'll receive a preparation guide with suggested documents to gather and questions to consider. This helps ensure your consultation is productive and valuable."
    }
  ];

  return (
    <AppLayout>
      <Suspense fallback={<SectionLoadingFallback />}>
        <BreadcrumbNav items={breadcrumbs} />
      </Suspense>
      
      <Suspense fallback={<SectionLoadingFallback />}>
        <PageHero 
          title="Find Your Perfect Financial Advisor"
          subtitle="Connect with experienced financial advisors who match your specific needs and goals. Our intelligent matching system takes the guesswork out of finding the right financial professional."
          primaryCta={{
            text: "Find My Advisor Match",
            link: "/onboarding",
            icon: true
          }}
          secondaryCta={{
            text: "Explore Resources",
            link: "/resources"
          }}
        />
      </Suspense>
      
      <Suspense fallback={<SectionLoadingFallback />}>
        <section className="py-16 bg-white dark:bg-navy-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-center text-navy-900 dark:text-slate-100 mb-12">
              Why Use AdvisorWiz?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-md dark:bg-navy-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/40 rounded-full flex items-center justify-center mb-5">
                    <Shield className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 dark:text-slate-100 mb-3">Verified Professionals</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Every financial advisor on our platform is thoroughly vetted and verified. We check credentials, regulatory standing, and professional history.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md dark:bg-navy-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/40 rounded-full flex items-center justify-center mb-5">
                    <Users className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 dark:text-slate-100 mb-3">Personalized Matching</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Our sophisticated algorithm matches you with advisors based on your financial goals, life stage, investment preferences, and personality compatibility.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md dark:bg-navy-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/40 rounded-full flex items-center justify-center mb-5">
                    <Award className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 dark:text-slate-100 mb-3">No Cost to You</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Our matching service is completely free for consumers. Find your ideal financial advisor without any hidden fees or obligations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </Suspense>
      
      <Suspense fallback={<SectionLoadingFallback />}>
        <PageHowItWorks
          title="How It Works"
          steps={steps}
        />
      </Suspense>
      
      {/* Add social sharing widget */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-sm mx-auto">
          <Suspense fallback={<div className="h-12 w-full bg-slate-200 animate-pulse rounded"></div>}>
            <AppShareWidget variant="standard" />
          </Suspense>
        </div>
      </div>
      
      <Suspense fallback={<SectionLoadingFallback />}>
        <section className="py-16 bg-white dark:bg-navy-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-center text-navy-900 dark:text-slate-100 mb-12">
              Types of Financial Advice
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Retirement Planning",
                  description: "Plan for a secure retirement with strategies for savings, investments, and income distribution."
                },
                {
                  title: "Investment Management",
                  description: "Get expert guidance on building and managing an investment portfolio aligned with your goals."
                },
                {
                  title: "Tax Planning",
                  description: "Minimize your tax burden with strategic planning and optimization strategies."
                },
                {
                  title: "Estate Planning",
                  description: "Ensure your assets are protected and distributed according to your wishes."
                },
                {
                  title: "Insurance Analysis",
                  description: "Evaluate your insurance needs and find the right coverage for your situation."
                },
                {
                  title: "Education Funding",
                  description: "Create a plan to save for education expenses for children or grandchildren."
                },
              ].map((item, index) => (
                <div key={index} className="bg-slate-50 dark:bg-navy-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-navy-900 dark:text-slate-100 mb-2">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Suspense>
      
      <Suspense fallback={<SectionLoadingFallback />}>
        <PageFAQ
          title="Frequently Asked Questions"
          faqs={faqs}
        />
      </Suspense>
      
      <Suspense fallback={<SectionLoadingFallback />}>
        <PageCTA
          title="Ready to Find Your Perfect Financial Advisor?"
          description="Take the first step toward achieving your financial goals with personalized guidance from a matched advisor."
          buttonText="Start Matching Now"
          buttonLink="/onboarding"
        />
      </Suspense>
    </AppLayout>
  );
};

export default ForConsumers;
