
import React from 'react';
import { Users, BarChart, Shield, Clock, Award, PieChart } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-navy-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-navy-900 dark:text-white mb-4">
            Why Choose AdvisorWiz for Your Firm
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Streamline operations, improve client matches, and grow your advisory business with our powerful platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-slate-50 dark:bg-navy-800 rounded-xl p-6">
            <div className="w-14 h-14 bg-teal-100 dark:bg-teal-800/30 rounded-full flex items-center justify-center mb-4">
              <Users className="h-7 w-7 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">Team Management</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Manage multiple advisor profiles under a single firm account with role-based permissions and controls.
            </p>
          </div>
          
          <div className="bg-slate-50 dark:bg-navy-800 rounded-xl p-6">
            <div className="w-14 h-14 bg-teal-100 dark:bg-teal-800/30 rounded-full flex items-center justify-center mb-4">
              <BarChart className="h-7 w-7 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">Performance Analytics</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Gain insights into your firm's performance with comprehensive dashboards and reporting tools.
            </p>
          </div>
          
          <div className="bg-slate-50 dark:bg-navy-800 rounded-xl p-6">
            <div className="w-14 h-14 bg-teal-100 dark:bg-teal-800/30 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-7 w-7 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">Compliance Tools</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Ensure all advisors in your firm adhere to regulations with our built-in compliance monitoring and alerts.
            </p>
          </div>
          
          <div className="bg-slate-50 dark:bg-navy-800 rounded-xl p-6">
            <div className="w-14 h-14 bg-teal-100 dark:bg-teal-800/30 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-7 w-7 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">Efficient Onboarding</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Streamlined client onboarding process reduces administrative work and improves client experience.
            </p>
          </div>
          
          <div className="bg-slate-50 dark:bg-navy-800 rounded-xl p-6">
            <div className="w-14 h-14 bg-teal-100 dark:bg-teal-800/30 rounded-full flex items-center justify-center mb-4">
              <PieChart className="h-7 w-7 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">Resource Allocation</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Optimize your team's workload with intelligent task assignment and resource management tools.
            </p>
          </div>
          
          <div className="bg-slate-50 dark:bg-navy-800 rounded-xl p-6">
            <div className="w-14 h-14 bg-teal-100 dark:bg-teal-800/30 rounded-full flex items-center justify-center mb-4">
              <Award className="h-7 w-7 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">Brand Enhancement</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Showcase your firm's unique value proposition and strengthen your digital presence to attract more clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
