
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';

interface SignInFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  errors: {
    signInEmail: string;
    signInPassword: string;
  };
  isLoading: boolean;
  isDisabled: boolean;
}

const SignInForm: React.FC<SignInFormProps> = ({
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  errors,
  isLoading,
  isDisabled
}) => {
  return (
    <CardContent className="pt-2 px-4 sm:px-6">
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="email" className="text-sm">Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="name@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            disabled={isLoading}
            className={`h-11 ${errors.signInEmail ? "border-red-500" : ""}`}
          />
          {errors.signInEmail && (
            <p className="text-xs sm:text-sm text-red-500">{errors.signInEmail}</p>
          )}
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm">Password</Label>
            <Link to="/reset-password" className="text-xs sm:text-sm text-teal-600 hover:text-teal-500">
              Forgot password?
            </Link>
          </div>
          <Input 
            id="password" 
            name="password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            disabled={isLoading}
            className={`h-11 ${errors.signInPassword ? "border-red-500" : ""}`}
          />
          {errors.signInPassword && (
            <p className="text-xs sm:text-sm text-red-500">{errors.signInPassword}</p>
          )}
        </div>
        <Button 
          type="submit" 
          className="w-full h-11 text-base" 
          disabled={isDisabled}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </CardContent>
  );
};

export default SignInForm;
