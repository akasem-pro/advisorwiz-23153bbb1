
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { serviceOptions } from '@/constants/profileOptions';
import { ServiceCategory } from '../../../context/UserContext';

interface ServiceNeedsSectionProps {
  selectedServices: ServiceCategory[];
  handleCheckboxChange: (option: string, isChecked: boolean) => void;
}

const ServiceNeedsSection: React.FC<ServiceNeedsSectionProps> = ({
  selectedServices,
  handleCheckboxChange
}) => {
  return (
    <div>
      <Label>Service Needs</Label>
      <div className="flex flex-wrap gap-2 mt-2">
        {serviceOptions.map(option => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={`service-${option.value}`}
              checked={selectedServices.some(service => service === option.value)}
              onCheckedChange={(checked) => handleCheckboxChange(option.value, !!checked)}
            />
            <Label htmlFor={`service-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceNeedsSection;
