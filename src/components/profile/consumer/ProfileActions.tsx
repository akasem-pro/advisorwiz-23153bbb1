
import React from 'react';
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

interface ProfileActionsProps {
  saveProfile: () => void;
  isSubmitting?: boolean;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({
  saveProfile,
  isSubmitting = false
}) => {
  return (
    <CardFooter>
      <Button onClick={saveProfile} disabled={isSubmitting}>
        {isSubmitting ? 'Updating...' : 'Update Profile'}
      </Button>
    </CardFooter>
  );
};

export default ProfileActions;
