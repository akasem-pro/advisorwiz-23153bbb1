
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import SecurityDashboard from '../components/admin/SecurityDashboard';
import AccessibilityDashboard from '../components/admin/AccessibilityDashboard';
import { ChevronRight, Shield, Accessibility } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';

const SecurityAndAccessibilityPage: React.FC = () => {
  const { toast } = useToast();
  
  const handleRunAllTests = () => {
    toast({
      title: "Running all security and accessibility tests",
      description: "This may take a few moments to complete.",
      duration: 3000,
    });
  };
  
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Security & Accessibility</h1>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <span>Dashboard</span>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span>Security & Accessibility</span>
            </div>
          </div>
          <Button onClick={handleRunAllTests}>Run All Tests</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-600" />
                <CardTitle>Security Overview</CardTitle>
              </div>
              <CardDescription>
                Monitor and improve your application's security posture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-md">
                  <div className="text-xl font-bold text-green-700">3</div>
                  <div className="text-xs text-muted-foreground">Passed</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-md">
                  <div className="text-xl font-bold text-yellow-700">2</div>
                  <div className="text-xs text-muted-foreground">Warnings</div>
                </div>
                <div className="p-3 bg-red-50 rounded-md">
                  <div className="text-xl font-bold text-red-700">0</div>
                  <div className="text-xs text-muted-foreground">Failed</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Accessibility className="h-5 w-5 mr-2 text-purple-600" />
                <CardTitle>Accessibility Overview</CardTitle>
              </div>
              <CardDescription>
                Ensure your application is usable by everyone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-md">
                  <div className="text-xl font-bold text-green-700">75%</div>
                  <div className="text-xs text-muted-foreground">Compliance</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-md">
                  <div className="text-xl font-bold text-yellow-700">2</div>
                  <div className="text-xs text-muted-foreground">Warnings</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-md">
                  <div className="text-xl font-bold text-blue-700">3</div>
                  <div className="text-xs text-muted-foreground">Info</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="security" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="security" className="flex-1">Security</TabsTrigger>
            <TabsTrigger value="accessibility" className="flex-1">Accessibility</TabsTrigger>
          </TabsList>
          
          <TabsContent value="security">
            <SecurityDashboard />
          </TabsContent>
          
          <TabsContent value="accessibility">
            <AccessibilityDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SecurityAndAccessibilityPage;
