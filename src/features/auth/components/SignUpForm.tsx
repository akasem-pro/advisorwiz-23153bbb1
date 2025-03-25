
import React from 'react';
import { Button } from '../../../components/ui/button';
import { CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';

interface SignUpFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<boolean | void>;
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
    <CardContent className="pt-4 px-4 sm:px-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="registerEmail" className="text-sm font-medium">Email</Label>
          <Input 
            id="registerEmail" 
            name="registerEmail" 
            type="email" 
            placeholder="name@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            disabled={isLoading}
            className={`h-11 text-base ${errors.signUpEmail ? "border-red-500" : ""}`}
          />
          {errors.signUpEmail && (
            <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.signUpEmail}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="registerPassword" className="text-sm font-medium">Password</Label>
          <Input 
            id="registerPassword" 
            name="registerPassword" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            disabled={isLoading}
            className={`h-11 text-base ${errors.signUpPassword ? "border-red-500" : ""}`}
          />
          {errors.signUpPassword && (
            <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.signUpPassword}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
          <Input 
            id="confirmPassword" 
            name="confirmPassword" 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            disabled={isLoading}
            className={`h-11 text-base ${errors.confirmPassword ? "border-red-500" : ""}`}
          />
          {errors.confirmPassword && (
            <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
          )}
        </div>
        <Button 
          type="submit" 
          className="w-full h-11 text-base bg-navy-600 hover:bg-navy-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white" 
          disabled={isDisabled}
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>
    </CardContent>
  );
};

export default SignUpForm;
