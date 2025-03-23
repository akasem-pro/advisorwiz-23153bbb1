
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useUser } from '../../context/UserContext';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';
import ABTestDashboard from './ABTestDashboard';
import { Button } from '../ui/button';
import { FilterIcon, DownloadIcon, RefreshIcon } from 'lucide-react';

// Mock data for charts
const pageViewData = [
  { date: '2023-07-01', views: 1200, uniqueVisitors: 780 },
  { date: '2023-07-02', views: 1300, uniqueVisitors: 820 },
  { date: '2023-07-03', views: 1150, uniqueVisitors: 750 },
  { date: '2023-07-04', views: 980, uniqueVisitors: 600 },
  { date: '2023-07-05', views: 1050, uniqueVisitors: 680 },
  { date: '2023-07-06', views: 1370, uniqueVisitors: 900 },
  { date: '2023-07-07', views: 1450, uniqueVisitors: 980 },
  { date: '2023-07-08', views: 1520, uniqueVisitors: 1050 },
  { date: '2023-07-09', views: 1690, uniqueVisitors: 1120 },
  { date: '2023-07-10', views: 1750, uniqueVisitors: 1200 },
  { date: '2023-07-11', views: 1820, uniqueVisitors: 1260 },
  { date: '2023-07-12', views: 1900, uniqueVisitors: 1320 },
  { date: '2023-07-13', views: 2050, uniqueVisitors: 1450 },
  { date: '2023-07-14', views: 2120, uniqueVisitors: 1500 },
];

const matchingData = [
  { date: '2023-07-01', matches: 45, conversions: 12 },
  { date: '2023-07-02', matches: 52, conversions: 15 },
  { date: '2023-07-03', matches: 48, conversions: 14 },
  { date: '2023-07-04', matches: 39, conversions: 11 },
  { date: '2023-07-05', matches: 43, conversions: 13 },
  { date: '2023-07-06', matches: 61, conversions: 18 },
  { date: '2023-07-07', matches: 58, conversions: 17 },
  { date: '2023-07-08', matches: 64, conversions: 20 },
  { date: '2023-07-09', matches: 72, conversions: 23 },
  { date: '2023-07-10', matches: 75, conversions: 25 },
  { date: '2023-07-11', matches: 82, conversions: 28 },
  { date: '2023-07-12', matches: 86, conversions: 30 },
  { date: '2023-07-13', matches: 91, conversions: 32 },
  { date: '2023-07-14', matches: 95, conversions: 35 },
];

const conversionSourceData = [
  { name: 'Matching Algorithm', value: 45 },
  { name: 'Search', value: 20 },
  { name: 'Direct Profile Visit', value: 15 },
  { name: 'Advisor Directory', value: 12 },
  { name: 'Referral', value: 8 },
];

const userTypeData = [
  { name: 'Consumers', value: 68 },
  { name: 'Advisors', value: 32 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AnalyticsDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('14d');
  const [activeTab, setActiveTab] = useState('overview');
  
  // In a real app, you would fetch this data based on the selected date range
  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    // Fetch new data for the selected date range
    console.log(`Fetching data for range: ${value}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={handleDateRangeChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="14d">Last 14 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <FilterIcon className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon">
            <DownloadIcon className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon">
            <RefreshIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="matching">Matching</TabsTrigger>
          <TabsTrigger value="tests">A/B Tests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24,532</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+12.5%</span> from last period
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6,789</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+8.2%</span> from last period
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Matches Made</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">893</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+15.3%</span> from last period
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32.4%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500">-2.1%</span> from last period
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={pageViewData}>
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="views" 
                        stroke="#8884d8" 
                        name="Page Views" 
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="uniqueVisitors" 
                        stroke="#82ca9d" 
                        name="Unique Visitors" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Matches & Conversions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={matchingData}>
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="matches" fill="#8884d8" name="Matches" />
                      <Bar dataKey="conversions" fill="#82ca9d" name="Conversions" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={conversionSourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {conversionSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        <Cell fill="#0088FE" />
                        <Cell fill="#00C49F" />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="traffic">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Detailed traffic analytics content would go here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="matching">
          <Card>
            <CardHeader>
              <CardTitle>Matching Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Detailed matching performance content would go here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tests">
          <ABTestDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
