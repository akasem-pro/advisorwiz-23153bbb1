
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewTab from './tabs/OverviewTab';
import AppointmentsTab from './tabs/AppointmentsTab';
import NotesTab from './tabs/NotesTab';
import AnalyticsTab from './tabs/AnalyticsTab';
import { ClientData } from '@/types/clientTypes';

interface ClientTabsProps {
  client: ClientData;
  activeTab: string;
  setActiveTab: (value: string) => void;
  onScheduleAppointment: () => void;
}

const ClientTabs: React.FC<ClientTabsProps> = ({ 
  client, 
  activeTab, 
  setActiveTab,
  onScheduleAppointment
}) => {
  return (
    <Card className="shadow-sm border-slate-200 dark:border-navy-700">
      <CardHeader className="pb-3">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <TabsContent value="overview" className="mt-0">
          <OverviewTab client={client} />
        </TabsContent>
        
        <TabsContent value="appointments" className="mt-0">
          <AppointmentsTab client={client} onScheduleAppointment={onScheduleAppointment} />
        </TabsContent>
        
        <TabsContent value="notes" className="mt-0">
          <NotesTab client={client} />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-0">
          <AnalyticsTab />
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default ClientTabs;
