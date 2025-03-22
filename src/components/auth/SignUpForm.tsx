
import React from 'react';
import { Button } from '../ui/button';
import { CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface SignUpFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  errors: {
    signUpEmail: string;
    signUpPassword: string;
    confirmPassword: string;
  };
  isLoading: boolean;
  isDisabled: boolean;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  errors,
  isLoading,
  isDisabled
}) => {
  return (
    <CardContent className="pt-4">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="registerEmail">Email</Label>
          <Input 
            id="registerEmail" 
            name="registerEmail" 
            type="email" 
            placeholder="name@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            disabled={isLoading}
            className={errors.signUpEmail ? "border-red-500" : ""}
          />
          {errors.signUpEmail && (
            <p className="text-sm text-red-500">{errors.signUpEmail}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="registerPassword">Password</Label>
          <Input 
            id="registerPassword" 
            name="registerPassword" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            disabled={isLoading}
            className={errors.signUpPassword ? "border-red-500" : ""}
          />
          {errors.signUpPassword && (
            <p className="text-sm text-red-500">{errors.signUpPassword}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input 
            id="confirmPassword" 
            name="confirmPassword" 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            disabled={isLoading}
            className={errors.confirmPassword ? "border-red-500" : ""}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div>
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isDisabled}
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>
    </CardContent>
  );
};

export default SignUpForm;
