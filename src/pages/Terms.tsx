
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';
import { FileText } from 'lucide-react';

const Terms: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Terms and Conditions', url: '/terms' }
  ];

  return (
    <AppLayout>
      <BreadcrumbNav items={breadcrumbs} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-8 w-8 text-teal-600" />
            <h1 className="section-title">Terms and Conditions</h1>
          </div>
          
          <div className="text-right text-sm text-slate-600 dark:text-slate-400 mb-6">
            Last Updated: Feb 20th 2025
          </div>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="lead">
              Welcome to AdvisorWiz! These Terms and Conditions outline the rules and regulations for using our platform. 
              By accessing or using AdvisorWiz, you agree to comply with these terms. If you do not agree with any part of these terms, 
              please do not use our services.
            </p>
            
            <h2 className="mt-8 text-xl font-bold">1. Definitions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>"Platform"</strong> refers to AdvisorWiz, including its website, services, and tools.</li>
              <li><strong>"User"</strong> refers to any individual or entity using the platform, including consumers and financial advisors.</li>
              <li><strong>"Consumer"</strong> refers to individuals seeking financial advice.</li>
              <li><strong>"Financial Advisor"</strong> refers to professionals offering financial advisory services through our platform.</li>
              <li><strong>"Services"</strong> refers to the features and functionalities provided by AdvisorWiz, including advisor matching, online appointments, and subscriptions.</li>
            </ul>
            
            <h2 className="mt-8 text-xl font-bold">2. Eligibility</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Users must be at least 18 years old to access our platform.</li>
              <li>Financial Advisors must be licensed, qualified, and compliant with applicable laws and regulations in their jurisdiction.</li>
              <li>AdvisorWiz reserves the right to verify credentials before approving any Financial Advisor's profile.</li>
            </ul>
            
            <h2 className="mt-8 text-xl font-bold">3. Services Provided</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>AdvisorWiz acts as a connection platform between Consumers and Financial Advisors.</li>
              <li>We do not provide direct financial advice, investment services, or legal consultation.</li>
              <li>Consumers can book free or paid consultations through the platform, depending on the advisor's terms.</li>
            </ul>
            
            <h2 className="mt-8 text-xl font-bold">4. User Responsibilities</h2>
            <h3 className="mt-4 text-lg font-semibold">4.1 For Consumers:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Consumers acknowledge that any financial decisions made based on advisor recommendations are their sole responsibility.</li>
              <li>AdvisorWiz does not guarantee financial outcomes or investment success.</li>
            </ul>
            
            <h3 className="mt-4 text-lg font-semibold">4.2 For Financial Advisors:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Financial Advisors must provide accurate, truthful, and up-to-date information about their qualifications.</li>
              <li>Any advice given must be in compliance with legal and ethical standards set by industry regulators.</li>
              <li>AdvisorWiz is not liable for any disputes arising between Financial Advisors and Consumers.</li>
            </ul>
            
            <h2 className="mt-8 text-xl font-bold">5. Payments & Subscriptions (For Financial Advisors)</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Financial Advisors must subscribe to a paid membership plan to access leads and be listed on the platform.</li>
              <li>Subscription fees are non-refundable, except as required by law.</li>
              <li>AdvisorWiz reserves the right to modify pricing or cancel accounts if terms are violated.</li>
            </ul>
            
            <h2 className="mt-8 text-xl font-bold">6. Disclaimers & Limitations of Liability</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>No Guarantees:</strong> AdvisorWiz does not endorse, verify, or guarantee the services provided by Financial Advisors.</li>
              <li><strong>Platform Downtime:</strong> While we strive for 100% uptime, we do not guarantee uninterrupted access.</li>
              <li><strong>Liability Cap:</strong> AdvisorWiz shall not be liable for any indirect, incidental, or consequential damages arising from the use of our platform.</li>
            </ul>
            
            <h2 className="mt-8 text-xl font-bold">7. Privacy & Data Protection</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We collect and process user data in accordance with our Privacy Policy.</li>
              <li>We do not sell or share user data with third parties for marketing purposes.</li>
              <li>Users must ensure that any personal or financial data shared during consultations is done at their own discretion.</li>
            </ul>
            
            <h2 className="mt-8 text-xl font-bold">8. Account Termination</h2>
            <p>AdvisorWiz reserves the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Suspend or terminate any account for violating these terms.</li>
              <li>Remove Financial Advisors who provide misleading information or violate professional ethics.</li>
            </ul>
            
            <h2 className="mt-8 text-xl font-bold">9. Dispute Resolution</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Any disputes between Consumers and Financial Advisors must be resolved independently.</li>
              <li>AdvisorWiz is not responsible for any agreements, disputes, or financial transactions between users.</li>
            </ul>
            
            <h2 className="mt-8 text-xl font-bold">10. Governing Law</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>These Terms & Conditions are governed by the laws of Canada.</li>
              <li>Any legal disputes shall be resolved in the courts of Ontario, Canada.</li>
            </ul>
            
            <h2 className="mt-8 text-xl font-bold">11. Changes to These Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We reserve the right to update these Terms & Conditions at any time.</li>
              <li>Continued use of the platform after changes means you accept the revised terms.</li>
            </ul>
            
            <h2 className="mt-8 text-xl font-bold">12. Contact Us</h2>
            <p>For any questions regarding these Terms & Conditions, please contact us at:</p>
            <ul className="list-none space-y-2 mt-2">
              <li className="flex items-center gap-2">
                <span className="text-lg">📩</span> support@advisorwiz.com
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">🌍</span> www.advisorwiz.com
              </li>
            </ul>
            
            <div className="mt-10 p-4 bg-slate-100 dark:bg-navy-800 rounded-lg">
              <p className="text-center font-medium">
                By using AdvisorWiz, you acknowledge and agree to these terms. Thank you for being part of our community!
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Terms;
