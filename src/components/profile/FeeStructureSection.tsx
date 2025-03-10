
import React from 'react';
import { Input } from '../ui/input';
import { ProfileSection } from './ProfileSection';
import { ExtendedAdvisorProfileForm, Section } from '../../types/advisorTypes';

interface FeeStructureSectionProps {
  section: Section;
  formData: ExtendedAdvisorProfileForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  toggleSection: (id: string) => void;
  feeStructureOptions: Array<{ 
    value: string; 
    label: string;
    fieldType: string;
    placeholder: string;
  }>;
  minimumInvestmentOptions: Array<{ 
    value: string; 
    label: string;
    range: string;
  }>;
  clientTypeOptions: Array<{ value: string; label: string }>;
  meetingMethodOptions: Array<{ value: string; label: string }>;
  handleMultiSelectChange: (fieldName: string, selectedValue: string) => void;
}

export const FeeStructureSection: React.FC<FeeStructureSectionProps> = ({
  section,
  formData,
  handleChange,
  toggleSection,
  feeStructureOptions,
  minimumInvestmentOptions,
  clientTypeOptions,
  meetingMethodOptions,
  handleMultiSelectChange
}) => {
  return (
    <ProfileSection section={section} toggleSection={toggleSection}>
      <div className="p-4 border-t border-slate-200 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="feeStructure" className="block text-sm font-medium text-navy-800 mb-1">
              Fee Structure
            </label>
            <select
              id="feeStructure"
              name="feeStructure"
              value={formData.feeStructure}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select fee structure</option>
              {feeStructureOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="feeAmount" className="block text-sm font-medium text-navy-800 mb-1">
              Fee Amount
            </label>
            <Input
              type="text"
              id="feeAmount"
              name="feeAmount"
              value={formData.feeAmount}
              onChange={handleChange}
              placeholder={feeStructureOptions.find(o => o.value === formData.feeStructure)?.placeholder || "Enter fee amount"}
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="minimumInvestmentCategory" className="block text-sm font-medium text-navy-800 mb-1">
              Minimum Investment Category
            </label>
            <select
              id="minimumInvestmentCategory"
              name="minimumInvestmentCategory"
              value={formData.minimumInvestmentCategory}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select minimum investment category</option>
              {minimumInvestmentOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.range})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="minimumInvestment" className="block text-sm font-medium text-navy-800 mb-1">
              Minimum Investment
            </label>
            <Input
              type="text"
              id="minimumInvestment"
              name="minimumInvestment"
              value={formData.minimumInvestment || ''}
              onChange={handleChange}
              placeholder="Enter minimum investment"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="preferredClientTypes" className="block text-sm font-medium text-navy-800 mb-1">
              Preferred Client Types
            </label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {clientTypeOptions.map(option => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`client-${option.value}`}
                    checked={formData.preferredClientTypes?.includes(option.value) || false}
                    onChange={() => handleMultiSelectChange('preferredClientTypes', option.value)}
                    className="mr-2"
                  />
                  <label htmlFor={`client-${option.value}`} className="text-sm">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="preferredMeetingMethods" className="block text-sm font-medium text-navy-800 mb-1">
              Preferred Meeting Methods
            </label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {meetingMethodOptions.map(option => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`meeting-${option.value}`}
                    checked={formData.preferredMeetingMethods?.includes(option.value) || false}
                    onChange={() => handleMultiSelectChange('preferredMeetingMethods', option.value)}
                    className="mr-2"
                  />
                  <label htmlFor={`meeting-${option.value}`} className="text-sm">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProfileSection>
  );
};
