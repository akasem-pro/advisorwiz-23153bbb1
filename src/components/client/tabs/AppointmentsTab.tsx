
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ClipboardList } from 'lucide-react';
import { ClientData } from '@/types/clientTypes';

interface AppointmentsTabProps {
  client: ClientData;
  onScheduleAppointment: () => void;
}

const AppointmentsTab: React.FC<AppointmentsTabProps> = ({ client, onScheduleAppointment }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Appointment History</h3>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={onScheduleAppointment}>
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
    </>
  );
};

export default AppointmentsTab;
