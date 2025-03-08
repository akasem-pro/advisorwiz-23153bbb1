
import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { TimeSlot } from '../../context/UserContext';
import { format, addDays, startOfWeek } from 'date-fns';
import { toast } from "@/hooks/use-toast";

interface AvailabilityViewerProps {
  availability: TimeSlot[];
  advisorName: string;
  advisorId: string;
}

const AvailabilityViewer: React.FC<AvailabilityViewerProps> = ({ 
  availability, 
  advisorName,
  advisorId
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  if (!availability || availability.length === 0) {
    return (
      <div className="p-4 bg-slate-50 rounded-lg text-center">
        <p className="text-slate-600">
          {advisorName} hasn't set their availability schedule yet.
        </p>
      </div>
    );
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12;
    return `${adjustedHour}:${minutes} ${period}`;
  };

  // Group availability by day
  const availabilityByDay = availability.reduce((acc, slot) => {
    if (!acc[slot.day]) {
      acc[slot.day] = [];
    }
    acc[slot.day].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  // Get the current week's dates
  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(startOfCurrentWeek, index);
    return {
      date,
      dayName: format(date, 'EEEE').toLowerCase() as TimeSlot['day'],
      formattedDate: format(date, 'MMM d')
    };
  });

  const handleBooking = () => {
    if (!selectedSlot) {
      toast({
        title: "Please select a time slot",
        description: "You need to select a time slot to book a meeting",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send a booking request to the backend
    toast({
      title: "Booking Request Sent",
      description: `Your booking request with ${advisorName} has been sent for ${format(selectedDate, 'EEEE, MMMM d')} at ${selectedSlot}.`,
    });

    // Reset selection
    setSelectedSlot(null);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-navy-800 flex items-center">
        <Calendar className="mr-2 h-5 w-5" />
        Availability Schedule
      </h3>

      <div className="grid grid-cols-7 gap-1 text-center mb-4">
        {weekDays.map(day => (
          <div 
            key={day.dayName}
            className={`p-2 cursor-pointer rounded ${
              format(selectedDate, 'EEEE').toLowerCase() === day.dayName 
                ? 'bg-teal-100 text-teal-800 font-medium'
                : 'hover:bg-slate-50'
            }`}
            onClick={() => {
              setSelectedDate(day.date);
              setSelectedSlot(null);
            }}
          >
            <div className="text-xs uppercase text-slate-500">{day.dayName.slice(0, 3)}</div>
            <div className="font-medium">{day.formattedDate}</div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-slate-50 rounded-lg">
        <h4 className="font-medium mb-3">
          {format(selectedDate, 'EEEE, MMMM d')}
        </h4>

        {availabilityByDay[format(selectedDate, 'EEEE').toLowerCase() as TimeSlot['day']] ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {availabilityByDay[format(selectedDate, 'EEEE').toLowerCase() as TimeSlot['day']]
              .map((slot, index) => {
                const timeDisplay = `${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`;
                return (
                  <div
                    key={index}
                    className={`p-2 text-center rounded-md cursor-pointer border transition-colors ${
                      selectedSlot === timeDisplay
                        ? 'bg-teal-100 border-teal-300 text-teal-800'
                        : 'border-slate-200 hover:border-teal-200 hover:bg-teal-50'
                    }`}
                    onClick={() => setSelectedSlot(timeDisplay)}
                  >
                    <div className="flex items-center justify-center">
                      <Clock className="mr-1 w-4 h-4" />
                      <span>{timeDisplay}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-4">
            No availability on this day.
          </p>
        )}
      </div>

      {selectedSlot && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleBooking}
            className="btn-primary inline-flex items-center"
          >
            Book Consultation
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AvailabilityViewer;
