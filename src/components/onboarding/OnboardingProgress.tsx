
import React from 'react';
import { Check, ChevronRight } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description?: string;
}

interface OnboardingProgressProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
  allowNavigation?: boolean;
}

const OnboardingProgress: React.FC<OnboardingProgressProps> = ({
  steps,
  currentStep,
  onStepClick,
  allowNavigation = false
}) => {
  const handleStepClick = (stepId: number) => {
    if (allowNavigation && onStepClick && stepId < currentStep) {
      onStepClick(stepId);
    }
  };
  
  return (
    <div className="mb-8">
      <div className="hidden md:flex items-center justify-center mb-6">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div 
              className={`flex flex-col items-center ${allowNavigation && step.id < currentStep ? 'cursor-pointer' : ''}`}
              onClick={() => handleStepClick(step.id)}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.id < currentStep 
                    ? 'bg-teal-500 text-white' 
                    : step.id === currentStep 
                    ? 'bg-teal-100 border-2 border-teal-500 text-teal-700' 
                    : 'bg-slate-100 text-slate-400 dark:bg-navy-800 dark:text-slate-500'
                }`}
              >
                {step.id < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <span 
                className={`text-sm mt-2 text-center max-w-[120px] ${
                  step.id === currentStep 
                    ? 'font-medium text-teal-700 dark:text-teal-400' 
                    : step.id < currentStep
                    ? 'text-slate-700 dark:text-slate-300'
                    : 'text-slate-500 dark:text-slate-500'
                }`}
              >
                {step.title}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={`w-12 h-0.5 mx-2 ${
                  step.id < currentStep 
                    ? 'bg-teal-500' 
                    : 'bg-slate-200 dark:bg-navy-700'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="md:hidden">
        <div className="flex items-center mb-4">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Step {currentStep} of {steps.length}</span>
          <div className="h-1 bg-slate-100 dark:bg-navy-800 flex-1 mx-3 rounded-full overflow-hidden">
            <div 
              className="h-full bg-teal-500" 
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="flex items-center">
          <div 
            className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 flex items-center justify-center flex-shrink-0"
          >
            {currentStep}
          </div>
          <div className="ml-3">
            <h4 className="font-medium text-navy-800 dark:text-slate-200">{steps[currentStep - 1]?.title}</h4>
            {steps[currentStep - 1]?.description && (
              <p className="text-sm text-slate-600 dark:text-slate-400">{steps[currentStep - 1].description}</p>
            )}
          </div>
          {currentStep < steps.length && (
            <div className="ml-auto flex items-center text-sm text-slate-500">
              <span>Next: {steps[currentStep].title}</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingProgress;
