
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Video, Search, Clock, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';

interface Client {
  id: string;
  name: string;
  profilePicture?: string;
  lastInteraction: string;
  matchScore: number;
  tags: string[];
}

const ClientList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock client data (in a real app, this would come from your database)
  const clients: Client[] = [
    {
      id: 'client-1',
      name: 'John Smith',
      profilePicture: undefined,
      lastInteraction: '2 days ago',
      matchScore: 95,
      tags: ['Retirement', 'Investment']
    },
    {
      id: 'client-2',
      name: 'Sarah Johnson',
      profilePicture: undefined,
      lastInteraction: '5 hours ago',
      matchScore: 87,
      tags: ['Financial Planning', 'Tax Planning']
    },
    {
      id: 'client-3',
      name: 'Michael Davis',
      profilePicture: undefined,
      lastInteraction: '1 week ago',
      matchScore: 82,
      tags: ['Estate Planning', 'Retirement']
    },
    {
      id: 'client-4',
      name: 'Emily Wilson',
      profilePicture: undefined,
      lastInteraction: 'Just now',
      matchScore: 78,
      tags: ['Investment', 'Budget Planning']
    },
    {
      id: 'client-5',
      name: 'Robert Chen',
      profilePicture: undefined,
      lastInteraction: '3 days ago',
      matchScore: 92,
      tags: ['Retirement', 'Insurance']
    }
  ];
  
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Your Clients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search clients..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="space-y-3">
          {filteredClients.map((client) => (
            <div 
              key={client.id} 
              className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors"
            >
              <div className="flex items-center">
                {client.profilePicture ? (
                  <img 
                    src={client.profilePicture} 
                    alt={client.name} 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                ) : (
                  <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-3">
                    {client.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-medium text-navy-900 dark:text-white">{client.name}</h4>
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{client.lastInteraction}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Link to={`/call/${client.id}`}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Phone className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to={`/call/${client.id}`}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Video className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to={`/client/${client.id}`}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
          
          {filteredClients.length === 0 && (
            <div className="text-center py-6">
              <p className="text-slate-500 dark:text-slate-400">No clients found</p>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-center">
          <Link to="/leads">
            <Button variant="link" className="text-sm">
              View all clients and leads
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientList;
