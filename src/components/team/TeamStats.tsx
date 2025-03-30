
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description }) => {
  return (
    <Card className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-navy-900 dark:text-white">{value}</div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};

interface TeamStatsProps {
  stats: Array<{
    title: string;
    value: string | number;
    description: string;
  }>;
}

const TeamStats: React.FC<TeamStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <StatCard 
          key={index}
          title={stat.title}
          value={stat.value}
          description={stat.description}
        />
      ))}
    </div>
  );
};

export default TeamStats;
