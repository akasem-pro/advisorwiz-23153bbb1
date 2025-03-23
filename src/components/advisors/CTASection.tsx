
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    // Track engagement with the CTA
    toast.success("Great! Let's get you started.", {
      description: "We're excited to help you grow your advisory practice."
    });
    navigate('/onboarding');
  };
  
  return (
    <section className="py-16 bg-gradient-to-br from-navy-800 to-navy-900 dark:from-[#1A1F2C] dark:to-[#17213c] text-white" aria-labelledby="cta-heading">
      <div className="container mx-auto px-4 text-center">
        <h2 id="cta-heading" className="text-3xl md:text-4xl font-serif font-bold mb-5 text-white leading-tight">
          Ready to Grow Your Advisory Practice?
        </h2>
        <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of successful advisors who are growing their business with AdvisorWiz.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <Button 
            onClick={handleGetStarted}
            className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-6 py-7 h-auto group shadow-lg font-medium"
            size="lg"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Button>
          <Button
            onClick={() => navigate('/pricing')}
            variant="secondary"
            className="bg-navy-600/80 hover:bg-navy-600 text-white border-navy-500 text-lg px-6 py-7 h-auto font-medium shadow-md"
            size="lg"
          >
            View Pricing Options
          </Button>
        </div>
        <div className="mt-10 flex items-center justify-center space-x-4">
          <div className="flex -space-x-3">
            <div className="w-10 h-10 rounded-full bg-teal-700 flex items-center justify-center text-sm text-white font-medium ring-2 ring-white">JD</div>
            <div className="w-10 h-10 rounded-full bg-navy-600 flex items-center justify-center text-sm text-white font-medium ring-2 ring-white">SM</div>
            <div className="w-10 h-10 rounded-full bg-teal-800 flex items-center justify-center text-sm text-white font-medium ring-2 ring-white">KP</div>
          </div>
          <p className="text-base text-slate-200 font-medium">Joined by 1,000+ advisors this month</p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
