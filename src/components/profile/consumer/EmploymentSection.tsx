
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProfileFormValues } from '@/hooks/useConsumerProfileForm';
import { employmentStatusOptions } from '@/constants/profileOptions';

interface EmploymentSectionProps {
  formData: ProfileFormValues;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const EmploymentSection: React.FC<EmploymentSectionProps> = ({
  formData,
  handleInputChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="employmentStatus">Employment Status</Label>
        <Select value={formData.employmentStatus} onValueChange={(value) => {
          handleInputChange({
            target: { name: 'employmentStatus', value }
          } as React.ChangeEvent<HTMLSelectElement>);
        }}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {employmentStatusOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="investableAssets">Investable Assets</Label>
        <Input
          type="text"
          id="investableAssets"
          name="investableAssets"
          value={formData.investableAssets}
          onChange={handleInputChange}
          placeholder="e.g., 500,000"
        />
      </div>
    </div>
  );
};

export default EmploymentSection;
