
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Check, Shield, Users, Award, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

const ForConsumers: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'For Consumers', url: '/for-consumers' }
  ];

  return (
    <AppLayout>
      <BreadcrumbNav items={breadcrumbs} />
      
      <section className="bg-gradient-to-b from-slate-50 to-white dark:from-navy-950 dark:to-navy-900 pt-16 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 dark:text-white mb-6 leading-tight">
              Find Your Perfect Financial Advisor
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
              Connect with experienced financial advisors who match your specific needs and goals. Our intelligent matching system takes the guesswork out of finding the right financial professional.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-6 text-lg h-auto">
                <Link to="/onboarding">
                  Find My Advisor Match
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-navy-300 text-navy-700 dark:border-navy-600 dark:text-slate-200 rounded-full px-8 py-6 text-lg h-auto">
                <Link to="/resources">
                  Explore Resources
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
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
      
      <section className="py-16 bg-slate-50 dark:bg-navy-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center text-navy-900 dark:text-slate-100 mb-12">
            How It Works
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-teal-200 dark:bg-teal-900/60"></div>
              
              <div className="relative z-10 mb-12">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-teal-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-8">1</div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy-900 dark:text-slate-100 mb-2">Complete a Simple Profile</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">Tell us about your financial situation, goals, and preferences. This helps us understand what you're looking for in an advisor.</p>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 mb-12">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-teal-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-8">2</div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy-900 dark:text-slate-100 mb-2">Review Your Matches</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">We'll present you with a selection of advisors who best match your needs. Browse their profiles, credentials, and specialties.</p>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 mb-12">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-teal-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-8">3</div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy-900 dark:text-slate-100 mb-2">Connect with Advisors</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">Schedule an initial consultation with advisors who interest you. This can be done directly through our platform.</p>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-teal-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-8">4</div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy-900 dark:text-slate-100 mb-2">Choose Your Advisor</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">After your consultations, select the advisor who best meets your needs and start working together on your financial future.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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
      
      <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Ready to Find Your Perfect Financial Advisor?</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Take the first step toward achieving your financial goals with personalized guidance from a matched advisor.
          </p>
          <Button asChild size="lg" className="bg-white text-teal-700 hover:bg-teal-50 rounded-full px-8 py-6 text-lg h-auto">
            <Link to="/onboarding">
              Start Matching Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </AppLayout>
  );
};

export default ForConsumers;
