
import React, { useState, useRef, ChangeEvent } from 'react';
import { Camera, User, Upload } from 'lucide-react';

interface ProfilePictureUploadProps {
  currentPicture?: string;
  onPictureChange: (imageBase64: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({ 
  currentPicture, 
  onPictureChange,
  size = 'md'
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentPicture);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-28 h-28',
    lg: 'w-36 h-36'
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if the file is an image
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should not exceed 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onPictureChange(result);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`${sizeClasses[size]} relative rounded-full overflow-hidden border-2 border-teal-400 bg-navy-50 cursor-pointer group`}
        onClick={triggerFileInput}
      >
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-navy-100">
            <User className="w-1/2 h-1/2 text-navy-500" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Camera className="text-white w-1/3 h-1/3" />
        </div>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <button 
        type="button" 
        onClick={triggerFileInput}
        className="mt-2 text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center"
      >
        <Upload className="w-4 h-4 mr-1" />
        {previewUrl ? 'Change Photo' : 'Upload Photo'}
      </button>
    </div>
  );
};

export default ProfilePictureUpload;
