
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { ProfileSection } from './ProfileSection';
import { ExtendedAdvisorProfileForm, Section } from '../../types/advisorTypes';

interface BasicInfoSectionProps {
  section: Section;
  formData: ExtendedAdvisorProfileForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  toggleSection: (id: string) => void;
  handleVerifyEmail: () => void;
  handleVerifyPhone: () => void;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  provincesOptions: Array<{ value: string; label: string }>;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  section,
  formData,
  handleChange,
  toggleSection,
  handleVerifyEmail,
  handleVerifyPhone,
  isEmailVerified,
  isPhoneVerified,
  provincesOptions
}) => {
  return (
    <ProfileSection section={section} toggleSection={toggleSection}>
      <div className="p-4 border-t border-slate-200 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-navy-800 mb-1">
              Full Name*
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy-800 mb-1">
              Email Address*
            </label>
            <div className="relative">
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
                className={isEmailVerified ? "pr-10 border-green-500" : "pr-10"}
              />
              {isEmailVerified ? (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
              ) : (
                <button
                  type="button"
                  onClick={handleVerifyEmail}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs bg-teal-500 text-white px-2 py-1 rounded"
                  disabled={!formData.email}
                >
                  Verify
                </button>
              )}
            </div>
            {!isEmailVerified && formData.email && (
              <p className="text-amber-600 text-xs mt-1">
                Email verification required
              </p>
            )}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-navy-800 mb-1">
              Phone Number*
            </label>
            <div className="relative">
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
                required
                className={isPhoneVerified ? "pr-10 border-green-500" : "pr-10"}
              />
              {isPhoneVerified ? (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
              ) : (
                <button
                  type="button"
                  onClick={handleVerifyPhone}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs bg-teal-500 text-white px-2 py-1 rounded"
                  disabled={!formData.phone}
                >
                  Verify
                </button>
              )}
            </div>
            {!isPhoneVerified && formData.phone && (
              <p className="text-amber-600 text-xs mt-1">
                Phone verification required
              </p>
            )}
          </div>
          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-navy-800 mb-1">
              Firm/Company Name
            </label>
            <Input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Your firm or company name"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="street" className="block text-sm font-medium text-navy-800 mb-1">
              Office Address
            </label>
            <Input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Street address"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-navy-800 mb-1">
              City
            </label>
            <Input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="province" className="block text-sm font-medium text-navy-800 mb-1">
              Province/Territory*
            </label>
            <select
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select province/territory</option>
              {provincesOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-navy-800 mb-1">
              Postal Code
            </label>
            <Input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="A1B 2C3"
            />
          </div>
        </div>
      </div>
    </ProfileSection>
  );
};
