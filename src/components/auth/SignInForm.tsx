
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

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
    <CardContent className="pt-4">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="name@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            disabled={isLoading}
            className={errors.signInEmail ? "border-red-500" : ""}
          />
          {errors.signInEmail && (
            <p className="text-sm text-red-500">{errors.signInEmail}</p>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/reset-password" className="text-sm text-teal-600 hover:text-teal-500">
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
            className={errors.signInPassword ? "border-red-500" : ""}
          />
          {errors.signInPassword && (
            <p className="text-sm text-red-500">{errors.signInPassword}</p>
          )}
        </div>
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isDisabled}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </CardContent>
  );
};

export default SignInForm;
