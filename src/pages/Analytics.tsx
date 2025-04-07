
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import BreadcrumbTrail from '../components/navigation/BreadcrumbTrail';

const data = [
  { name: 'Jan', leads: 12, conversions: 8 },
  { name: 'Feb', leads: 19, conversions: 10 },
  { name: 'Mar', leads: 15, conversions: 9 },
  { name: 'Apr', leads: 25, conversions: 15 },
  { name: 'May', leads: 32, conversions: 21 },
  { name: 'Jun', leads: 28, conversions: 18 }
];

const engagementData = [
  { name: 'Week 1', messages: 24, calls: 3, meetings: 1 },
  { name: 'Week 2', messages: 18, calls: 2, meetings: 2 },
  { name: 'Week 3', messages: 32, calls: 5, meetings: 3 },
  { name: 'Week 4', messages: 36, calls: 6, meetings: 4 }
];

const Analytics: React.FC = () => {
  console.log("Analytics page component rendering", new Date().toISOString());
  
  useEffect(() => {
    console.log("Analytics page mounted", new Date().toISOString());
    document.title = "Analytics Dashboard";
    
    return () => {
      console.log("Analytics page unmounted");
    };
  }, []);
  
  const breadcrumbItems = [
    { label: 'Dashboard', path: '/advisor-dashboard' },
    { label: 'Analytics' }
  ];
  
  console.log("Analytics component - Rendering content with breadcrumbs:", breadcrumbItems);
  
  return (
    <div className="analytics-page space-y-6">
      <BreadcrumbTrail items={breadcrumbItems} className="mb-4" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-navy-900 dark:text-white">142</div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">+12.5% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-navy-900 dark:text-white">63.4%</div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">+3.2% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Client Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-navy-900 dark:text-white">4.8/5</div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">Based on 36 reviews</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
          <CardHeader>
            <CardTitle>Leads & Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="leads" fill="#0ea5e9" name="Leads" />
                  <Bar dataKey="conversions" fill="#10b981" name="Conversions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
          <CardHeader>
            <CardTitle>Client Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={engagementData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="messages" stroke="#8884d8" name="Messages" />
                  <Line type="monotone" dataKey="calls" stroke="#82ca9d" name="Calls" />
                  <Line type="monotone" dataKey="meetings" stroke="#ffc658" name="Meetings" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
        <CardHeader>
          <CardTitle>Activity Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-50 dark:bg-navy-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">New Messages</h3>
              <p className="text-2xl font-bold text-navy-900 dark:text-white mt-2">42</p>
            </div>
            <div className="bg-slate-50 dark:bg-navy-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">Scheduled Calls</h3>
              <p className="text-2xl font-bold text-navy-900 dark:text-white mt-2">12</p>
            </div>
            <div className="bg-slate-50 dark:bg-navy-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">Upcoming Meetings</h3>
              <p className="text-2xl font-bold text-navy-900 dark:text-white mt-2">8</p>
            </div>
            <div className="bg-slate-50 dark:bg-navy-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">Profile Views</h3>
              <p className="text-2xl font-bold text-navy-900 dark:text-white mt-2">156</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
