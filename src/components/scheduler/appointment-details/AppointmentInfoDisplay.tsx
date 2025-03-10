
import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Appointment } from '../../../context/UserContext';
import { useUser } from '../../../context/UserContext';

interface AppointmentInfoDisplayProps {
  appointment: Appointment;
}

const AppointmentInfoDisplay: React.FC<AppointmentInfoDisplayProps> = ({ appointment }) => {
  const { userType, consumerProfile, advisorProfile } = useUser();

  // Find consumer and advisor names
  const getConsumerName = () => {
    if (consumerProfile && consumerProfile.id === appointment.consumerId) {
      return consumerProfile.name;
    }
    return "Consumer";
  };

  const getAdvisorName = () => {
    if (advisorProfile && advisorProfile.id === appointment.advisorId) {
      return advisorProfile.name;
    }
    return "Advisor";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="bg-slate-100 p-2 rounded-full">
          <Calendar className="h-5 w-5 text-navy-700" />
        </div>
        <div>
          <h4 className="font-medium">Date</h4>
          <p className="text-sm text-slate-600">
            {format(new Date(appointment.date), 'MMMM d, yyyy')}
          </p>
        </div>
      </div>
      
      <div className="flex items-start gap-3">
        <div className="bg-slate-100 p-2 rounded-full">
          <Clock className="h-5 w-5 text-navy-700" />
        </div>
        <div>
          <h4 className="font-medium">Time</h4>
          <p className="text-sm text-slate-600">
            {format(new Date(`${appointment.date}T${appointment.startTime}`), 'h:mm a')} - 
            {format(new Date(`${appointment.date}T${appointment.endTime}`), 'h:mm a')}
          </p>
        </div>
      </div>
      
      <div className="flex items-start gap-3">
        <div className="bg-slate-100 p-2 rounded-full">
          <User className="h-5 w-5 text-navy-700" />
        </div>
        <div>
          <h4 className="font-medium">
            {userType === 'advisor' ? 'Client' : 'Advisor'}
          </h4>
          <p className="text-sm text-slate-600">
            {userType === 'advisor' ? getConsumerName() : getAdvisorName()}
          </p>
        </div>
      </div>
      
      {appointment.location && (
        <div className="flex items-start gap-3">
          <div className="bg-slate-100 p-2 rounded-full">
            <MapPin className="h-5 w-5 text-navy-700" />
          </div>
          <div>
            <h4 className="font-medium">Location</h4>
            <p className="text-sm text-slate-600">
              {appointment.location}
            </p>
          </div>
        </div>
      )}
      
      {appointment.notes && (
        <div className="mt-4 p-3 bg-slate-50 rounded-md">
          <h4 className="font-medium mb-1">Notes</h4>
          <p className="text-sm text-slate-600">{appointment.notes}</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentInfoDisplay;
