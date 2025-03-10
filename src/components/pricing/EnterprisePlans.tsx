
import React from 'react';
import PlanCard from './PlanCard';

const EnterprisePlans: React.FC = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8 lg:gap-6 max-w-7xl mx-auto">
      {/* Small Firm Plan */}
      <PlanCard 
        name="Small Firm"
        description="Perfect for growing advisory firms"
        monthlyPrice={399}
        annualPrice={3999}
        discount="Save 15%"
        advisorCount="Up to 5 advisors"
        features={[
          "Standard advisor listings",
          "Firm branding",
          "Lead access",
          "Basic CRM tools",
          "Standard support"
        ]}
      />
      
      {/* Growth Plan - Recommended */}
      <PlanCard 
        name="Growth"
        description="For established firms looking to scale"
        monthlyPrice={799}
        annualPrice={7999}
        discount="Save 17%"
        advisorCount="Up to 15 advisors"
        features={[
          "Priority firm listing",
          "CRM tools",
          "Client insights",
          "Analytics dashboard",
          "Team management tools",
          "Priority support"
        ]}
        recommended={true}
        ctaText="Try Growth Plan"
      />
      
      {/* Enterprise Plan */}
      <PlanCard 
        name="Enterprise"
        description="For large firms with extensive needs"
        monthlyPrice={1499}
        annualPrice={14999}
        discount="Save 20%"
        advisorCount="Unlimited advisors"
        features={[
          "Featured firm status",
          "Unlimited leads",
          "Exclusive marketing tools",
          "VIP client matching",
          "Advanced analytics",
          "Customizable workflows",
          "Dedicated account team"
        ]}
        ctaText="Contact Sales"
      />
    </div>
  );
};

export default EnterprisePlans;
