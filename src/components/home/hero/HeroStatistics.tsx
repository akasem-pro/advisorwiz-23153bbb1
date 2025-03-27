
import React from 'react';
import { Users, Handshake, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroStatisticsProps {
  className?: string;
  style?: React.CSSProperties;
}

const HeroStatistics: React.FC<HeroStatisticsProps> = ({ className, style }) => {
  return (
    <div className={cn(
      "bg-white dark:bg-navy-800 shadow-sm border border-slate-200 dark:border-navy-700 rounded-lg py-4 px-6",
      className
    )} style={style}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center space-x-4">
          <div className="bg-teal-50 dark:bg-teal-900/30 p-3 rounded-full">
            <Users className="h-6 w-6 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Active Clients</p>
            <p className="text-2xl font-bold text-navy-900 dark:text-white">24,500+</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-full">
            <Handshake className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Successful Matches</p>
            <p className="text-2xl font-bold text-navy-900 dark:text-white">18,300+</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-full">
            <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Portfolio Growth</p>
            <p className="text-2xl font-bold text-navy-900 dark:text-white">24% Avg</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroStatistics;
