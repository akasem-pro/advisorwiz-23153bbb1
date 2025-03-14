
import React from 'react';
import { LucideIcon, Users, Sparkles, MessageSquare, Calendar } from 'lucide-react';

interface MatchingStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  step: number;
}

const MatchingStep: React.FC<MatchingStepProps> = ({ icon: Icon, title, description, step }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
          <span className="font-bold text-teal-700">{step}</span>
        </div>
      </div>
      <div>
        <h3 className="flex items-center text-lg font-medium text-navy-800 mb-1">
          <Icon className="h-5 w-5 text-teal-600 mr-2" />
          {title}
        </h3>
        <p className="text-slate-600">{description}</p>
      </div>
    </div>
  );
};

interface MatchingExplanationProps {
  userType: 'consumer' | 'advisor' | null;
}

const MatchingExplanation: React.FC<MatchingExplanationProps> = ({ userType }) => {
  const getSteps = () => {
    if (userType === 'consumer') {
      return [
        {
          icon: Users,
          title: "Profile Analysis",
          description: "Our algorithm analyzes your financial goals, preferences, and needs.",
          step: 1
        },
        {
          icon: Sparkles,
          title: "Smart Matching",
          description: "We identify advisors with expertise that matches your specific requirements.",
          step: 2
        },
        {
          icon: MessageSquare,
          title: "Connect & Communicate",
          description: "Message potential advisors directly through our secure platform.",
          step: 3
        },
        {
          icon: Calendar,
          title: "Schedule a Consultation",
          description: "Book an appointment with advisors you're interested in working with.",
          step: 4
        }
      ];
    } else {
      return [
        {
          icon: Users,
          title: "Client Needs Analysis",
          description: "Our system identifies potential clients whose needs match your expertise.",
          step: 1
        },
        {
          icon: Sparkles,
          title: "Smart Matching",
          description: "We connect you with prospects who are specifically looking for your services.",
          step: 2
        },
        {
          icon: MessageSquare,
          title: "Engage Prospects",
          description: "Communicate with potential clients through our secure platform.",
          step: 3
        },
        {
          icon: Calendar,
          title: "Schedule Consultations",
          description: "Book appointments with interested prospects directly through the platform.",
          step: 4
        }
      ];
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 mb-8">
      <h2 className="text-xl font-bold text-navy-900 mb-4">
        How Our Matching Works
      </h2>
      <div className="space-y-6">
        {getSteps().map((step, index) => (
          <MatchingStep 
            key={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
            step={step.step}
          />
        ))}
      </div>
    </div>
  );
};

export default MatchingExplanation;
