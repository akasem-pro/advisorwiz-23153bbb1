import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';

const TermsContent: React.FC = () => {
  const isMobile = useIsMobile();
  
  // Apply mobile specific classes if on a mobile device
  const textClass = isMobile ? 'text-sm' : 'mb-6';
  const headingClass = isMobile ? 'text-lg font-semibold mt-6 mb-3' : 'text-xl font-semibold mt-8 mb-4';
  const subHeadingClass = isMobile ? 'text-base font-medium mt-4 mb-2' : 'text-lg font-medium mt-6 mb-3';
  const listClass = isMobile ? 'list-disc pl-5 mb-4' : 'list-disc pl-6 mb-6';

  return (
    <>
      <p className={textClass}>
        Welcome to AdvisorWiz! These Terms and Conditions outline the rules and regulations for using our platform. 
        By accessing or using AdvisorWiz, you agree to comply with these terms. If you do not agree with any part of these terms,
        please do not use our services.
      </p>

      <h2 className={headingClass}>1. Definitions</h2>
      <ul className={listClass}>
        <li>"Platform" refers to AdvisorWiz, including its website, services, and tools.</li>
        <li>"User" refers to any individual or entity using the platform, including consumers and financial advisors.</li>
        <li>"Consumer" refers to individuals seeking financial advice.</li>
        <li>"Financial Advisor" refers to professionals offering financial advisory services through our platform.</li>
        <li>"Services" refers to the features and functionalities provided by AdvisorWiz, including advisor matching, online appointments, and subscriptions.</li>
      </ul>

      <h2 className={headingClass}>2. Eligibility</h2>
      <ul className={listClass}>
        <li>Users must be at least 18 years old to access our platform.</li>
        <li>Financial Advisors must be licensed, qualified, and compliant with applicable laws and regulations in their jurisdiction.</li>
        <li>AdvisorWiz reserves the right to verify credentials before approving any Financial Advisor's profile.</li>
      </ul>

      <h2 className={headingClass}>3. Services Provided</h2>
      <ul className={listClass}>
        <li>AdvisorWiz acts as a connection platform between Consumers and Financial Advisors.</li>
        <li>We do not provide direct financial advice, investment services, or legal consultation.</li>
        <li>Consumers can book free or paid consultations through the platform, depending on the advisor's terms.</li>
      </ul>

      <h2 className={headingClass}>4. User Responsibilities</h2>
      <h3 className={subHeadingClass}>4.1 For Consumers:</h3>
      <ul className={listClass}>
        <li>Consumers acknowledge that any financial decisions made based on advisor recommendations are their sole responsibility.</li>
        <li>AdvisorWiz does not guarantee financial outcomes or investment success.</li>
      </ul>

      <h3 className={subHeadingClass}>4.2 For Financial Advisors:</h3>
      <ul className={listClass}>
        <li>Financial Advisors must provide accurate, truthful, and up-to-date information about their qualifications.</li>
        <li>Any advice given must be in compliance with legal and ethical standards set by industry regulators.</li>
        <li>AdvisorWiz is not liable for any disputes arising between Financial Advisors and Consumers.</li>
      </ul>

      <h2 className={headingClass}>5. Payments & Subscriptions (For Financial Advisors)</h2>
      <ul className={listClass}>
        <li>Financial Advisors must subscribe to a paid membership plan to access leads and be listed on the platform.</li>
        <li>Subscription fees are non-refundable, except as required by law.</li>
        <li>AdvisorWiz reserves the right to modify pricing or cancel accounts if terms are violated.</li>
      </ul>

      <h2 className={headingClass}>6. Disclaimers & Limitations of Liability</h2>
      <ul className={listClass}>
        <li><strong>No Guarantees:</strong> AdvisorWiz does not endorse, verify, or guarantee the services provided by Financial Advisors.</li>
        <li><strong>Platform Downtime:</strong> While we strive for 100% uptime, we do not guarantee uninterrupted access.</li>
        <li><strong>Liability Cap:</strong> AdvisorWiz shall not be liable for any indirect, incidental, or consequential damages arising from the use of our platform.</li>
      </ul>

      <h2 className={headingClass}>7. Privacy & Data Protection</h2>
      <ul className={listClass}>
        <li>We collect and process user data in accordance with our <a href="/privacy" className="text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300">Privacy Policy</a>.</li>
        <li>We do not sell or share user data with third parties for marketing purposes.</li>
        <li>Users must ensure that any personal or financial data shared during consultations is done at their own discretion.</li>
      </ul>

      <h2 className={headingClass}>8. Account Termination</h2>
      <p>AdvisorWiz reserves the right to:</p>
      <ul className={listClass}>
        <li>Suspend or terminate any account for violating these terms.</li>
        <li>Remove Financial Advisors who provide misleading information or violate professional ethics.</li>
      </ul>

      <h2 className={headingClass}>9. Dispute Resolution</h2>
      <ul className={listClass}>
        <li>Any disputes between Consumers and Financial Advisors must be resolved independently.</li>
        <li>AdvisorWiz is not responsible for any agreements, disputes, or financial transactions between users.</li>
      </ul>

      <h2 className={headingClass}>10. Governing Law</h2>
      <ul className={listClass}>
        <li>These Terms & Conditions are governed by the laws of Canada.</li>
        <li>Any legal disputes shall be resolved in the courts of Ontario, Canada.</li>
      </ul>

      <h2 className={headingClass}>11. Changes to These Terms</h2>
      <ul className={listClass}>
        <li>We reserve the right to update these Terms & Conditions at any time.</li>
        <li>Continued use of the platform after changes means you accept the revised terms.</li>
      </ul>

      <h2 className={headingClass}>12. Contact Us</h2>
      <p className="mb-6">For any questions regarding these Terms & Conditions, please contact us at:</p>
      <p className="flex items-center mb-2">
        <span className="mr-2">📩</span> 
        <a href="mailto:support@advisorwiz.com" className="text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300">
          support@advisorwiz.com
        </a>
      </p>
      <p className="flex items-center mb-6">
        <span className="mr-2">🌍</span> 
        <a href="https://www.advisorwiz.com" className="text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300">
          www.advisorwiz.com
        </a>
      </p>
      <p className="mt-8 text-center font-medium">
        By using AdvisorWiz, you acknowledge and agree to these terms. Thank you for being part of our community!
      </p>
    </>
  );
};

export default TermsContent;
