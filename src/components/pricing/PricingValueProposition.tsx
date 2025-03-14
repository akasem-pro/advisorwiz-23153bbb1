
import React from 'react';

interface PricingValuePropositionProps {
  userType: 'consumer' | 'advisor' | 'enterprise';
}

const PricingValueProposition: React.FC<PricingValuePropositionProps> = ({ userType }) => {
  const getValueProps = () => {
    switch (userType) {
      case 'consumer':
        return {
          title: "Always Free for Consumers",
          description: "We connect you with qualified financial advisors at no cost. Our mission is to help everyone find the right financial guidance.",
          bulletPoints: [
            "No hidden fees or charges ever",
            "Access to vetted financial professionals",
            "Personalized matching based on your needs",
            "Secure communication platform"
          ]
        };
      case 'advisor':
        return {
          title: "Grow Your Practice",
          description: "Connect with pre-qualified prospects who match your expertise and ideal client profile.",
          bulletPoints: [
            "Higher conversion rates with matched prospects",
            "Average 15+ qualified leads per month",
            "92% of advisors report positive ROI within 3 months",
            "Detailed analytics on client engagement"
          ]
        };
      case 'enterprise':
        return {
          title: "Scale Your Firm",
          description: "Enterprise solutions for financial firms looking to manage multiple advisors and expand their client base.",
          bulletPoints: [
            "Centralized management dashboard",
            "Custom branding and white label options",
            "Team performance analytics",
            "Volume discounts for growing teams"
          ]
        };
    }
  };

  const valueProps = getValueProps();

  return (
    <div className={`bg-${userType === 'consumer' ? 'teal' : userType === 'advisor' ? 'navy' : 'purple'}-50 rounded-xl p-6 mb-8`}>
      <h3 className="text-xl font-bold mb-2">{valueProps.title}</h3>
      <p className="text-slate-600 mb-4">{valueProps.description}</p>
      <ul className="space-y-2">
        {valueProps.bulletPoints.map((point, index) => (
          <li key={index} className="flex items-start">
            <span className={`text-${userType === 'consumer' ? 'teal' : userType === 'advisor' ? 'navy' : 'purple'}-500 font-bold mr-2`}>✓</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingValueProposition;
