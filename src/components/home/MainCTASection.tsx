
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
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy-800 to-navy-900 dark:from-[#1A1F2C] dark:to-[#17213c]" aria-labelledby="cta-heading">
      <div className="container mx-auto text-center max-w-4xl">
        <h2 id="cta-heading" className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 animate-fade-in leading-tight">
          Ready to Find Your Financial Advisor?
        </h2>
        <p className="mt-4 text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of consumers who have found their perfect financial match through AdvisorWiz.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-navy-700/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-navy-600/30 hover:transform hover:scale-105 transition-all">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-teal-500/20 p-3">
                <Star className="h-7 w-7 text-teal-400" />
              </div>
            </div>
            <h3 className="text-xl font-medium mb-3 text-white">Expertly Matched</h3>
            <p className="text-slate-200">Find advisors that precisely match your financial needs.</p>
          </div>
          
          <div className="bg-navy-700/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-navy-600/30 hover:transform hover:scale-105 transition-all">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-teal-500/20 p-3">
                <Shield className="h-7 w-7 text-teal-400" />
              </div>
            </div>
            <h3 className="text-xl font-medium mb-3 text-white">Secure & Private</h3>
            <p className="text-slate-200">Your financial information is always protected.</p>
          </div>
          
          <div className="bg-navy-700/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-navy-600/30 hover:transform hover:scale-105 transition-all">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-teal-500/20 p-3">
                <Clock className="h-7 w-7 text-teal-400" />
              </div>
            </div>
            <h3 className="text-xl font-medium mb-3 text-white">Quick Setup</h3>
            <p className="text-slate-200">Start receiving personalized matches in minutes.</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
          <Button
            asChild
            className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-7 h-auto group font-medium shadow-lg"
            onClick={handleGetStarted}
          >
            <Link to="/onboarding">
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            className="bg-navy-600 hover:bg-navy-700 text-white text-lg px-6 py-7 h-auto font-medium"
          >
            <Link to="/pricing">
              View Pricing
            </Link>
          </Button>
        </div>
        
        <div className="pt-6 border-t border-navy-600/30 text-center">
          <p className="text-slate-200 font-medium mb-5">Trusted by over 10,000 clients nationwide</p>
          <div className="flex justify-center mt-2 space-x-8">
            <div className="bg-navy-700/50 backdrop-blur-sm px-6 py-3 rounded-lg border border-navy-600/30">
              <span className="text-2xl font-bold text-white">★★★★★</span>
              <p className="text-sm mt-1 text-slate-300">4.9/5 Average Rating</p>
            </div>
            <div className="bg-navy-700/50 backdrop-blur-sm px-6 py-3 rounded-lg border border-navy-600/30">
              <span className="text-2xl font-bold text-teal-400">98%</span>
              <p className="text-sm mt-1 text-slate-300">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCTASection;
