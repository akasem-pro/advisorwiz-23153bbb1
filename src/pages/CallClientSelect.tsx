
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search, User, Phone, Video } from 'lucide-react';
import AuthGuard from '../components/auth/AuthGuard';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';

interface ClientData {
  id: string;
  name: string;
  profilePicture?: string;
  email: string;
  phone?: string;
  lastContact?: string;
  tags: string[];
}

const CallClientSelect: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Mock client data (in a real app, this would be fetched from your database)
  const clients: ClientData[] = [
    {
      id: 'client-1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '(555) 123-4567',
      lastContact: '2 days ago',
      tags: ['Retirement', 'Investment']
    },
    {
      id: 'client-2',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '(555) 234-5678',
      lastContact: '5 hours ago',
      tags: ['Financial Planning', 'Tax Planning']
    },
    {
      id: 'client-3',
      name: 'Michael Davis',
      email: 'michael.d@example.com',
      phone: '(555) 345-6789',
      lastContact: '1 week ago',
      tags: ['Estate Planning', 'Retirement']
    },
    {
      id: 'client-4',
      name: 'Emily Wilson',
      email: 'emily.w@example.com',
      phone: '(555) 456-7890',
      lastContact: 'Just now',
      tags: ['Investment', 'Budget Planning']
    },
    {
      id: 'client-5',
      name: 'Robert Chen',
      email: 'robert.c@example.com',
      phone: '(555) 567-8901',
      lastContact: '3 days ago',
      tags: ['Retirement', 'Insurance']
    }
  ];
  
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleClientSelect = (clientId: string) => {
    navigate(`/call/${clientId}`);
  };
  
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/advisor-dashboard" },
    { name: "Call Client", url: "/call/select" }
  ];
  
  return (
    <AuthGuard>
      <AppLayout>
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <BreadcrumbNav items={breadcrumbs} />
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-navy-900 dark:text-white mb-2">Call a Client</h1>
            <p className="text-slate-600 dark:text-slate-400">
              Select a client to start a call via phone, video, or external meeting link.
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle>Find a Client</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by name, email, or tag..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredClients.map((client) => (
              <Card key={client.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="flex-shrink-0">
                      {client.profilePicture ? (
                        <img 
                          src={client.profilePicture} 
                          alt={client.name} 
                          className="w-12 h-12 rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-navy-900 dark:text-white truncate">
                        {client.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                        {client.email}
                      </p>
                      {client.phone && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          {client.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {client.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button
                      className="flex-1"
                      onClick={() => handleClientSelect(client.id)}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleClientSelect(client.id)}
                    >
                      <Video className="mr-2 h-4 w-4" />
                      Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredClients.length === 0 && (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <User className="h-12 w-12 mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl font-medium text-slate-700 dark:text-slate-200 mb-2">
                No clients found
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Try adjusting your search or view all leads to find more clients.
              </p>
              <Link to="/leads">
                <Button>View All Leads</Button>
              </Link>
            </div>
          )}
        </div>
      </AppLayout>
    </AuthGuard>
  );
};

export default CallClientSelect;
