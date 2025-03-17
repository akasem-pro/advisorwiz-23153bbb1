
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileFormValues } from '@/hooks/useConsumerProfileForm';

interface ProfileImageSectionProps {
  profileImage: string | null;
  formData: ProfileFormValues;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImageSection: React.FC<ProfileImageSectionProps> = ({
  profileImage,
  formData,
  handleImageUpload
}) => {
  return (
    <div>
      <Label htmlFor="profilePicture">Profile Picture</Label>
      <div className="flex items-center space-x-4 mt-2">
        <Avatar className="h-12 w-12">
          {profileImage ? (
            <AvatarImage src={profileImage} alt="Profile Image" />
          ) : (
            <AvatarFallback>{formData.name?.charAt(0).toUpperCase()}</AvatarFallback>
          )}
        </Avatar>
        <div className="space-y-1">
          <Input
            id="profilePicture"
            type="file"
            className="hidden"
            onChange={handleImageUpload}
          />
          <Label
            htmlFor="profilePicture"
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md text-sm font-medium cursor-pointer hover:bg-slate-200 transition-colors"
          >
            Upload Image
          </Label>
          <p className="text-xs text-slate-500">
            Recommended size: 150x150 pixels.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageSection;
