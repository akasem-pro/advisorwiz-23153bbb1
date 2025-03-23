
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
    <section className="py-12 bg-navy-800 dark:bg-[#1A1F2C] text-white" aria-labelledby="cta-heading">
      <div className="container mx-auto px-4 text-center">
        <h2 id="cta-heading" className="text-3xl font-serif font-bold mb-4 text-white">
          Ready to Grow Your Advisory Practice?
        </h2>
        <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">
          Join thousands of successful advisors who are growing their business with AdvisorWiz.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            onClick={handleGetStarted}
            className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-6 py-6 h-auto group"
            size="lg"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Button>
          <Button
            onClick={() => navigate('/pricing')}
            variant="outline"
            className="border-white text-white hover:bg-white/10 text-lg px-6 py-6 h-auto"
            size="lg"
          >
            View Pricing Options
          </Button>
        </div>
        <div className="mt-8 flex items-center justify-center space-x-4">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-teal-700 flex items-center justify-center text-xs text-white">JD</div>
            <div className="w-8 h-8 rounded-full bg-navy-600 flex items-center justify-center text-xs text-white">SM</div>
            <div className="w-8 h-8 rounded-full bg-teal-800 flex items-center justify-center text-xs text-white">KP</div>
          </div>
          <p className="text-sm text-slate-300">Joined by 1,000+ advisors this month</p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
