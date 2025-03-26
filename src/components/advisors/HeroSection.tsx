import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, BarChart, Users, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import OnboardingTooltip from '../onboarding/OnboardingTooltip';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    toast.success("You're on your way to growing your practice!", {
      description: "We're excited to help you connect with qualified clients."
    });
    navigate('/onboarding');
  };
  
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950" aria-labelledby="advisor-heading">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1 bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 text-sm font-medium rounded-full mb-4">
              For Financial Advisors
            </span>
            
            <h1 id="advisor-heading" className="text-4xl md:text-5xl font-serif font-bold text-navy-900 dark:text-white mb-6 animate-fade-in">
              Grow Your Advisory Practice
            </h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 mb-8">
              Connect with qualified clients and streamline your practice with our advanced platform. Join thousands of successful advisors already using AdvisorWiz.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mt-1 mr-2">
                  <Check className="w-3 h-3 text-teal-700 dark:text-teal-400" />
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  <OnboardingTooltip 
                    title="Quality Lead Generation" 
                    description="Our platform only connects you with pre-qualified leads that match your expertise and ideal client profile."
                  >
                    <strong>High-quality leads</strong>
                  </OnboardingTooltip> matched to your expertise and practice
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mt-1 mr-2">
                  <Check className="w-3 h-3 text-teal-700 dark:text-teal-400" />
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  <OnboardingTooltip 
                    title="Automated Scheduling" 
                    description="Save time with our automated scheduling system that syncs with your calendar and handles appointment booking."
                  >
                    <strong>Simplified client acquisition</strong>
                  </OnboardingTooltip> with intelligent matching
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mt-1 mr-2">
                  <Check className="w-3 h-3 text-teal-700 dark:text-teal-400" />
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  <OnboardingTooltip 
                    title="Practice Management Tools" 
                    description="Access a complete suite of tools to manage your practice, track client relationships, and grow your business."
                  >
                    <strong>Comprehensive practice tools</strong>
                  </OnboardingTooltip> for client relationship management
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button 
                onClick={handleGetStarted}
                className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-6 py-6 h-auto group"
                size="lg"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
              
              <Button
                onClick={() => navigate('/pricing')}
                variant="outline"
                className="border-navy-600 text-navy-700 dark:border-slate-300 dark:text-slate-300 hover:bg-navy-50 dark:hover:bg-navy-800 text-lg px-6 py-6 h-auto"
                size="lg"
              >
                View Pricing
              </Button>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-xl relative group">
            <img 
              src="https://images.unsplash.com/photo-1573164574511-73c773193279" 
              alt="Financial advisor discussing investment strategy with clients" 
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
              width="600"
              height="400"
              loading="eager"
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-900/80 to-transparent p-6">
              <div className="grid grid-cols-3 gap-4 text-white">
                <div className="flex flex-col items-center">
                  <BarChart className="h-6 w-6 mb-1 text-teal-400" />
                  <span className="text-lg font-bold">35%</span>
                  <span className="text-xs">Growth Rate</span>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="h-6 w-6 mb-1 text-teal-400" />
                  <span className="text-lg font-bold">5,000+</span>
                  <span className="text-xs">Advisors</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck className="h-6 w-6 mb-1 text-teal-400" />
                  <span className="text-lg font-bold">98%</span>
                  <span className="text-xs">Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
