
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
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy-800 to-navy-900 dark:from-[#1A1F2C] dark:to-[#17213c]" aria-labelledby="cta-heading">
      <div className="container mx-auto text-center max-w-4xl">
        <h2 id="cta-heading" className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 animate-fade-in leading-tight">
          Ready to Find Your Financial Advisor?
        </h2>
        <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          Join thousands of consumers who have found their perfect financial match through AdvisorWiz.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-navy-700/50 backdrop-blur-sm p-5 rounded-lg border border-navy-600/30 hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex justify-center mb-3">
              <div className="rounded-full bg-teal-500/20 p-3">
                <Star className="h-6 w-6 text-teal-400" />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2 text-white">Expertly Matched</h3>
            <p className="text-slate-200 text-sm">Find advisors that precisely match your financial needs.</p>
          </div>
          
          <div className="bg-navy-700/50 backdrop-blur-sm p-5 rounded-lg border border-navy-600/30 hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex justify-center mb-3">
              <div className="rounded-full bg-teal-500/20 p-3">
                <Shield className="h-6 w-6 text-teal-400" />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2 text-white">Secure & Private</h3>
            <p className="text-slate-200 text-sm">Your financial information is always protected.</p>
          </div>
          
          <div className="bg-navy-700/50 backdrop-blur-sm p-5 rounded-lg border border-navy-600/30 hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex justify-center mb-3">
              <div className="rounded-full bg-teal-500/20 p-3">
                <Clock className="h-6 w-6 text-teal-400" />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2 text-white">Quick Setup</h3>
            <p className="text-slate-200 text-sm">Start receiving personalized matches in minutes.</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <Button
            asChild
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 h-auto font-medium shadow-md hover:shadow-lg transition-all group"
            onClick={handleGetStarted}
          >
            <Link to="/for-consumers">
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="bg-transparent border border-white/30 hover:bg-navy-700 text-white px-6 py-6 h-auto"
          >
            <Link to="/pricing">
              View Pricing
            </Link>
          </Button>
        </div>
        
        <div className="flex justify-center gap-8 text-center">
          <div>
            <span className="text-2xl font-bold text-white">★★★★★</span>
            <p className="text-sm mt-1 text-slate-300">4.9/5 Average Rating</p>
          </div>
          <div>
            <span className="text-2xl font-bold text-teal-400">98%</span>
            <p className="text-sm mt-1 text-slate-300">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCTASection;
