
import React from 'react';
import { ArrowRight, Save } from 'lucide-react';

interface ProfileFormActionsProps {
  handleSubmit: (e: React.FormEvent) => void;
  handleContinue: () => void;
}

export const ProfileFormActions: React.FC<ProfileFormActionsProps> = ({ 
  handleSubmit, 
  handleContinue 
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
      <button
        type="submit"
        onClick={handleSubmit}
        className="btn-primary flex items-center justify-center dark:bg-teal-600 dark:hover:bg-teal-700"
      >
        <Save className="h-5 w-5 mr-2" />
        Save Profile
      </button>
      <button
        type="button"
        onClick={handleContinue}
        className="btn-secondary flex items-center justify-center dark:bg-teal-600 dark:hover:bg-teal-700"
      >
        Continue
        <ArrowRight className="h-5 w-5 ml-2" />
      </button>
    </div>
  );
};
