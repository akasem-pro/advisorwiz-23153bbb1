
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DatePickerWithRange } from "../ui/date-picker-with-range";
import { format, subDays, subMonths, differenceInDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { supabase } from '../../integrations/supabase/client';
import { Button } from '../ui/button';
import { RefreshCw, Download } from 'lucide-react';

interface AnalyticsDashboardProps {
  className?: string;
}

interface AnalyticsData {
  pageViews: number;
  events: number;
  users: number;
  avgEngagementTime: number;
  isLoading: boolean;
  engagementByFeature: { name: string; value: number }[];
  pageViewsByDay: { name: string; value: number }[];
  conversionsByType: { name: string; value: number }[];
  topPages: { path: string; views: number }[];
}

const presetRanges = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 3 months', days: 90 },
];

const OptimizedAnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ className }) => {
  // Date range state with safe initialization
  const [dateRange, setDateRange] = useState<DateRange | { from: Date; to: Date }>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  
  // Analytics data state
  const [data, setData] = useState<AnalyticsData>({
    pageViews: 0,
    events: 0, 
    users: 0,
    avgEngagementTime: 0,
    isLoading: true,
    engagementByFeature: [],
    pageViewsByDay: [],
    conversionsByType: [],
    topPages: []
  });
  
  // Handle date range changes
  const handleDateRangeChange = (range: DateRange) => {
    if (range?.from) {
      setDateRange(range);
    }
  };
  
  // Handle preset range selection
  const handlePresetRange = (days: number) => {
    setDateRange({
      from: subDays(new Date(), days),
      to: new Date()
    });
  };
  
  // Function to fetch analytics data from Supabase
  const fetchAnalyticsData = async () => {
    if (!dateRange.from || !dateRange.to) return;
    
    setData(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Calculate date strings for queries
      const fromDate = dateRange.from.toISOString();
      const toDate = dateRange.to.toISOString();
      
      // Fetch page views count
      const { count: pageViews } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .eq('event_name', 'page_view')
        .gte('timestamp', fromDate)
        .lte('timestamp', toDate);
      
      // Fetch unique users
      const { data: uniqueUsers } = await supabase
        .from('analytics_events')
        .select('user_id')
        .gte('timestamp', fromDate)
        .lte('timestamp', toDate)
        .not('user_id', 'is', null);
      
      const uniqueUserIds = new Set(uniqueUsers?.map(item => item.user_id));
      
      // Fetch total events
      const { count: eventCount } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .gte('timestamp', fromDate)
        .lte('timestamp', toDate);
      
      // Calculate average time on page
      const { data: timeData } = await supabase
        .from('analytics_events')
        .select('properties')
        .eq('event_name', 'page_time')
        .gte('timestamp', fromDate)
        .lte('timestamp', toDate);
      
      let totalTime = 0;
      const timeEntries = timeData?.filter(item => item.properties?.time_seconds) || [];
      totalTime = timeEntries.reduce((sum, item) => sum + (item.properties?.time_seconds || 0), 0);
      const avgTimeOnPage = timeEntries.length ? Math.round(totalTime / timeEntries.length) : 0;
      
      // Get page views by day
      const days = differenceInDays(dateRange.to, dateRange.from) + 1;
      const pageViewsByDay: { name: string; value: number }[] = [];
      
      for (let i = 0; i < days; i++) {
        const date = subDays(dateRange.to, i);
        const startOfDay = new Date(date.setHours(0, 0, 0, 0)).toISOString();
        const endOfDay = new Date(date.setHours(23, 59, 59, 999)).toISOString();
        
        const { count } = await supabase
          .from('analytics_events')
          .select('*', { count: 'exact', head: true })
          .eq('event_name', 'page_view')
          .gte('timestamp', startOfDay)
          .lte('timestamp', endOfDay);
        
        pageViewsByDay.unshift({
          name: format(date, 'MMM dd'),
          value: count || 0
        });
      }
      
      // Get engagement by feature
      const { data: featureData } = await supabase
        .from('analytics_events')
        .select('properties')
        .like('event_name', 'feature_%')
        .gte('timestamp', fromDate)
        .lte('timestamp', toDate);
      
      const featureCounts: Record<string, number> = {};
      featureData?.forEach(item => {
        const featureName = item.properties?.feature_name;
        if (featureName) {
          featureCounts[featureName] = (featureCounts[featureName] || 0) + 1;
        }
      });
      
      const engagementByFeature = Object.entries(featureCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10);
      
      // Get conversions by type
      const { data: conversionData } = await supabase
        .from('analytics_events')
        .select('properties')
        .eq('event_name', 'conversion')
        .gte('timestamp', fromDate)
        .lte('timestamp', toDate);
      
      const conversionCounts: Record<string, number> = {};
      conversionData?.forEach(item => {
        const conversionType = item.properties?.conversion_type;
        if (conversionType) {
          conversionCounts[conversionType] = (conversionCounts[conversionType] || 0) + 1;
        }
      });
      
      const conversionsByType = Object.entries(conversionCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
      
      // Get top pages
      const { data: pagesData } = await supabase
        .from('analytics_events')
        .select('properties')
        .eq('event_name', 'page_view')
        .gte('timestamp', fromDate)
        .lte('timestamp', toDate);
      
      const pageCounts: Record<string, number> = {};
      pagesData?.forEach(item => {
        const path = item.properties?.page_path;
        if (path) {
          pageCounts[path] = (pageCounts[path] || 0) + 1;
        }
      });
      
      const topPages = Object.entries(pageCounts)
        .map(([path, views]) => ({ path, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);
      
      // Update state with all fetched data
      setData({
        pageViews: pageViews || 0,
        events: eventCount || 0,
        users: uniqueUserIds.size,
        avgEngagementTime: avgTimeOnPage,
        isLoading: false,
        pageViewsByDay: pageViewsByDay,
        engagementByFeature,
        conversionsByType,
        topPages
      });
      
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setData(prev => ({ ...prev, isLoading: false }));
    }
  };
  
  // Fetch data when date range changes
  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange]);
  
  // Function to export data as CSV
  const exportToCSV = () => {
    if (!data || data.isLoading) return;
    
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add headers
    csvContent += "Metric,Value\r\n";
    csvContent += `Page Views,${data.pageViews}\r\n`;
    csvContent += `Total Events,${data.events}\r\n`;
    csvContent += `Unique Users,${data.users}\r\n`;
    csvContent += `Avg. Time on Page (sec),${data.avgEngagementTime}\r\n\r\n`;
    
    // Add page views by day
    csvContent += "Date,Page Views\r\n";
    data.pageViewsByDay.forEach(item => {
      csvContent += `${item.name},${item.value}\r\n`;
    });
    
    csvContent += "\r\nFeature,Engagement Count\r\n";
    data.engagementByFeature.forEach(item => {
      csvContent += `${item.name},${item.value}\r\n`;
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `analytics_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className={className}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Track user engagement and platform performance</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {presetRanges.map(range => (
              <Button 
                key={range.label} 
                variant="outline" 
                size="sm"
                onClick={() => handlePresetRange(range.days)}
              >
                {range.label}
              </Button>
            ))}
          </div>
          
          <DatePickerWithRange
            onDateRangeChange={handleDateRangeChange}
            dateRange={dateRange}
          />
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={fetchAnalyticsData}
              disabled={data.isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${data.isLoading ? 'animate-spin' : ''}`} />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={exportToCSV}
              disabled={data.isLoading}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.isLoading ? '...' : data.pageViews.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.isLoading ? '...' : data.events.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Time on Page</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.isLoading ? '...' : `${data.avgEngagementTime}s`}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.isLoading ? '...' : data.users.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="page-views" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="page-views">Page Views</TabsTrigger>
          <TabsTrigger value="engagement">Feature Engagement</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="page-views">
          <Card>
            <CardHeader>
              <CardTitle>Daily Page Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {data.isLoading ? (
                  <div className="h-full flex items-center justify-center">Loading...</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.pageViewsByDay}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" name="Page Views" fill="#4f46e5" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
              
              {!data.isLoading && data.topPages.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Top Pages</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Path</th>
                          <th className="text-right py-2">Views</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.topPages.map((page, i) => (
                          <tr key={i} className="border-b border-muted">
                            <td className="py-2">{page.path}</td>
                            <td className="text-right py-2">{page.views}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>Feature Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {data.isLoading ? (
                  <div className="h-full flex items-center justify-center">Loading...</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.engagementByFeature}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" name="Interactions" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conversions">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {data.isLoading ? (
                  <div className="h-full flex items-center justify-center">Loading...</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.conversionsByType}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" name="Conversions" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OptimizedAnalyticsDashboard;
