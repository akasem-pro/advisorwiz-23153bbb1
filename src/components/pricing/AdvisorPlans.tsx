
import React from 'react';
import PlanCard from './PlanCard';

const AdvisorPlans: React.FC = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8 lg:gap-6 max-w-7xl mx-auto">
      {/* Basic Plan */}
      <PlanCard 
        name="Basic"
        description="Essential tools for independent advisors"
        monthlyPrice={49}
        annualPrice={499}
        discount="Save 15%"
        features={[
          "Advisor profile listing",
          "Access to potential clients",
          "Standard support",
          "Client messaging",
          "Basic scheduling tools"
        ]}
      />
      
      {/* Professional Plan - Recommended */}
      <PlanCard 
        name="Professional"
        description="Enhanced visibility and client insights"
        monthlyPrice={99}
        annualPrice={999}
        discount="Save 16%"
        features={[
          "Priority listing",
          "Higher visibility",
          "Client insights",
          "Enhanced scheduling",
          "Priority support",
          "Performance analytics"
        ]}
        recommended={true}
        ctaText="Try Professional"
      />
      
      {/* Premium Plan */}
      <PlanCard 
        name="Premium"
        description="The ultimate solution for serious advisors"
        monthlyPrice={199}
        annualPrice={1999}
        discount="Save 17%"
        features={[
          "Featured advisor status",
          "Exclusive marketing tools",
          "Unlimited leads",
          "Advanced analytics dashboard",
          "Dedicated account manager",
          "Priority client matching"
        ]}
        ctaText="Get Premium"
      />
    </div>
  );
};

export default AdvisorPlans;
