
import React from 'react';
import { Users, BarChart, Clock, User, Briefcase, Building, BadgeCheck, FileCheck, PiggyBank } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useIsMobile } from '../../hooks/use-mobile';

const HowItWorksSection: React.FC = () => {
  const isMobile = useIsMobile();
  
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
      icon: <Building className="w-10 h-10 text-slate-700 dark:text-slate-300" />,
      title: "Register Your Firm",
      description: "Create your firm profile and showcase your advisory team's capabilities."
    },
    {
      icon: <FileCheck className="w-10 h-10 text-slate-700 dark:text-slate-300" />,
      title: "Manage Your Team",
      description: "Add advisors to your firm and manage their profiles and client connections."
    },
    {
      icon: <PiggyBank className="w-10 h-10 text-slate-700 dark:text-slate-300" />,
      title: "Scale Your Practice",
      description: "Use our enterprise tools to grow your firm and increase client acquisition."
    }
  ];

  return (
    <section id="how-it-works" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-navy-950" aria-labelledby="how-it-works-heading">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-teal-600 dark:text-teal-400 font-medium">How It Works</span>
          <h2 id="how-it-works-heading" className="mt-2 text-3xl md:text-4xl font-serif font-bold text-navy-900 dark:text-white">
            Simple Process for Everyone
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            AdvisorWiz makes financial connections simple, transparent, and tailored to each user's needs.
          </p>
        </div>

        <Tabs defaultValue="consumer" className="w-full max-w-4xl mx-auto">
          <TabsList className={`${isMobile ? 'h-auto py-1' : ''} grid w-full grid-cols-3 mb-8 dark:bg-navy-800`}>
            <TabsTrigger 
              value="consumer" 
              className={`${isMobile ? 'py-2 text-xs' : 'py-3'} text-center dark:data-[state=active]:bg-navy-700 dark:data-[state=active]:text-white dark:text-slate-300`}
            >
              For Consumers
            </TabsTrigger>
            <TabsTrigger 
              value="advisor" 
              className={`${isMobile ? 'py-2 text-xs' : 'py-3'} text-center dark:data-[state=active]:bg-navy-700 dark:data-[state=active]:text-white dark:text-slate-300`}
            >
              For Advisors
            </TabsTrigger>
            <TabsTrigger 
              value="firm" 
              className={`${isMobile ? 'py-2 text-xs' : 'py-3'} text-center dark:data-[state=active]:bg-navy-700 dark:data-[state=active]:text-white dark:text-slate-300`}
            >
              For Firms
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="consumer" className="mt-0">
            <div className="grid md:grid-cols-3 gap-4 md:gap-12">
              {consumerSteps.map((step, index) => (
                <div key={index} className="glass-card rounded-xl p-5 flex flex-col items-center text-center dark:bg-navy-800 dark:border-navy-700">
                  <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-navy-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className={`${isMobile ? 'text-sm' : ''} text-slate-600 dark:text-slate-300`}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/for-consumers" className="inline-flex items-center justify-center px-5 py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:hover:bg-teal-900/50 dark:text-teal-300 rounded-md transition-colors text-sm font-medium">
                Learn more about the consumer journey
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="advisor" className="mt-0">
            <div className="grid md:grid-cols-3 gap-4 md:gap-12">
              {advisorSteps.map((step, index) => (
                <div key={index} className="glass-card rounded-xl p-5 flex flex-col items-center text-center dark:bg-navy-800 dark:border-navy-700">
                  <div className="w-16 h-16 rounded-full bg-navy-50 dark:bg-navy-700 flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-navy-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className={`${isMobile ? 'text-sm' : ''} text-slate-600 dark:text-slate-300`}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/for-advisors" className="inline-flex items-center justify-center px-5 py-2.5 bg-navy-50 hover:bg-navy-100 text-navy-700 dark:bg-navy-700 dark:hover:bg-navy-600 dark:text-slate-200 rounded-md transition-colors text-sm font-medium">
                Learn more about the advisor journey
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="firm" className="mt-0">
            <div className="grid md:grid-cols-3 gap-4 md:gap-12">
              {firmSteps.map((step, index) => (
                <div key={index} className="glass-card rounded-xl p-5 flex flex-col items-center text-center dark:bg-navy-800 dark:border-navy-700">
                  <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-navy-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className={`${isMobile ? 'text-sm' : ''} text-slate-600 dark:text-slate-300`}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/for-firms" className="inline-flex items-center justify-center px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 rounded-md transition-colors text-sm font-medium">
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
