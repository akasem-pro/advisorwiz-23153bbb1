
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { ChevronLeft, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';
import AuthGuard from '../components/auth/AuthGuard';
import { useToast } from '../components/ui/use-toast';
import ClientProfileCard from '../components/client/ClientProfileCard';
import ClientTabs from '../components/client/ClientTabs';
import { ClientData } from '../types/clientTypes';

const ClientDetail: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [client, setClient] = useState<ClientData | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, you would fetch the client data from your API
    // For now, we'll use mock data
    setTimeout(() => {
      setClient({
        id: clientId || '',
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '(555) 123-4567',
        lastContact: '2 days ago',
        tags: ['Retirement', 'Investment'],
        matchScore: 95,
        notes: [
          'Discussed retirement goals on last call',
          'Interested in sustainable investing options',
          'Follow up about 401k rollover options'
        ],
        appointmentHistory: [
          {
            date: '2025-04-15T10:00:00',
            title: 'Quarterly Portfolio Review',
            status: 'upcoming'
          },
          {
            date: '2025-03-01T14:30:00',
            title: 'Financial Plan Discussion',
            status: 'completed'
          },
          {
            date: '2025-02-10T11:00:00',
            title: 'Tax Planning Session',
            status: 'completed'
          }
        ]
      });
      setIsLoading(false);
    }, 500);
  }, [clientId]);

  const breadcrumbs = [
    { name: "Dashboard", url: "/advisor-dashboard" },
    { name: "Clients", url: "/leads" },
    { name: client?.name || "Client Details", url: `/client/${clientId}` }
  ];

  const handleScheduleAppointment = () => {
    toast("Scheduling appointment - Redirecting to schedule page");
    // In a real app, this would navigate to the scheduling page
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-slate-200 h-24 w-24 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-48 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-32"></div>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!client) {
    return (
      <AppLayout>
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <User className="h-16 w-16 text-slate-300 mb-4" />
              <h2 className="text-2xl font-medium mb-2">Client Not Found</h2>
              <p className="text-slate-500 mb-6">The client you're looking for doesn't exist or has been removed.</p>
              <Link to="/advisor-dashboard">
                <Button>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Return to Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AuthGuard userTypes={['advisor', 'firm_admin']}>
      <AppLayout>
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <BreadcrumbNav items={breadcrumbs} />
          
          <div className="flex flex-col lg:flex-row gap-8 mt-6">
            {/* Client Profile Card */}
            <div className="lg:w-1/3">
              <ClientProfileCard 
                client={client} 
                onScheduleAppointment={handleScheduleAppointment} 
              />
            </div>
            
            {/* Main Content Area */}
            <div className="lg:w-2/3">
              <ClientTabs 
                client={client} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                onScheduleAppointment={handleScheduleAppointment} 
              />
            </div>
          </div>
        </div>
      </AppLayout>
    </AuthGuard>
  );
};

export default ClientDetail;
