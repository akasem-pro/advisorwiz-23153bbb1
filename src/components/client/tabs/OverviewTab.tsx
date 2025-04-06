
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { ClientData } from '@/types/clientTypes';

interface OverviewTabProps {
  client: ClientData;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ client }) => {
  return (
    <>
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
    </>
  );
};

export default OverviewTab;
