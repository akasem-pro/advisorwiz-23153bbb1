
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProfileFormValues } from '@/hooks/useConsumerProfileForm';
import { riskToleranceOptions } from '@/constants/profileOptions';

interface RiskToleranceSectionProps {
  formData: ProfileFormValues;
}

const RiskToleranceSection: React.FC<RiskToleranceSectionProps> = ({
  formData
}) => {
  return (
    <div>
      <Label htmlFor="riskTolerance">Risk Tolerance</Label>
      <Select value={formData.riskTolerance} onValueChange={(value) => {
        document.dispatchEvent(new CustomEvent('form-update', { 
          detail: { name: 'riskTolerance', value } 
        }));
      }}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select risk tolerance" />
        </SelectTrigger>
        <SelectContent>
          {riskToleranceOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RiskToleranceSection;
