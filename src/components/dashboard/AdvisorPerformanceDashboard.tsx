
import React from 'react';
import { useUser } from '../../context/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { initializeTagManager, trackEvent } from '../../utils/tagManager';
import LeadStats from '../lead/LeadStats';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

const AdvisorPerformanceDashboard: React.FC = () => {
  const { advisorProfile, leads, getLeadStats, getAdvisorLeads } = useUser();
  
  React.useEffect(() => {
    // Initialize tag manager and track dashboard view
    initializeTagManager();
    trackEvent('advisor_dashboard_view', {
      advisor_id: advisorProfile?.id,
      timestamp: new Date().toISOString()
    });
  }, [advisorProfile?.id]);
  
  if (!advisorProfile) {
    return <div className="p-8 text-center">Loading advisor profile...</div>;
  }
  
  const leadStats = getLeadStats();
  const advisorLeads = getAdvisorLeads(advisorProfile.id);
  
  // Calculate engagement metrics
  const responseRates = calculateResponseRates(advisorLeads);
  const conversionBySource = calculateConversionBySource(advisorLeads);
  const leadTrends = generateLeadTrendData(advisorLeads);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-navy-900">Performance Analytics</h1>
        <Badge variant="outline" className="px-3 py-1">
          Last Updated: {new Date().toLocaleDateString()}
        </Badge>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement Analysis</TabsTrigger>
          <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
          <TabsTrigger value="marketing">Marketing & Profile</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard 
                title="Total Leads" 
                value={leadStats.totalLeads.toString()}
                description="Total leads received" 
                trend={+10}
              />
              <MetricCard 
                title="Conversion Rate" 
                value={`${leadStats.conversionRate.toFixed(1)}%`}
                description="Leads to clients" 
                trend={+2.5}
              />
              <MetricCard 
                title="Active Clients" 
                value={leadStats.convertedLeads.toString()}
                description="Current clients" 
                trend={+3}
              />
              <MetricCard 
                title="Avg. Time to Convert" 
                value={`${Math.round(leadStats.averageTimeToConversion)} days`}
                description="Lead to conversion" 
                trend={-1.5}
              />
            </div>
            
            {/* Lead Stats Charts */}
            <LeadStats stats={leadStats} className="mt-6" />
            
            {/* Lead Trends Over Time */}
            <Card>
              <CardHeader>
                <CardTitle>Lead Acquisition Trends</CardTitle>
                <CardDescription>New leads over the past 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  {leadTrends.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={leadTrends}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="leads" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-500">
                      No trend data available yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Engagement Analysis Tab */}
        <TabsContent value="engagement">
          <div className="space-y-6">
            {/* Response Time Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Response Performance</CardTitle>
                <CardDescription>How quickly you respond to potential clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Average Response Time</span>
                      <span className="text-sm font-medium">{responseRates.avgResponseTime} hours</span>
                    </div>
                    <Progress value={Math.min(100, (responseRates.avgResponseTime / 24) * 100)} className="h-2" />
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>Instant</span>
                      <span>12 hours</span>
                      <span>24+ hours</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Response Rate</h4>
                      <div className="text-2xl font-bold">{responseRates.responseRate}%</div>
                      <p className="text-xs text-muted-foreground">Percentage of leads you've responded to</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">24h Response</h4>
                      <div className="text-2xl font-bold">{responseRates.within24h}%</div>
                      <p className="text-xs text-muted-foreground">Responded within 24 hours</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Lead Interaction Score</h4>
                      <div className="text-2xl font-bold">{responseRates.interactionScore}/10</div>
                      <p className="text-xs text-muted-foreground">Based on message frequency and engagement</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Lead Quality Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Lead Quality Analysis</CardTitle>
                <CardDescription>Understanding your lead conversion by source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={conversionBySource}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {conversionBySource.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Conversion Rate by Lead Source</h4>
                    {conversionBySource.map((source, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">{source.name}</span>
                          <span className="text-sm font-medium">{source.conversionRate}%</span>
                        </div>
                        <Progress value={source.conversionRate} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Scheduling Tab (Placeholder) */}
        <TabsContent value="scheduling">
          <Card>
            <CardHeader>
              <CardTitle>Appointments & Scheduling</CardTitle>
              <CardDescription>Coming soon - Track your appointments and meeting metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <p className="text-muted-foreground">This feature is under development</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Marketing Tab (Placeholder) */}
        <TabsContent value="marketing">
          <Card>
            <CardHeader>
              <CardTitle>Profile & Marketing Analytics</CardTitle>
              <CardDescription>Coming soon - Optimize your advisor profile</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <p className="text-muted-foreground">This feature is under development</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper component for metric cards
const MetricCard: React.FC<{
  title: string;
  value: string;
  description: string;
  trend?: number;
}> = ({ title, value, description, trend }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl">{value}</CardTitle>
        <CardDescription className="flex justify-between items-center">
          <span>{description}</span>
          {trend !== undefined && (
            <Badge variant={trend >= 0 ? "success" : "destructive"} className="ml-2">
              {trend >= 0 ? "+" : ""}{trend}%
            </Badge>
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#83a6ed'];

// Helper functions to calculate and format data
const calculateResponseRates = (leads: any[]) => {
  // In a real app, these would be calculated from actual data
  return {
    avgResponseTime: 8.5, // hours
    responseRate: 87,    // percentage
    within24h: 92,       // percentage
    interactionScore: 7.8  // out of 10
  };
};

const calculateConversionBySource = (leads: any[]) => {
  // Mock data for demonstration
  return [
    { name: 'Platform Match', value: 50, conversionRate: 68 },
    { name: 'Direct Search', value: 30, conversionRate: 45 },
    { name: 'Referral', value: 15, conversionRate: 72 },
    { name: 'External', value: 5, conversionRate: 38 }
  ];
};

const generateLeadTrendData = (leads: any[]) => {
  // Generate mock data for lead trends
  const data = [];
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      leads: Math.floor(Math.random() * 5) + 1 // Random value between 1-5
    });
  }
  
  return data;
};

export default AdvisorPerformanceDashboard;
