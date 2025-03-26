
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';
import BenefitsSection from '../components/advisors/BenefitsSection';
import PageHero from '../components/shared/PageHero';
import PageHowItWorks from '../components/shared/PageHowItWorks';
import PageFAQ from '../components/shared/PageFAQ';
import PageCTA from '../components/shared/PageCTA';
import { Check } from 'lucide-react';

const ForAdvisors: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'For Advisors', url: '/for-advisors' }
  ];

  // How it works steps
  const steps = [
    {
      number: 1,
      title: "Create Your Advisor Profile",
      description: "Sign up and build your professional profile, highlighting your expertise, credentials, and services. The more complete your profile, the better our matching algorithm works."
    },
    {
      number: 2,
      title: "Get Matched with Potential Clients",
      description: "Our proprietary algorithm connects you with consumers who match your specialty, location, and expertise. You'll receive notifications when potential clients are interested in your services."
    },
    {
      number: 3,
      title: "Schedule Consultations",
      description: "Use our integrated scheduling system to book appointments with interested prospects. You control your availability and consultation format (in-person, video call, or phone)."
    },
    {
      number: 4,
      title: "Grow Your Practice",
      description: "Convert consultations into long-term client relationships. Our platform helps you track prospects, follow up, and expand your practice efficiently."
    }
  ];

  // FAQs for advisors
  const faqs = [
    {
      question: "How do I sign up as a financial advisor?",
      answer: "To join our platform, click the 'Sign In' button in the header, then select 'Create an Account' and choose 'Advisor' as your account type. Once registered, you'll complete a profile with your professional information."
    },
    {
      question: "What types of advisors can join the platform?",
      answer: "We welcome a wide range of financial professionals including CFPs, investment advisors, insurance specialists, tax professionals, estate planners, and wealth managers. All advisors must meet our verification standards."
    },
    {
      question: "Is there a fee to join?",
      answer: "We offer several flexible pricing options including a basic free tier with limited features, and premium subscription tiers with advanced functionality. Visit our Pricing page for detailed information."
    },
    {
      question: "How does the matching process work?",
      answer: "Our proprietary algorithm matches advisors with potential clients based on expertise, location, specialty, and client needs. The more complete your profile, the better your matching results will be."
    },
    {
      question: "Can I manage my availability on the platform?",
      answer: "Yes, our platform includes a comprehensive scheduling system where you can set your availability, block off time, and manage appointment requests from potential clients."
    }
  ];

  return (
    <AppLayout>
      <BreadcrumbNav items={breadcrumbs} />
      
      <PageHero 
        title="Grow Your Advisory Practice with Qualified Leads"
        subtitle="Connect with pre-screened clients who are actively seeking your expertise. Our advanced matching system pairs you with prospects most likely to benefit from your services."
        primaryCta={{
          text: "Join as an Advisor",
          link: "/onboarding",
          icon: true
        }}
        secondaryCta={{
          text: "View Pricing Options",
          link: "/pricing"
        }}
        features={[
          {
            title: "Qualified Leads",
            description: "Connect with clients who are actively seeking financial advice and match your expertise.",
            icon: <Check className="h-6 w-6 text-teal-600 dark:text-teal-400" />
          },
          {
            title: "Digital Presence",
            description: "Showcase your expertise with a professionally designed profile that builds client trust.",
            icon: <Check className="h-6 w-6 text-teal-600 dark:text-teal-400" />
          },
          {
            title: "Scheduling Tools",
            description: "Manage appointments, consultations, and follow-ups with our integrated scheduling system.",
            icon: <Check className="h-6 w-6 text-teal-600 dark:text-teal-400" />
          }
        ]}
      />
      
      <BenefitsSection />
      
      <PageHowItWorks
        title="How It Works"
        steps={steps}
      />
      
      <PageFAQ
        title="Frequently Asked Questions"
        faqs={faqs}
      />
      
      <PageCTA
        title="Ready to Grow Your Advisory Practice?"
        description="Join thousands of advisors who are expanding their client base through our platform."
        buttonText="Get Started Now"
        buttonLink="/onboarding"
      />
    </AppLayout>
  );
};

export default ForAdvisors;
