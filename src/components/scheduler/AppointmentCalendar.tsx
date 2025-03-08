
import React, { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  parseISO,
  getDay,
  addDays,
  startOfWeek
} from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  CheckSquare
} from 'lucide-react';
import { Appointment, AppointmentStatus, useUser } from '../../context/UserContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AppointmentCalendarProps {
  appointments: Appointment[];
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({
  appointments,
  currentDate,
  onPrevMonth,
  onNextMonth
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const { advisorProfile, consumerProfile } = useUser();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  function endOfWeek(date: Date) {
    const day = getDay(date);
    return addDays(date, 6 - (day === 0 ? 6 : day - 1));
  }

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const getAppointmentsForDay = (date: Date) => {
    return appointments.filter(appointment => 
      isSameDay(parseISO(appointment.date), date)
    );
  };

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getStatusIcon = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'completed':
        return <CheckSquare className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-slate-500" />;
    }
  };

  const handleSelectAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentDetails(true);
  };

  const formatAppointmentTime = (start: string, end: string) => {
    const formatTime = (time: string) => {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const period = hour >= 12 ? 'PM' : 'AM';
      const adjustedHour = hour % 12 || 12;
      return `${adjustedHour}:${minutes} ${period}`;
    };

    return `${formatTime(start)} - ${formatTime(end)}`;
  };

  // Get the name of the other party in the appointment
  const getOtherPartyName = (appointment: Appointment) => {
    if (consumerProfile && appointment.consumerId === consumerProfile.id) {
      // User is the consumer, show advisor name
      return "Your advisor"; // In a real app, you'd fetch the advisor's name
    } else if (advisorProfile && appointment.advisorId === advisorProfile.id) {
      // User is the advisor, show consumer name
      return "Client"; // In a real app, you'd fetch the consumer's name
    }
    return "Unknown";
  };

  const getCategoryLabel = (appointment: Appointment) => {
    if (advisorProfile) {
      const category = advisorProfile.appointmentCategories.find(
        cat => cat.id === appointment.categoryId
      );
      return category ? category.label : 'Appointment';
    }
    return 'Appointment';
  };
  
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-serif font-semibold">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={onPrevMonth}
            className="p-2 rounded-full hover:bg-slate-100"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={onNextMonth}
            className="p-2 rounded-full hover:bg-slate-100"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 border-b pb-2 mb-2">
        {weekdays.map((day) => (
          <div key={day} className="text-center font-medium text-sm text-navy-700">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, i) => {
          const dayAppointments = getAppointmentsForDay(day);
          const isCurrentMonth = isSameMonth(day, monthStart);
          
          return (
            <div
              key={i}
              className={cn(
                "min-h-[80px] p-1 border rounded-md",
                isCurrentMonth ? "bg-white" : "bg-slate-50",
                isSameDay(day, new Date()) && "border-teal-500 border-2",
                !isCurrentMonth && "text-slate-400",
                dayAppointments.length > 0 && "cursor-pointer hover:bg-slate-50"
              )}
              onClick={() => handleDateClick(day)}
            >
              <div className="text-right font-medium p-1">
                {format(day, 'd')}
              </div>
              
              <div className="space-y-1">
                {dayAppointments.slice(0, 2).map((appointment) => (
                  <div 
                    key={appointment.id}
                    className={cn(
                      "flex items-center text-xs p-1 rounded truncate",
                      appointment.status === 'confirmed' && "bg-green-100",
                      appointment.status === 'pending' && "bg-amber-100",
                      appointment.status === 'cancelled' && "bg-red-100",
                      appointment.status === 'completed' && "bg-blue-100"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectAppointment(appointment);
                    }}
                  >
                    {getStatusIcon(appointment.status)}
                    <span className="ml-1 truncate">{appointment.title}</span>
                  </div>
                ))}
                
                {dayAppointments.length > 2 && (
                  <div className="text-xs text-right text-slate-500">
                    +{dayAppointments.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dialog to show appointments for a specific day */}
      {selectedDate && (
        <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Appointments for {format(selectedDate, 'MMMM d, yyyy')}</DialogTitle>
              <DialogDescription>
                {getAppointmentsForDay(selectedDate).length > 0 
                  ? 'Click on an appointment for more details' 
                  : 'No appointments scheduled for this day'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-3 mt-2">
              {getAppointmentsForDay(selectedDate).map((appointment) => (
                <div 
                  key={appointment.id}
                  className={cn(
                    "p-3 rounded-lg border cursor-pointer hover:bg-slate-50",
                    appointment.status === 'confirmed' && "border-green-200",
                    appointment.status === 'pending' && "border-amber-200",
                    appointment.status === 'cancelled' && "border-red-200",
                    appointment.status === 'completed' && "border-blue-200"
                  )}
                  onClick={() => handleSelectAppointment(appointment)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{appointment.title}</h3>
                    <Badge 
                      variant="outline"
                      className={cn(
                        appointment.status === 'confirmed' && "bg-green-100 text-green-800",
                        appointment.status === 'pending' && "bg-amber-100 text-amber-800",
                        appointment.status === 'cancelled' && "bg-red-100 text-red-800",
                        appointment.status === 'completed' && "bg-blue-100 text-blue-800"
                      )}
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-500 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatAppointmentTime(appointment.startTime, appointment.endTime)}
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog to show appointment details */}
      {selectedAppointment && (
        <Dialog open={showAppointmentDetails} onOpenChange={setShowAppointmentDetails}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedAppointment.title}</DialogTitle>
              <DialogDescription>
                {format(parseISO(selectedAppointment.date), 'EEEE, MMMM d, yyyy')}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-2">
                <div className="text-sm font-medium text-slate-500">Category:</div>
                <div>{getCategoryLabel(selectedAppointment)}</div>
                
                <div className="text-sm font-medium text-slate-500">With:</div>
                <div>{getOtherPartyName(selectedAppointment)}</div>
                
                <div className="text-sm font-medium text-slate-500">Time:</div>
                <div>{formatAppointmentTime(selectedAppointment.startTime, selectedAppointment.endTime)}</div>
                
                <div className="text-sm font-medium text-slate-500">Status:</div>
                <div className="flex items-center">
                  {getStatusIcon(selectedAppointment.status)}
                  <span className="ml-1 capitalize">{selectedAppointment.status}</span>
                </div>
                
                {selectedAppointment.location && (
                  <>
                    <div className="text-sm font-medium text-slate-500">Location:</div>
                    <div>{selectedAppointment.location}</div>
                  </>
                )}
                
                {selectedAppointment.notes && (
                  <>
                    <div className="text-sm font-medium text-slate-500">Notes:</div>
                    <div className="text-sm">{selectedAppointment.notes}</div>
                  </>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AppointmentCalendar;
