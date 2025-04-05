import React, { useState } from 'react';
import { 
  Clock, 
  Plus, 
  Trash2, 
  Calendar 
} from 'lucide-react';
import { TimeSlot } from '../../context/UserContext';
import { toast } from "@/hooks/use-toast";

interface AvailabilitySchedulerProps {
  availability: TimeSlot[];
  onChange: (availability: TimeSlot[]) => void;
}

const days = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
] as const;

const timeOptions = Array.from({ length: 24 * 4 }).map((_, i) => {
  const hour = Math.floor(i / 4);
  const minute = (i % 4) * 15;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
});

const AvailabilityScheduler: React.FC<AvailabilitySchedulerProps> = ({ 
  availability, 
  onChange 
}) => {
  const [newSlot, setNewSlot] = useState<Partial<TimeSlot>>({
    day: 'monday',
    startTime: '09:00',
    endTime: '10:00',
    isAvailable: true
  });

  const handleNewSlotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSlot(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTimeSlot = () => {
    // Validate the time slot
    if (!newSlot.day || !newSlot.startTime || !newSlot.endTime) {
      toast("Missing information", {
        description: "Please select day, start time and end time"
      });
      return;
    }

    // Check if end time is after start time
    if (newSlot.startTime >= newSlot.endTime) {
      toast("Invalid time range", {
        description: "End time must be after start time"
      });
      return;
    }

    // Check for overlapping time slots on the same day
    const hasOverlap = availability.some(slot => 
      slot.day === newSlot.day &&
      ((newSlot.startTime! <= slot.endTime && newSlot.endTime! >= slot.startTime))
    );

    if (hasOverlap) {
      toast("Time slot overlap", {
        description: "This time slot overlaps with an existing one"
      });
      return;
    }

    const timeSlot = newSlot as TimeSlot;
    onChange([...availability, timeSlot]);

    // Reset form for next entry but keep the day selected
    setNewSlot({
      day: newSlot.day,
      startTime: newSlot.endTime,
      endTime: (parseInt(newSlot.endTime!.split(':')[0]) + 1).toString().padStart(2, '0') + ':' + newSlot.endTime!.split(':')[1],
      isAvailable: true
    });
  };

  const removeTimeSlot = (index: number) => {
    const newAvailability = [...availability];
    newAvailability.splice(index, 1);
    onChange(newAvailability);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12;
    return `${adjustedHour}:${minutes} ${period}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-medium text-navy-800">
          <Calendar className="inline mr-2 h-5 w-5" />
          Weekly Availability Schedule
        </h3>

        {/* Display current availability slots */}
        {availability.length > 0 ? (
          <div className="space-y-2">
            {availability.map((slot, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 bg-sky-50 rounded-lg border border-sky-100"
              >
                <div>
                  <span className="font-medium capitalize">{slot.day}</span>
                  <span className="mx-2">•</span>
                  <span>{formatTime(slot.startTime)} - {formatTime(slot.endTime)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeTimeSlot(index)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                  aria-label="Remove time slot"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-4 bg-slate-50 rounded-lg text-slate-500">
            No availability slots added yet. Add your first available time slot below.
          </div>
        )}

        {/* Form to add new availability slot */}
        <div className="mt-4 p-4 border border-dashed border-teal-200 rounded-lg bg-teal-50">
          <div className="font-medium text-teal-700 mb-3 flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Add New Availability Slot
          </div>
          
          <div className="grid gap-3 sm:grid-cols-4">
            <div>
              <label htmlFor="day" className="block text-sm font-medium text-navy-700 mb-1">
                Day
              </label>
              <select
                id="day"
                name="day"
                value={newSlot.day}
                onChange={handleNewSlotChange}
                className="input-field w-full"
              >
                {days.map(day => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-navy-700 mb-1">
                Start Time
              </label>
              <select
                id="startTime"
                name="startTime"
                value={newSlot.startTime}
                onChange={handleNewSlotChange}
                className="input-field w-full"
              >
                {timeOptions.map(time => (
                  <option key={`start-${time}`} value={time}>
                    {formatTime(time)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-navy-700 mb-1">
                End Time
              </label>
              <select
                id="endTime"
                name="endTime"
                value={newSlot.endTime}
                onChange={handleNewSlotChange}
                className="input-field w-full"
              >
                {timeOptions.map(time => (
                  <option key={`end-${time}`} value={time}>
                    {formatTime(time)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={addTimeSlot}
                className="btn-primary w-full flex items-center justify-center"
              >
                <Plus className="mr-1 w-4 h-4" />
                Add Slot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityScheduler;
