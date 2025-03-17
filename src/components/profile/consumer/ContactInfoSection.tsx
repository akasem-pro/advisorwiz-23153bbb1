
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ProfileFormValues } from '@/hooks/useConsumerProfileForm';

interface ContactInfoSectionProps {
  formData: ProfileFormValues;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({
  formData,
  handleInputChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="age">Age</Label>
        <Input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default ContactInfoSection;
