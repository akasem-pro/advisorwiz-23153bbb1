import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  User, 
  Phone, 
  Video, 
  Mail, 
  Calendar, 
  ClipboardList, 
  ChevronLeft,
  BarChart,
  Clock,
  Tag
} from 'lucide-react';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';
import AuthGuard from '../components/auth/AuthGuard';
import { useToast } from '../components/ui/use-toast';

interface ClientData {
  id: string;
  name: string;
  profilePicture?: string;
  email: string;
  phone?: string;
  lastContact?: string;
  tags: string[];
  matchScore?: number;
  notes?: string[];
  appointmentHistory?: {
    date: string;
    title: string;
    status: 'completed' | 'upcoming' | 'cancelled';
  }[];
}

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
              <Card className="shadow-sm border-slate-200 dark:border-navy-700">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Client Profile</CardTitle>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-8">
                    {client?.profilePicture ? (
                      <img 
                        src={client.profilePicture} 
                        alt={client.name} 
                        className="w-28 h-28 rounded-full mb-4"
                      />
                    ) : (
                      <div className="w-28 h-28 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4">
                        <span className="text-4xl font-medium">{client?.name.charAt(0)}</span>
                      </div>
                    )}
                    <h2 className="text-2xl font-semibold">{client?.name}</h2>
                    
                    {client?.matchScore && (
                      <div className="mt-2 text-sm text-slate-600">
                        <span className="font-medium">Match Score:</span> {client.matchScore}%
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-5">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-3 text-slate-500" />
                      <span>{client?.email}</span>
                    </div>
                    
                    {client?.phone && (
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-3 text-slate-500" />
                        <span>{client.phone}</span>
                      </div>
                    )}
                    
                    {client?.lastContact && (
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-3 text-slate-500" />
                        <span>Last contact: {client.lastContact}</span>
                      </div>
                    )}
                    
                    <div className="pt-4">
                      <div className="flex items-center mb-3">
                        <Tag className="h-5 w-5 mr-2 text-slate-500" />
                        <span className="font-medium">Tags</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {client?.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-slate-100 px-3 py-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  
                    <div className="grid grid-cols-2 gap-3 mt-8">
                      <Link to={`/call/${client?.id}`}>
                        <Button className="w-full" variant="outline">
                          <Phone className="mr-2 h-4 w-4" />
                          Call
                        </Button>
                      </Link>
                      <Link to={`/call/${client?.id}`}>
                        <Button className="w-full" variant="outline">
                          <Video className="mr-2 h-4 w-4" />
                          Video
                        </Button>
                      </Link>
                      <Button className="w-full col-span-2 bg-blue-600 hover:bg-blue-700" onClick={handleScheduleAppointment}>
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Meeting
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content Area */}
            <div className="lg:w-2/3">
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
                    <h3 className="text-lg font-medium mb-4">Client Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                      <div className="bg-slate-50 dark:bg-navy-800/50 p-5 rounded-lg">
                        <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Next Appointment</div>
                        <div className="font-medium text-lg">
                          {client?.appointmentHistory?.find(a => a.status === 'upcoming')?.title || 'No upcoming appointments'}
                        </div>
                        <div className="text-sm text-slate-500 mt-1">
                          {client?.appointmentHistory?.find(a => a.status === 'upcoming')?.date
                            ? new Date(client?.appointmentHistory?.find(a => a.status === 'upcoming')?.date || '').toLocaleDateString()
                            : 'Schedule one now'}
                        </div>
                      </div>
                      <div className="bg-slate-50 dark:bg-navy-800/50 p-5 rounded-lg">
                        <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Last Interaction</div>
                        <div className="font-medium text-lg">Phone Call</div>
                        <div className="text-sm text-slate-500 mt-1">{client?.lastContact}</div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                    <div className="space-y-5">
                      {client?.appointmentHistory?.slice(0, 3).map((appointment, index) => (
                        <div key={index} className="flex items-start border-b pb-4 last:border-0">
                          <div className={`p-2.5 rounded-full mr-4 ${
                            appointment.status === 'completed' ? 'bg-blue-100 dark:bg-blue-900/30' : 
                            appointment.status === 'upcoming' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                          }`}>
                            <Calendar className={`h-5 w-5 ${
                              appointment.status === 'completed' ? 'text-blue-600 dark:text-blue-400' : 
                              appointment.status === 'upcoming' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            }`} />
                          </div>
                          <div>
                            <div className="font-medium text-base">{appointment.title}</div>
                            <div className="text-sm text-slate-500 mt-0.5">
                              {new Date(appointment.date).toLocaleDateString()} at {new Date(appointment.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                            <div className="text-xs mt-2">
                              <Badge variant="outline" className={`${
                                appointment.status === 'completed' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' : 
                                appointment.status === 'upcoming' ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300' : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300'
                              }`}>
                                {appointment.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="appointments" className="mt-0">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-medium">Appointment History</h3>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleScheduleAppointment}>
                        <Calendar className="mr-2 h-4 w-4" />
                        New Appointment
                      </Button>
                    </div>
                    
                    <div className="space-y-5">
                      {client?.appointmentHistory?.map((appointment, index) => (
                        <div key={index} className="flex items-start border-b pb-5 last:border-0">
                          <div className={`p-2.5 rounded-full mr-4 ${
                            appointment.status === 'completed' ? 'bg-blue-100 dark:bg-blue-900/30' : 
                            appointment.status === 'upcoming' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                          }`}>
                            <Calendar className={`h-5 w-5 ${
                              appointment.status === 'completed' ? 'text-blue-600 dark:text-blue-400' : 
                              appointment.status === 'upcoming' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-base">{appointment.title}</div>
                            <div className="text-sm text-slate-500 mt-0.5">
                              {new Date(appointment.date).toLocaleDateString()} at {new Date(appointment.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                            <div className="text-xs mt-2">
                              <Badge variant="outline" className={`${
                                appointment.status === 'completed' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' : 
                                appointment.status === 'upcoming' ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300' : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300'
                              }`}>
                                {appointment.status}
                              </Badge>
                            </div>
                          </div>
                          <div>
                            <Button variant="ghost" size="sm">
                              <ClipboardList className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notes" className="mt-0">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-medium">Client Notes</h3>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Add Note</Button>
                    </div>
                    
                    <div className="space-y-4">
                      {client?.notes?.map((note, index) => (
                        <Card key={index} className="shadow-sm border-slate-200 dark:border-navy-700">
                          <CardContent className="p-5">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="text-slate-800 dark:text-slate-200">{note}</p>
                                <div className="text-xs text-slate-500 mt-3">
                                  Added on {new Date().toLocaleDateString()}
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="analytics" className="mt-0">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-medium">Client Analytics</h3>
                      <div>
                        <Button variant="outline" size="sm">
                          <BarChart className="mr-2 h-4 w-4" />
                          Generate Report
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-5 mb-8">
                      <Card className="shadow-sm border-slate-200 dark:border-navy-700">
                        <CardContent className="p-5">
                          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Engagement Score</div>
                          <div className="text-2xl font-semibold">78%</div>
                          <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 12% from last month</div>
                        </CardContent>
                      </Card>
                      <Card className="shadow-sm border-slate-200 dark:border-navy-700">
                        <CardContent className="p-5">
                          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Response Rate</div>
                          <div className="text-2xl font-semibold">92%</div>
                          <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 5% from last month</div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-navy-800/50 p-8 rounded-lg text-center">
                      <BarChart className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                      <h4 className="text-lg font-medium mb-3">Client Analytics Dashboard</h4>
                      <p className="text-slate-600 dark:text-slate-400 mb-5 max-w-xl mx-auto">
                        Detailed analytics dashboard coming soon! Track client engagement, 
                        appointment history, and communication patterns.
                      </p>
                      <Button variant="outline">Request Early Access</Button>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AppLayout>
    </AuthGuard>
  );
};

export default ClientDetail;
