
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    toast.success("Great! Let's get your firm started.", {
      description: "We're excited to help you manage your advisors and clients efficiently."
    });
    navigate('/onboarding');
  };
  
  return (
    <section className="py-16 bg-gradient-to-br from-navy-800 to-navy-900 dark:from-[#1A1F2C] dark:to-[#17213c] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-5 text-white leading-tight">
          Ready to Elevate Your Advisory Firm?
        </h2>
        <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join AdvisorWiz today and transform how you manage your firm, advisors, and client relationships.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            onClick={handleGetStarted}
            className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-6 py-7 h-auto group shadow-lg font-medium"
          >
            Create Your Firm Account
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            onClick={() => navigate('/pricing')}
            variant="outline"
            className="border-white text-white hover:bg-white/20 text-lg px-6 py-7 h-auto font-medium shadow-md"
          >
            View Enterprise Pricing
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
