
import React from 'react';
import { Users, BarChart, Clock } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: <Users className="w-10 h-10 text-teal-500" />,
      title: "Create Your Profile",
      description: "Tell us about your financial goals, preferences, and what you're looking for in an advisor."
    },
    {
      icon: <BarChart className="w-10 h-10 text-teal-500" />,
      title: "Match with Advisors",
      description: "Browse and swipe through profiles of pre-vetted financial advisors who match your criteria."
    },
    {
      icon: <Clock className="w-10 h-10 text-teal-500" />,
      title: "Connect & Consult",
      description: "Chat directly within the app and schedule a free consultation with your matched advisor."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="how-it-works-heading">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-600 font-medium">How It Works</span>
          <h2 id="how-it-works-heading" className="mt-2 text-3xl md:text-4xl font-serif font-bold text-navy-900">
            Find Your Financial Advisor in 3 Simple Steps
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            AdvisorWiz makes finding the right financial advisor simple, transparent, and tailored to your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="glass-card rounded-xl p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-navy-50 flex items-center justify-center mb-5">
                {step.icon}
              </div>
              <h3 className="text-xl font-serif font-semibold text-navy-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
