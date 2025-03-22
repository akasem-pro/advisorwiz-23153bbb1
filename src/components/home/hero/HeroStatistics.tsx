
import React from 'react';

const HeroStatistics: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-8">
      <div className="text-center">
        <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">500+</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">Qualified Advisors</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">98%</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">Match Satisfaction</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">$10B+</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">Assets Managed</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">5,000+</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">Successful Matches</p>
      </div>
    </div>
  );
};

export default HeroStatistics;
