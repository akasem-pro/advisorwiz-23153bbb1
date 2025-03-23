
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const MainCTASection: React.FC = () => {
  const handleGetStarted = () => {
    toast.success("You're on your way!", {
      description: "We're excited to help you find the perfect financial advisor."
    });
  };
  
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy-800 to-navy-900 dark:from-[#1A1F2C] dark:to-[#17213c] text-white" aria-labelledby="cta-heading">
      <div className="container mx-auto text-center max-w-4xl">
        <h2 id="cta-heading" className="text-3xl md:text-4xl font-serif font-bold text-white animate-fade-in">
          Ready to Find Your Financial Advisor?
        </h2>
        <p className="mt-4 text-lg text-slate-300 mb-8">
          Join thousands of consumers who have found their perfect financial match through AdvisorWiz.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <div className="flex justify-center mb-3">
              <div className="rounded-full bg-teal-600/20 p-2">
                <Star className="h-6 w-6 text-teal-400" />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">Expertly Matched</h3>
            <p className="text-sm text-slate-300">Find advisors that precisely match your financial needs.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <div className="flex justify-center mb-3">
              <div className="rounded-full bg-teal-600/20 p-2">
                <Shield className="h-6 w-6 text-teal-400" />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">Secure & Private</h3>
            <p className="text-sm text-slate-300">Your financial information is always protected.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <div className="flex justify-center mb-3">
              <div className="rounded-full bg-teal-600/20 p-2">
                <Clock className="h-6 w-6 text-teal-400" />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">Quick Setup</h3>
            <p className="text-sm text-slate-300">Start receiving personalized matches in minutes.</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            asChild
            className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-6 h-auto group"
            onClick={handleGetStarted}
          >
            <Link to="/onboarding">
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white text-white hover:bg-white/10 text-lg px-6 py-6 h-auto"
          >
            <Link to="/pricing">
              View Pricing
            </Link>
          </Button>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-slate-300 font-medium">Trusted by over 10,000 clients nationwide</p>
          <div className="flex justify-center mt-4 space-x-6">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded">
              <span className="text-2xl font-bold">★★★★★</span>
              <p className="text-xs mt-1">4.9/5 Average Rating</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded">
              <span className="text-xl font-bold">98%</span>
              <p className="text-xs mt-1">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCTASection;
