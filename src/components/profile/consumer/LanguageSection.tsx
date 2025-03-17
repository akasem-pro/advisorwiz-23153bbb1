
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { languageOptions } from '@/constants/profileOptions';

interface LanguageSectionProps {
  selectedLanguages: string[];
  handleCheckboxChange: (option: string, isChecked: boolean) => void;
}

const LanguageSection: React.FC<LanguageSectionProps> = ({
  selectedLanguages,
  handleCheckboxChange
}) => {
  return (
    <div>
      <Label>Preferred Language</Label>
      <div className="flex flex-wrap gap-2 mt-2">
        {languageOptions.map(option => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={`language-${option.value}`}
              checked={selectedLanguages.includes(option.value)}
              onCheckedChange={(checked) => handleCheckboxChange(option.value, !!checked)}
            />
            <Label htmlFor={`language-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSection;
