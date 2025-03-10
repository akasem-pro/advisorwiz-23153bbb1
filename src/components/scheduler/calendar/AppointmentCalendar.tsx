
import React, { useState } from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  startOfWeek,
  parseISO,
  format
} from 'date-fns';
import { Appointment, useUser } from '../../../context/UserContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import CalendarHeader from './CalendarHeader';
import WeekdayLabels from './WeekdayLabels';
import DayCell from './DayCell';
import DailyAppointmentsDialog from './DailyAppointmentsDialog';
import { 
  formatAppointmentTime, 
  getAppointmentsForDay, 
  endOfWeek, 
  getOtherPartyName, 
  getCategoryLabel 
} from './calendarUtils';
import AppointmentDetails from '../AppointmentDetails';

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

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSelectAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentDetails(true);
  };

  return (
    <div className="space-y-4">
      <CalendarHeader 
        currentDate={currentDate}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
      />

      <WeekdayLabels />

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, i) => {
          const dayAppointments = getAppointmentsForDay(appointments, day);
          
          return (
            <DayCell 
              key={i}
              day={day}
              appointments={dayAppointments}
              monthStart={monthStart}
              onDateClick={handleDateClick}
              onAppointmentClick={handleSelectAppointment}
            />
          );
        })}
      </div>

      {/* Dialog to show appointments for a specific day */}
      <DailyAppointmentsDialog 
        date={selectedDate}
        appointments={selectedDate ? getAppointmentsForDay(appointments, selectedDate) : []}
        onOpenChange={() => setSelectedDate(null)}
        onAppointmentClick={handleSelectAppointment}
        formatAppointmentTime={formatAppointmentTime}
      />

      {/* Dialog to show appointment details */}
      {selectedAppointment && (
        <AppointmentDetails
          appointment={selectedAppointment}
          open={showAppointmentDetails}
          onOpenChange={setShowAppointmentDetails}
        />
      )}
    </div>
  );
};

export default AppointmentCalendar;
