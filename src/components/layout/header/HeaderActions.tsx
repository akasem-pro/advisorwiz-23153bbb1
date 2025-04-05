
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import UserMenu from '../user-menu';
import ThemeToggle from '../ThemeToggleButton';

interface HeaderActionsProps {
  isAuthenticated: boolean;
  getUserName: () => string;
  getInitials: () => string;
  getProfileImage: () => string;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  isAuthenticated,
  getUserName,
  getInitials,
  getProfileImage
}) => {
  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      
      {isAuthenticated ? (
        <UserMenu 
          getUserName={getUserName}
          getInitials={getInitials}
          getProfileImage={getProfileImage}
        />
      ) : (
        <div className="flex gap-2">
          <Link to="/signin">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HeaderActions;
