
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DatePickerWithRange } from "../ui/date-picker-with-range";
import { format, subDays } from 'date-fns';
import useGA4Analytics from '../../hooks/useGA4Analytics';
import { DateRange } from 'react-day-picker';

interface GA4AnalyticsDashboardProps {
  className?: string;
}

const GA4AnalyticsDashboard: React.FC<GA4AnalyticsDashboardProps> = ({ className }) => {
  // Date range state - initialize both from and to as required
  const [dateRange, setDateRange] = useState<DateRange | { from: Date; to: Date }>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  // Handle date range changes safely
  const handleDateRangeChange = (range: DateRange) => {
    // Only update if both from and to are provided, or just from
    if (range?.from) {
      setDateRange(range);
    }
  };

  // Custom hook to fetch GA4 analytics - only pass dates if they exist
  const analytics = useGA4Analytics(
    dateRange?.from, 
    dateRange?.to
  );

  // Mock data for charts - in a real implementation, this would use actual GA4 data
  const pageViewsData = [
    { name: format(subDays(new Date(), 6), 'EEE'), value: 245 },
    { name: format(subDays(new Date(), 5), 'EEE'), value: 312 },
    { name: format(subDays(new Date(), 4), 'EEE'), value: 279 },
    { name: format(subDays(new Date(), 3), 'EEE'), value: 305 },
    { name: format(subDays(new Date(), 2), 'EEE'), value: 267 },
    { name: format(subDays(new Date(), 1), 'EEE'), value: 190 },
    { name: format(new Date(), 'EEE'), value: 148 }
  ];

  const eventsData = [
    { name: format(subDays(new Date(), 6), 'EEE'), value: 578 },
    { name: format(subDays(new Date(), 5), 'EEE'), value: 623 },
    { name: format(subDays(new Date(), 4), 'EEE'), value: 542 },
    { name: format(subDays(new Date(), 3), 'EEE'), value: 612 },
    { name: format(subDays(new Date(), 2), 'EEE'), value: 587 },
    { name: format(subDays(new Date(), 1), 'EEE'), value: 489 },
    { name: format(new Date(), 'EEE'), value: 346 }
  ];

  const userEngagementData = [
    { name: 'Search', value: 765 },
    { name: 'Match View', value: 893 },
    { name: 'Profile View', value: 567 },
    { name: 'Contact', value: 234 },
    { name: 'Appointment', value: 178 }
  ];

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">GA4 Analytics Dashboard</h2>
        <DatePickerWithRange
          onDateRangeChange={handleDateRangeChange}
          dateRange={dateRange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.pageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.3% from previous period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.eventCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+5.7% from previous period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageEngagementTime}s</div>
            <p className="text-xs text-muted-foreground">+18.9% from previous period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.userCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8.2% from previous period</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="page-views" className="w-full">
        <TabsList>
          <TabsTrigger value="page-views">Page Views</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="user-engagement">User Engagement</TabsTrigger>
        </TabsList>
        
        <TabsContent value="page-views" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Page Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pageViewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Page Views" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={eventsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Events" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="user-engagement" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement by Feature</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userEngagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Interactions" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GA4AnalyticsDashboard;
