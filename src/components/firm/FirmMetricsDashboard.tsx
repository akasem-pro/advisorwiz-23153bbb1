
import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Users, 
  DollarSign, 
  UserCheck, 
  LineChart, 
  Filter
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, 
         LineChart as RechartsLineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useUser } from '../../context/UserContext';

// Mock data - would be replaced with real data from API/context
const monthlyLeadData = [
  { name: 'Jan', leads: 65, conversions: 28 },
  { name: 'Feb', leads: 59, conversions: 25 },
  { name: 'Mar', leads: 80, conversions: 36 },
  { name: 'Apr', leads: 81, conversions: 42 },
  { name: 'May', leads: 56, conversions: 23 },
  { name: 'Jun', leads: 55, conversions: 19 },
  { name: 'Jul', leads: 40, conversions: 17 },
  { name: 'Aug', leads: 70, conversions: 30 },
  { name: 'Sep', leads: 90, conversions: 38 },
  { name: 'Oct', leads: 77, conversions: 32 },
  { name: 'Nov', leads: 85, conversions: 39 },
  { name: 'Dec', leads: 62, conversions: 26 },
];

const appointmentData = [
  { name: 'Mon', scheduled: 12, completed: 10, cancelled: 2 },
  { name: 'Tue', scheduled: 15, completed: 13, cancelled: 2 },
  { name: 'Wed', scheduled: 18, completed: 16, cancelled: 2 },
  { name: 'Thu', scheduled: 14, completed: 12, cancelled: 2 },
  { name: 'Fri', scheduled: 10, completed: 9, cancelled: 1 },
  { name: 'Sat', scheduled: 5, completed: 4, cancelled: 1 },
  { name: 'Sun', scheduled: 3, completed: 2, cancelled: 1 },
];

const advisorPerformanceData = [
  { name: 'Advisor 1', leads: 92, conversions: 45, revenue: 125000 },
  { name: 'Advisor 2', leads: 78, conversions: 32, revenue: 98000 },
  { name: 'Advisor 3', leads: 104, conversions: 52, revenue: 156000 },
  { name: 'Advisor 4', leads: 65, conversions: 28, revenue: 87000 },
  { name: 'Advisor 5', leads: 85, conversions: 40, revenue: 110000 },
];

const clientSegmentData = [
  { name: 'High Net Worth', value: 35 },
  { name: 'Mass Affluent', value: 45 },
  { name: 'Standard', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const FirmMetricsDashboard: React.FC = () => {
  const { firms } = useUser();
  const [timeRange, setTimeRange] = useState('month');
  
  // For demo, we assume the firm is the first one in the array
  const firm = firms && firms.length > 0 ? firms[0] : null;
  
  // Summary metrics that would come from API/context
  const totalLeads = 240;
  const leadConversions = 103;
  const conversionRate = Math.round((leadConversions / totalLeads) * 100);
  const totalAppointments = 78;
  const totalAdvisors = 5;
  const totalRevenue = 576000;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Firm Metrics {firm?.name ? `for ${firm.name}` : ''}
        </h2>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Summary metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              +12.3% from last {timeRange}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <UserCheck className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              +3.2% from last {timeRange}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAppointments}</div>
            <p className="text-xs text-muted-foreground">
              +5.8% from last {timeRange}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRevenue).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +15.3% from last {timeRange}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <Tabs defaultValue="leads" className="space-y-4">
        <TabsList>
          <TabsTrigger value="leads">Lead Performance</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="advisors">Advisor Performance</TabsTrigger>
          <TabsTrigger value="clients">Client Segments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lead Generation & Conversion</CardTitle>
              <CardDescription>
                Monthly overview of lead generation and conversion rates
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyLeadData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="leads" fill="#8884d8" name="Total Leads" />
                  <Bar dataKey="conversions" fill="#82ca9d" name="Conversions" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Statistics</CardTitle>
              <CardDescription>
                Weekly overview of scheduled, completed, and cancelled appointments
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={appointmentData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="scheduled" fill="#8884d8" name="Scheduled" />
                  <Bar dataKey="completed" fill="#82ca9d" name="Completed" />
                  <Bar dataKey="cancelled" fill="#ff8042" name="Cancelled" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advisors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advisor Performance Comparison</CardTitle>
              <CardDescription>
                Compare key metrics across advisors
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={advisorPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="leads" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }}
                    name="Leads"
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="conversions" 
                    stroke="#82ca9d" 
                    name="Conversions"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#ffc658" 
                    name="Revenue ($)"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Segmentation</CardTitle>
              <CardDescription>
                Distribution of clients by segment
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clientSegmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {clientSegmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FirmMetricsDashboard;
