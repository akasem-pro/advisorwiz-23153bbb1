
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart } from 'lucide-react';

const AnalyticsTab: React.FC = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Client Analytics</h3>
        <div>
          <Button variant="outline" size="sm">
            <BarChart className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-5 mb-8">
        <Card className="shadow-sm border-slate-200 dark:border-navy-700">
          <CardContent className="p-5">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Engagement Score</div>
            <div className="text-2xl font-semibold">78%</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 12% from last month</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-slate-200 dark:border-navy-700">
          <CardContent className="p-5">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Response Rate</div>
            <div className="text-2xl font-semibold">92%</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 5% from last month</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-slate-50 dark:bg-navy-800/50 p-8 rounded-lg text-center">
        <BarChart className="h-16 w-16 text-slate-400 mx-auto mb-4" />
        <h4 className="text-lg font-medium mb-3">Client Analytics Dashboard</h4>
        <p className="text-slate-600 dark:text-slate-400 mb-5 max-w-xl mx-auto">
          Detailed analytics dashboard coming soon! Track client engagement, 
          appointment history, and communication patterns.
        </p>
        <Button variant="outline">Request Early Access</Button>
      </div>
    </>
  );
};

export default AnalyticsTab;
