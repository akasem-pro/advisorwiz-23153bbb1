
import React from 'react';
import { Textarea } from '../ui/textarea';
import { ProfileSection } from './ProfileSection';
import { ExtendedAdvisorProfileForm, Section } from '../../types/advisorTypes';
import ProfilePictureUpload from '../profile/ProfilePictureUpload';

interface MarketingSectionProps {
  section: Section;
  formData: ExtendedAdvisorProfileForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  toggleSection: (id: string) => void;
  handlePictureChange: (url: string) => void;
}

export const MarketingSection: React.FC<MarketingSectionProps> = ({
  section,
  formData,
  handleChange,
  toggleSection,
  handlePictureChange
}) => {
  return (
    <ProfileSection section={section} toggleSection={toggleSection}>
      <div className="p-4 border-t border-slate-200 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="profilePicture" className="block text-sm font-medium text-navy-800 mb-1">
              Profile Picture
            </label>
            <ProfilePictureUpload
              currentPicture={formData.profilePicture}
              onPictureChange={handlePictureChange}
            />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-navy-800 mb-1">
              Bio
            </label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
            />
          </div>
        </div>
      </div>
    </ProfileSection>
  );
};
