
import React from 'react';
import { useUser } from '../../context/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { initializeTagManager, trackEvent } from '../../utils/tagManager';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { FinancialFirm, AdvisorProfile } from '../../types/userTypes';

interface FirmManagementDashboardProps {
  firm: FinancialFirm;
}

const FirmManagementDashboard: React.FC<FirmManagementDashboardProps> = ({ firm }) => {
  const { advisorProfile, leads } = useUser();
  
  React.useEffect(() => {
    // Initialize tag manager and track dashboard view
    initializeTagManager();
    trackEvent('firm_dashboard_view', {
      firm_id: firm.id,
      admin_id: advisorProfile?.id,
      timestamp: new Date().toISOString()
    });
  }, [firm.id, advisorProfile?.id]);
  
  // For demo purposes, we'll use mock data for the advisor team
  const advisorTeam = generateMockAdvisorTeam();
  const teamPerformance = calculateTeamPerformance(advisorTeam);
  const leadDistributionData = generateLeadDistributionData();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-navy-900">{firm.name} - Team Dashboard</h1>
        <Badge variant="outline" className="px-3 py-1">
          Last Updated: {new Date().toLocaleDateString()}
        </Badge>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview">Firm Overview</TabsTrigger>
          <TabsTrigger value="advisors">Advisor Performance</TabsTrigger>
          <TabsTrigger value="leads">Lead Management</TabsTrigger>
          <TabsTrigger value="analytics">Business Analytics</TabsTrigger>
        </TabsList>
        
        {/* Firm Overview Tab */}
        <TabsContent value="overview">
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard 
                title="Total Leads" 
                value={teamPerformance.totalLeads.toString()}
                description="Across all advisors" 
                trend={+15}
              />
              <MetricCard 
                title="Conversion Rate" 
                value={`${teamPerformance.conversionRate.toFixed(1)}%`}
                description="Firm-wide average" 
                trend={+3.2}
              />
              <MetricCard 
                title="Active Clients" 
                value={teamPerformance.activeClients.toString()}
                description="Currently engaged" 
                trend={+8}
              />
              <MetricCard 
                title="Team Response Time" 
                value={`${teamPerformance.avgResponseTime}h`}
                description="Average time to respond" 
                trend={-2.5}
              />
            </div>
            
            {/* Team Performance Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Advisor team performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={teamPerformance.trends}>
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="leads" name="Total Leads" stroke="#0ea5e9" strokeWidth={2} />
                      <Line type="monotone" dataKey="conversions" name="Conversions" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Lead Distribution by Advisor Category */}
            <Card>
              <CardHeader>
                <CardTitle>Lead Distribution</CardTitle>
                <CardDescription>Distribution of leads by advisor specialty</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={leadDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {leadDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Leads by Specialty</h4>
                    {leadDistributionData.map((category, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">{category.name}</span>
                          <span className="text-sm font-medium">{category.value} leads</span>
                        </div>
                        <Progress value={(category.value / teamPerformance.totalLeads) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Advisor Performance Tab */}
        <TabsContent value="advisors">
          <Card>
            <CardHeader>
              <CardTitle>Advisor Performance Metrics</CardTitle>
              <CardDescription>Compare performance across your advisory team</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Advisor</TableHead>
                    <TableHead>Leads</TableHead>
                    <TableHead>Conversion Rate</TableHead>
                    <TableHead>Avg. Response</TableHead>
                    <TableHead>Client Rating</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {advisorTeam.map((advisor, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{advisor.name}</TableCell>
                      <TableCell>{advisor.leads}</TableCell>
                      <TableCell>{advisor.conversionRate}%</TableCell>
                      <TableCell>{advisor.responseTime}h</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="mr-2">{advisor.rating}</span>
                          <Progress value={advisor.rating * 20} className="h-2 w-20" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={getPerformanceBadgeVariant(advisor.performance)} 
                          className="whitespace-nowrap"
                        >
                          {advisor.performance}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Advisor Activity Chart */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Advisor Activity</CardTitle>
              <CardDescription>Engagement metrics across your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={advisorTeam} 
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                  >
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="leads" name="Total Leads" fill="#0ea5e9" stackId="a" />
                    <Bar dataKey="converted" name="Converted Leads" fill="#10b981" stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Lead Management Tab (Placeholder) */}
        <TabsContent value="leads">
          <Card>
            <CardHeader>
              <CardTitle>Lead Distribution Management</CardTitle>
              <CardDescription>Coming soon - Auto-assign leads and track their progress</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <p className="text-muted-foreground">This feature is under development</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Business Analytics Tab (Placeholder) */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Business Analytics</CardTitle>
              <CardDescription>Coming soon - Advanced revenue tracking and market insights</CardDescription>
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

// Helper functions
const generateMockAdvisorTeam = () => {
  // Mock data for demonstration
  return [
    { 
      name: "Sarah Johnson", 
      leads: 45, 
      converted: 15,
      conversionRate: 33.3, 
      responseTime: 2.5, 
      rating: 4.8, 
      performance: "Excellent" 
    },
    { 
      name: "James Rodriguez", 
      leads: 38, 
      converted: 11,
      conversionRate: 28.9, 
      responseTime: 5.2, 
      rating: 4.5, 
      performance: "Good" 
    },
    { 
      name: "Lisa Chen", 
      leads: 52, 
      converted: 18,
      conversionRate: 34.6, 
      responseTime: 1.8, 
      rating: 4.9, 
      performance: "Excellent" 
    },
    { 
      name: "Michael Thompson", 
      leads: 29, 
      converted: 7,
      conversionRate: 24.1, 
      responseTime: 8.5, 
      rating: 3.7, 
      performance: "Average" 
    },
    { 
      name: "David Wilson", 
      leads: 31, 
      converted: 5,
      conversionRate: 16.1, 
      responseTime: 12.3, 
      rating: 3.2, 
      performance: "Below Average" 
    }
  ];
};

const calculateTeamPerformance = (advisorTeam: any[]) => {
  const totalLeads = advisorTeam.reduce((sum, advisor) => sum + advisor.leads, 0);
  const convertedLeads = advisorTeam.reduce((sum, advisor) => sum + advisor.converted, 0);
  const conversionRate = (convertedLeads / totalLeads) * 100;
  const avgResponseTime = advisorTeam.reduce((sum, advisor) => sum + advisor.responseTime, 0) / advisorTeam.length;
  
  // Generate mock trend data
  const trends = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  for (let i = 0; i < months.length; i++) {
    trends.push({
      period: months[i],
      leads: Math.floor(Math.random() * 50) + 30,
      conversions: Math.floor(Math.random() * 20) + 10
    });
  }
  
  return {
    totalLeads,
    convertedLeads,
    activeClients: Math.round(convertedLeads * 0.8), // Assuming 80% of converted leads are active
    conversionRate,
    avgResponseTime,
    trends
  };
};

const generateLeadDistributionData = () => {
  // Mock data for lead distribution by specialty
  return [
    { name: "Retirement Planning", value: 45 },
    { name: "Investment Management", value: 38 },
    { name: "Tax Planning", value: 27 },
    { name: "Estate Planning", value: 21 },
    { name: "Insurance", value: 14 }
  ];
};

const getPerformanceBadgeVariant = (performance: string) => {
  switch(performance) {
    case "Excellent": return "success";
    case "Good": return "secondary";
    case "Average": return "default";
    case "Below Average": return "destructive";
    default: return "outline";
  }
};

export default FirmManagementDashboard;
