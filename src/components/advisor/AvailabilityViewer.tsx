
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { TimeSlot, Chat, useUser, Appointment } from '../../context/UserContext';
import { format, addDays, startOfWeek } from 'date-fns';
import { toast } from "@/hooks/use-toast";
import DaySelector from './availability/DaySelector';
import DailyAvailability from './availability/DailyAvailability';
import ActionButtons from './availability/ActionButtons';
import { formatTime, convertTo24Hour } from './availability/timeUtils';

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
  const { consumerProfile, userType, chats, setChats, addAppointment } = useUser();
  const navigate = useNavigate();

  if (!availability || availability.length === 0) {
    return (
      <div className="p-4 bg-slate-50 rounded-lg text-center">
        <p className="text-slate-600">
          {advisorName} hasn't set their availability schedule yet.
        </p>
      </div>
    );
  }

  const availabilityByDay = availability.reduce((acc, slot) => {
    if (!acc[slot.day]) {
      acc[slot.day] = [];
    }
    acc[slot.day].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(startOfCurrentWeek, index);
    return {
      date,
      dayName: format(date, 'EEEE').toLowerCase() as TimeSlot['day'],
      formattedDate: format(date, 'MMM d')
    };
  });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (timeDisplay: string) => {
    setSelectedSlot(timeDisplay);
  };

  const handleBooking = () => {
    if (!selectedSlot || !consumerProfile) {
      toast("Please select a time slot", {
        description: "You need to select a time slot and be logged in to book a meeting"
      });
      return;
    }

    const [startTimeStr, endTimeStr] = selectedSlot.split(' - ');
    
    const startTime = convertTo24Hour(startTimeStr);
    const endTime = convertTo24Hour(endTimeStr);

    const scheduledStart = new Date(selectedDate);
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    scheduledStart.setHours(startHours, startMinutes, 0);

    const scheduledEnd = new Date(selectedDate);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    scheduledEnd.setHours(endHours, endMinutes, 0);
    
    const newAppointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'> = {
      advisorId: advisorId,
      consumerId: consumerProfile.id,
      category: 'cat-free_consultation',
      title: `Consultation with ${advisorName}`,
      scheduledStart: scheduledStart.toISOString(),
      scheduledEnd: scheduledEnd.toISOString(),
      status: 'pending',
      notes: '',
      location: 'video',
      date: selectedDate.toISOString(),
      startTime,
      endTime
    };
    
    addAppointment(newAppointment);
    
    toast("Booking Request Sent", {
      description: `Your booking request with ${advisorName} has been sent for ${format(selectedDate, 'EEEE, MMMM d')} at ${selectedSlot}.`
    });

    navigate('/schedule');
  };

  const handleStartChat = () => {
    if (!consumerProfile) {
      toast("Please complete your profile", {
        description: "You need to complete your profile to chat with advisors"
      });
      return;
    }

    const existingChat = chats.find(chat => 
      chat.participants.includes(consumerProfile.id) && 
      chat.participants.includes(advisorId)
    );

    if (existingChat) {
      navigate(`/chat/${existingChat.id}`);
      return;
    }

    const timestamp = new Date().toISOString();
    
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      participants: [consumerProfile.id, advisorId],
      messages: [],
      updatedAt: timestamp,
      lastUpdated: timestamp,
      participantData: {},
      createdAt: timestamp
    };
    
    setChats([...chats, newChat]);
    
    navigate(`/chat/${newChat.id}`);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-navy-800 flex items-center">
        <Calendar className="mr-2 h-5 w-5" />
        Availability Schedule
      </h3>

      <DaySelector 
        weekDays={weekDays} 
        selectedDate={selectedDate} 
        onDateSelect={handleDateSelect} 
      />

      <DailyAvailability 
        selectedDate={selectedDate}
        availabilityByDay={availabilityByDay}
        selectedSlot={selectedSlot}
        formatTime={formatTime}
        onSlotSelect={handleSlotSelect}
      />

      <ActionButtons 
        advisorName={advisorName}
        selectedSlot={selectedSlot}
        onChatClick={handleStartChat}
        onBookingClick={handleBooking}
      />
    </div>
  );
};

export default AvailabilityViewer;
