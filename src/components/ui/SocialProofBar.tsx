
import React from 'react';
import { Star, Award, Shield, Users, Zap, CheckCircle } from 'lucide-react';

export const SocialProofBar: React.FC = () => {
  return (
    <div className="bg-white dark:bg-navy-800 border-y border-slate-200 dark:border-navy-700 py-4 px-4 shadow-sm">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
          <div className="flex items-center">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-medium text-slate-700 dark:text-slate-300">4.9/5 from 12,000+ reviews</span>
          </div>
          
          <div className="flex items-center">
            <Award className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-slate-700 dark:text-slate-300">Top-rated by CNBC & Forbes</span>
          </div>
          
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-teal-600 dark:text-teal-400" />
            <span className="font-medium text-slate-700 dark:text-slate-300">75,000+ satisfied clients</span>
          </div>
          
          <div className="flex items-center">
            <Shield className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
            <span className="font-medium text-slate-700 dark:text-slate-300">SEC & FINRA compliant</span>
          </div>
          
          <div className="flex items-center">
            <Zap className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
            <span className="font-medium text-slate-700 dark:text-slate-300">Fast & secure matching</span>
          </div>
          
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 text-red-600 dark:text-red-400" />
            <span className="font-medium text-slate-700 dark:text-slate-300">Trusted by industry leaders</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProofBar;
