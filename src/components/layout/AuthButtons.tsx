
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

interface AuthButtonsProps {
  className?: string;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <Link to="/sign-in">
        <Button variant="outline" size="sm">
          Sign In
        </Button>
      </Link>
      <Link to="/onboarding">
        <Button size="sm">Get Started</Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
