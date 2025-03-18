
import React from 'react';
import { Users, BarChart, Clock, User, Briefcase, Building, BadgeCheck, FileCheck, PiggyBank } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const HowItWorksSection: React.FC = () => {
  const consumerSteps = [
    {
      icon: <User className="w-10 h-10 text-teal-500" />,
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

  const advisorSteps = [
    {
      icon: <Briefcase className="w-10 h-10 text-navy-500" />,
      title: "Complete Your Profile",
      description: "Showcase your expertise, credentials, and client approach to stand out to potential clients."
    },
    {
      icon: <BadgeCheck className="w-10 h-10 text-navy-500" />,
      title: "Get Verified",
      description: "Our verification process ensures trust and credibility with potential clients."
    },
    {
      icon: <Users className="w-10 h-10 text-navy-500" />,
      title: "Connect with Clients",
      description: "Get matched with clients who need your specific expertise and grow your practice."
    }
  ];

  const firmSteps = [
    {
      icon: <Building className="w-10 h-10 text-slate-700" />,
      title: "Register Your Firm",
      description: "Create your firm profile and showcase your advisory team's capabilities."
    },
    {
      icon: <FileCheck className="w-10 h-10 text-slate-700" />,
      title: "Manage Your Team",
      description: "Add advisors to your firm and manage their profiles and client connections."
    },
    {
      icon: <PiggyBank className="w-10 h-10 text-slate-700" />,
      title: "Scale Your Practice",
      description: "Use our enterprise tools to grow your firm and increase client acquisition."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="how-it-works-heading">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-600 font-medium">How It Works</span>
          <h2 id="how-it-works-heading" className="mt-2 text-3xl md:text-4xl font-serif font-bold text-navy-900">
            Simple Process for Everyone
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            AdvisorWiz makes financial connections simple, transparent, and tailored to each user's needs.
          </p>
        </div>

        <Tabs defaultValue="consumer" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="consumer" className="text-center py-3">For Consumers</TabsTrigger>
            <TabsTrigger value="advisor" className="text-center py-3">For Advisors</TabsTrigger>
            <TabsTrigger value="firm" className="text-center py-3">For Firms</TabsTrigger>
          </TabsList>
          
          <TabsContent value="consumer" className="mt-0">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {consumerSteps.map((step, index) => (
                <div key={index} className="glass-card rounded-xl p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mb-5">
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
            <div className="text-center mt-8">
              <Link to="/for-consumers" className="inline-flex items-center justify-center px-5 py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-md transition-colors text-sm font-medium">
                Learn more about the consumer journey
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="advisor" className="mt-0">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {advisorSteps.map((step, index) => (
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
            <div className="text-center mt-8">
              <Link to="/for-advisors" className="inline-flex items-center justify-center px-5 py-2.5 bg-navy-50 hover:bg-navy-100 text-navy-700 rounded-md transition-colors text-sm font-medium">
                Learn more about the advisor journey
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="firm" className="mt-0">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {firmSteps.map((step, index) => (
                <div key={index} className="glass-card rounded-xl p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-5">
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
            <div className="text-center mt-8">
              <Link to="/for-firms" className="inline-flex items-center justify-center px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-md transition-colors text-sm font-medium">
                Learn more about the firm journey
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default HowItWorksSection;
