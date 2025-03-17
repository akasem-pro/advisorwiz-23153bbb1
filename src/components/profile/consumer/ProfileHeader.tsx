
import React from 'react';
import {
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const ProfileHeader: React.FC = () => {
  return (
    <CardHeader>
      <CardTitle>Consumer Profile</CardTitle>
      <CardDescription>Update your profile information here.</CardDescription>
    </CardHeader>
  );
};

export default ProfileHeader;
