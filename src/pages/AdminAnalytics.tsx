
import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Button } from '../components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import GA4AnalyticsDashboard from '../components/admin/GA4AnalyticsDashboard';
import AnalyticsDashboard from '../components/admin/AnalyticsDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const AdminAnalytics: React.FC = () => {
  return (
    <DashboardLayout 
      title="Admin Analytics" 
      subtitle="Platform analytics and performance metrics"
      actionButtons={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
      }
    >
      <Tabs defaultValue="platform" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="platform">Platform Analytics</TabsTrigger>
          <TabsTrigger value="ga4">GA4 Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="platform">
          <AnalyticsDashboard />
        </TabsContent>
        
        <TabsContent value="ga4">
          <GA4AnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AdminAnalytics;
