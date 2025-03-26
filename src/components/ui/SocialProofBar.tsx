
import React from 'react';
import { Star, Award, Shield, Users } from 'lucide-react';

export const SocialProofBar: React.FC = () => {
  return (
    <div className="bg-white dark:bg-navy-800 border-y border-slate-200 dark:border-navy-700 py-3 px-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
          <div className="flex items-center">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-medium text-slate-700 dark:text-slate-300">4.9/5 from 10,000+ reviews</span>
          </div>
          
          <div className="flex items-center">
            <Award className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-slate-700 dark:text-slate-300">Top-rated by CNBC</span>
          </div>
          
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-teal-600 dark:text-teal-400" />
            <span className="font-medium text-slate-700 dark:text-slate-300">50,000+ satisfied clients</span>
          </div>
          
          <div className="flex items-center">
            <Shield className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
            <span className="font-medium text-slate-700 dark:text-slate-300">SEC & FINRA compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProofBar;
