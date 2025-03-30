
import { CallBackProps, Step } from 'react-joyride';
import { UserType } from '../../types/profileTypes';

export interface OnboardingTourOptions {
  userType?: UserType;
  onComplete?: () => void;
  onSkip?: () => void;
}

export interface OnboardingTourState {
  run: boolean;
  stepIndex: number;
  steps: Step[];
}

export interface OnboardingTourActions {
  setRun: (run: boolean) => void;
  startTour: () => void;
  resetTour: () => void;
  handleJoyrideCallback: (data: CallBackProps) => void;
}

export type OnboardingTourHook = OnboardingTourState & OnboardingTourActions;

// Add this type for the pricing page tour
export type PricingUserType = 'consumer' | 'advisor' | 'enterprise';
