
import React from 'react';
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

interface ProfileActionsProps {
  saveProfile: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({
  saveProfile
}) => {
  return (
    <CardFooter>
      <Button onClick={saveProfile}>Update Profile</Button>
    </CardFooter>
  );
};

export default ProfileActions;
