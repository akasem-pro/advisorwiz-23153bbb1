
import React, { Suspense, useState, useTransition } from 'react';
import AppLayout from '../components/layout/AppLayout';
import BreadcrumbNav from '../components/firms/BreadcrumbNav';
import BenefitsSection from '../components/firms/BenefitsSection';
import PageHero from '../components/shared/PageHero';
import PageHowItWorks from '../components/shared/PageHowItWorks';
import PageFAQ from '../components/shared/PageFAQ';
import PageCTA from '../components/shared/PageCTA';
import { Users, BarChart, Shield } from 'lucide-react';
import AppShareWidget from '../components/ui/AppShareWidget';
import { SectionLoadingFallback, ErrorFallback } from '../components/LazyComponents';

const ForFirms: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  
  // Ensure all state transitions use startTransition
  const [contentLoaded, setContentLoaded] = useState(false);
  React.useEffect(() => {
    startTransition(() => {
      setContentLoaded(true);
    });
  }, []);

  // How it works steps
  const steps = [
    {
      number: 1,
      title: "Sign Up Your Firm",
      description: "Create an enterprise account for your firm, providing basic information about your organization and team structure."
    },
    {
      number: 2,
      title: "Onboard Your Advisors",
      description: "Add your financial advisors to the platform, where they can complete their profiles and begin reaching new clients."
    },
    {
      number: 3,
      title: "Set Up Compliance Controls",
      description: "Configure your compliance settings to ensure all advisor activities meet your firm's standards and regulatory requirements."
    },
    {
      number: 4,
      title: "Monitor & Optimize",
      description: "Use our advanced analytics to track performance, optimize advisor-client matching, and grow your business."
    }
  ];

  // FAQs for firms
  const faqs = [
    {
      question: "How does AdvisorWiz help my firm manage advisors?",
      answer: "AdvisorWiz provides a central dashboard for firm administrators to manage all advisor profiles, monitor client interactions, and track performance metrics. Our platform makes it easy to assign leads to the right advisors and maintain regulatory compliance."
    },
    {
      question: "Can I customize the platform to match my firm's branding?",
      answer: "Yes, enterprise accounts include white-labeling options that allow you to customize the interface with your firm's logo, colors, and branding elements. This creates a seamless experience for both your advisors and clients."
    },
    {
      question: "How secure is my firm's and clients' data on AdvisorWiz?",
      answer: "We implement bank-level security measures including end-to-end encryption, regular security audits, and strict access controls. We're compliant with financial industry regulations and never share your data with third parties without explicit permission."
    },
    {
      question: "Can I integrate AdvisorWiz with our existing CRM or financial planning software?",
      answer: "Yes, AdvisorWiz offers API integrations with popular CRM platforms, financial planning software, and portfolio management tools. Our team can work with you to ensure smooth data flow between all your systems."
    },
    {
      question: "How does pricing work for firms with multiple advisors?",
      answer: "We offer tiered pricing for firms based on the number of advisors. Enterprise plans include volume discounts, dedicated support, and additional features like advanced analytics and compliance tools. Contact us for a custom quote."
    }
  ];

  if (!contentLoaded) {
    return <SectionLoadingFallback />;
  }

  return (
    <AppLayout animation="fade">
      <ErrorBoundary>
        <BreadcrumbNav 
          items={[
            { name: 'Home', url: '/' },
            { name: 'Financial Firms', url: '/for-firms' }
          ]} 
        />
      </ErrorBoundary>
      
      <Suspense fallback={<SectionLoadingFallback />}>
        <PageHero 
          title="Enterprise Solutions for Financial Firms"
          subtitle="Streamline advisor management, ensure compliance, and increase client acquisition with our enterprise platform designed specifically for financial firms."
          primaryCta={{
            text: "Schedule a Demo",
            link: "/contact",
            icon: true
          }}
          secondaryCta={{
            text: "View Enterprise Plans",
            link: "/pricing"
          }}
          features={[
            {
              title: "Team Management",
              description: "Centralize control of advisor profiles, leads, and client interactions.",
              icon: <Users className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            },
            {
              title: "Analytics Dashboard",
              description: "Access comprehensive performance metrics and reporting tools.",
              icon: <BarChart className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            },
            {
              title: "Compliance Controls",
              description: "Implement governance tools that ensure regulatory compliance.",
              icon: <Shield className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            }
          ]}
        />
      </Suspense>
      
      <Suspense fallback={<SectionLoadingFallback />}>
        <BenefitsSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoadingFallback />}>
        <PageHowItWorks
          title="How AdvisorWiz Works for Firms"
          steps={steps}
        />
      </Suspense>

      {/* Add social sharing widget */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-sm mx-auto">
          <Suspense fallback={<div className="h-12 w-full bg-slate-200 animate-pulse rounded"></div>}>
            <AppShareWidget variant="standard" />
          </Suspense>
        </div>
      </div>
      
      <Suspense fallback={<SectionLoadingFallback />}>
        <PageFAQ
          title="Frequently Asked Questions"
          faqs={faqs}
        />
      </Suspense>
      
      <Suspense fallback={<SectionLoadingFallback />}>
        <PageCTA
          title="Ready to Transform Your Firm's Digital Presence?"
          description="Join hundreds of financial firms using AdvisorWiz to streamline operations and grow their business."
          buttonText="Get Started Today"
          buttonLink="/contact"
        />
      </Suspense>
    </AppLayout>
  );
};

// Simple error boundary component
class ErrorBoundary extends React.Component<{children: React.ReactNode}> {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ForFirms error:", error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}

export default ForFirms;
