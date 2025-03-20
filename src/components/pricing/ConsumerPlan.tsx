
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const ConsumerPlan: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-navy-800 rounded-xl shadow-md overflow-hidden mb-8">
      <div className="md:flex">
        <div className="md:w-1/3 bg-teal-600 dark:bg-teal-700 text-white p-6 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-2">Consumer</h3>
          <div className="text-4xl font-bold mb-2">Free</div>
          <p className="text-teal-100">Forever. No hidden costs.</p>
        </div>
        
        <div className="p-6 md:w-2/3">
          <div className="mb-6">
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              AdvisorWiz is completely free for consumers. Our mission is to help everyone find the right financial guidance.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="dark:text-slate-200">Free matching with qualified financial advisors</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="dark:text-slate-200">Personalized recommendations based on your needs</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="dark:text-slate-200">Secure messaging with potential advisors</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="dark:text-slate-200">Schedule appointments directly through the platform</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="dark:text-slate-200">Access to advisor reviews and credentials</span>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={() => navigate('/onboarding')}
            className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white"
          >
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConsumerPlan;
