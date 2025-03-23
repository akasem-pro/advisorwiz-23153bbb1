
import React, { useState } from 'react';
import { Eye, EyeOff, Info } from 'lucide-react';
import { Button } from '../ui/button';
import OnboardingTooltip from './OnboardingTooltip';

interface OnboardingAccountProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  termsAccepted: boolean;
  setTermsAccepted: (accepted: boolean) => void;
  errors?: {
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  };
}

const OnboardingAccount: React.FC<OnboardingAccountProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  termsAccepted,
  setTermsAccepted,
  errors = {}
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Password strength calculation
  const calculatePasswordStrength = (password: string): { strength: number; label: string; color: string } => {
    if (!password) return { strength: 0, label: 'None', color: 'bg-slate-200 dark:bg-navy-700' };
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    const strengthMap = [
      { label: 'Very Weak', color: 'bg-red-500' },
      { label: 'Weak', color: 'bg-orange-500' },
      { label: 'Fair', color: 'bg-yellow-500' },
      { label: 'Good', color: 'bg-teal-500' },
      { label: 'Strong', color: 'bg-green-500' }
    ];
    
    return { 
      strength, 
      label: strengthMap[strength - 1]?.label || 'None',
      color: strengthMap[strength - 1]?.color || 'bg-slate-200 dark:bg-navy-700'
    };
  };
  
  const passwordStrength = calculatePasswordStrength(password);
  
  return (
    <div className="max-w-md mx-auto">
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="email" className="block text-sm font-medium text-navy-800 dark:text-slate-200">
              Email
            </label>
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email}</span>
            )}
          </div>
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`input-field ${errors.email ? 'border-red-300 dark:border-red-700 focus:ring-red-500' : ''}`}
              placeholder="Your email address"
            />
            <OnboardingTooltip 
              title="Your Email" 
              description="We'll use this email to send you important information about your account and matches."
              placement="right"
            >
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Info className="h-4 w-4 text-slate-400" />
              </div>
            </OnboardingTooltip>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-navy-800 dark:text-slate-200">
              Password
            </label>
            {errors.password && (
              <span className="text-xs text-red-500">{errors.password}</span>
            )}
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`input-field pr-10 ${errors.password ? 'border-red-300 dark:border-red-700 focus:ring-red-500' : ''}`}
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          
          {password && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-slate-500">Password strength: {passwordStrength.label}</span>
                <span className="text-xs text-slate-500">{password.length}/20</span>
              </div>
              <div className="h-1 w-full bg-slate-200 dark:bg-navy-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${passwordStrength.color}`} 
                  style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-navy-800 dark:text-slate-200">
              Confirm Password
            </label>
            {errors.confirmPassword && (
              <span className="text-xs text-red-500">{errors.confirmPassword}</span>
            )}
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`input-field pr-10 ${errors.confirmPassword ? 'border-red-300 dark:border-red-700 focus:ring-red-500' : ''}`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        <div className="pt-2">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded dark:border-navy-600 dark:bg-navy-800"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className={`text-slate-600 dark:text-slate-300 ${errors.terms ? 'text-red-500' : ''}`}>
                I agree to the <Button variant="link" className="p-0 h-auto text-teal-600 dark:text-teal-400" asChild><a href="/terms">Terms of Service</a></Button> and <Button variant="link" className="p-0 h-auto text-teal-600 dark:text-teal-400" asChild><a href="/privacy">Privacy Policy</a></Button>
              </label>
              {errors.terms && (
                <p className="text-xs text-red-500 mt-1">{errors.terms}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingAccount;
