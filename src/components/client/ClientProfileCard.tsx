
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Clock, Tag, Calendar, Video } from 'lucide-react';
import { ClientData } from '@/types/clientTypes';

interface ClientProfileCardProps {
  client: ClientData;
  onScheduleAppointment: () => void;
}

const ClientProfileCard: React.FC<ClientProfileCardProps> = ({ client, onScheduleAppointment }) => {
  return (
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
            <Button className="w-full col-span-2 bg-blue-600 hover:bg-blue-700" onClick={onScheduleAppointment}>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientProfileCard;
