
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import PriceDisplay from './PriceDisplay';
import FeatureItem from './FeatureItem';

interface PlanCardProps {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  discount: string;
  features: string[];
  recommended?: boolean;
  ctaText?: string;
  advisorCount?: string | null;
}

const PlanCard: React.FC<PlanCardProps> = ({ 
  name, 
  description, 
  monthlyPrice, 
  annualPrice, 
  discount,
  features,
  recommended = false,
  ctaText = "Get Started",
  advisorCount = null
}) => {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = React.useState<'monthly' | 'annually'>('annually');

  return (
    <div className={`relative rounded-xl p-6 ${recommended ? 'border-2 border-teal-500' : 'border border-slate-200 dark:border-navy-600'} bg-white dark:bg-navy-800 shadow-sm transition-all hover:shadow-md`}>
      {recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-teal-500 text-white text-sm font-medium rounded-full flex items-center gap-1">
          <Star className="h-4 w-4" />
          Recommended
        </div>
      )}
      
      <h3 className={`text-xl font-bold mt-${recommended ? '4' : '0'} dark:text-white`}>{name}</h3>
      <p className="text-slate-500 dark:text-slate-300 mt-2 h-12">{description}</p>
      
      <div className="flex gap-2 mt-4 mb-4">
        <Button
          variant={billingPeriod === 'monthly' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setBillingPeriod('monthly')}
          className={billingPeriod === 'monthly' 
            ? 'bg-navy-600 hover:bg-navy-700 text-white dark:bg-teal-600 dark:hover:bg-teal-700' 
            : 'text-navy-600 dark:text-slate-200 dark:border-slate-600 hover:bg-navy-50 dark:hover:bg-navy-700/50'}
        >
          Monthly
        </Button>
        <Button
          variant={billingPeriod === 'annually' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setBillingPeriod('annually')}
          className={billingPeriod === 'annually' 
            ? 'bg-teal-600 hover:bg-teal-700 text-white dark:bg-teal-600 dark:hover:bg-teal-700' 
            : 'text-navy-600 dark:text-slate-200 dark:border-slate-600 hover:bg-navy-50 dark:hover:bg-navy-700/50'}
        >
          Annually
        </Button>
      </div>
      
      <PriceDisplay 
        price={billingPeriod === 'monthly' ? monthlyPrice : annualPrice} 
        period={billingPeriod}
        discount={billingPeriod === 'annually' ? discount : null}
      />
      
      {advisorCount && (
        <div className="mb-4 mt-2">
          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700">
            {advisorCount}
          </Badge>
        </div>
      )}
      
      <div className="border-t border-slate-200 dark:border-navy-600 my-6 pt-6">
        <p className="font-medium mb-4 dark:text-white">Key Features</p>
        <div className="space-y-2">
          {features.map((feature, index) => (
            <FeatureItem key={index} included={true} text={feature} />
          ))}
        </div>
      </div>
      
      <Button 
        className={`w-full ${recommended ? 'bg-teal-600 hover:bg-teal-700' : 'bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white'}`}
        onClick={() => navigate('/onboarding')}
      >
        {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default PlanCard;
