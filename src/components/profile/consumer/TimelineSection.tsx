
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProfileFormValues } from '@/hooks/useConsumerProfileForm';
import { timelineOptions } from '@/constants/profileOptions';

interface TimelineSectionProps {
  formData: ProfileFormValues;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({
  formData
}) => {
  return (
    <div>
      <Label htmlFor="startTimeline">Start Timeline</Label>
      <Select value={formData.startTimeline} onValueChange={(value) => {
        document.dispatchEvent(new CustomEvent('form-update', { 
          detail: { name: 'startTimeline', value } 
        }));
      }}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select timeline" />
        </SelectTrigger>
        <SelectContent>
          {timelineOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimelineSection;
