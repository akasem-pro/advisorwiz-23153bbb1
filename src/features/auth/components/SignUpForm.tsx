
import React from 'react';
import { Button } from '../../../components/ui/button';
import { CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';

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
    <CardContent className="pt-2 px-4 sm:px-6">
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="registerEmail" className="text-sm">Email</Label>
          <Input 
            id="registerEmail" 
            name="registerEmail" 
            type="email" 
            placeholder="name@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            disabled={isLoading}
            className={`h-11 ${errors.signUpEmail ? "border-red-500" : ""}`}
          />
          {errors.signUpEmail && (
            <p className="text-xs sm:text-sm text-red-500">{errors.signUpEmail}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="registerPassword" className="text-sm">Password</Label>
          <Input 
            id="registerPassword" 
            name="registerPassword" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            disabled={isLoading}
            className={`h-11 ${errors.signUpPassword ? "border-red-500" : ""}`}
          />
          {errors.signUpPassword && (
            <p className="text-xs sm:text-sm text-red-500">{errors.signUpPassword}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="confirmPassword" className="text-sm">Confirm Password</Label>
          <Input 
            id="confirmPassword" 
            name="confirmPassword" 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            disabled={isLoading}
            className={`h-11 ${errors.confirmPassword ? "border-red-500" : ""}`}
          />
          {errors.confirmPassword && (
            <p className="text-xs sm:text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div>
        <Button 
          type="submit" 
          className="w-full h-11 text-base" 
          disabled={isDisabled}
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>
    </CardContent>
  );
};

export default SignUpForm;
