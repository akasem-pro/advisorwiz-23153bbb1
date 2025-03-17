
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { communicationOptions } from '@/constants/profileOptions';

interface CommunicationSectionProps {
  selectedCommunication: string[];
  handleCheckboxChange: (option: string, isChecked: boolean) => void;
}

const CommunicationSection: React.FC<CommunicationSectionProps> = ({
  selectedCommunication,
  handleCheckboxChange
}) => {
  return (
    <div>
      <Label>Preferred Communication</Label>
      <div className="flex flex-wrap gap-2 mt-2">
        {communicationOptions.map(option => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={`communication-${option.value}`}
              checked={selectedCommunication.includes(option.value)}
              onCheckedChange={(checked) => handleCheckboxChange(option.value, !!checked)}
            />
            <Label htmlFor={`communication-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunicationSection;
