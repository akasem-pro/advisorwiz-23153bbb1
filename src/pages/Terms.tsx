
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Terms: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-slate-50">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-8">Terms and Conditions</h1>
          <p className="text-slate-500 mb-8">Last Updated: Feb 20th 2025</p>
          
          <div className="prose prose-slate max-w-none">
            <p className="mb-6">
              Welcome to AdvisorWiz! These Terms and Conditions outline the rules and regulations for using our platform. 
              By accessing or using AdvisorWiz, you agree to comply with these terms. If you do not agree with any part of these terms, 
              please do not use our services.
            </p>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-900 mt-10 mb-4">1. Definitions</h2>
            <ul className="pl-6 mb-6 space-y-2 list-none">
              <li>"Platform" refers to AdvisorWiz, including its website, services, and tools.</li>
              <li>"User" refers to any individual or entity using the platform, including consumers and financial advisors.</li>
              <li>"Consumer" refers to individuals seeking financial advice.</li>
              <li>"Financial Advisor" refers to professionals offering financial advisory services through our platform.</li>
              <li>"Services" refers to the features and functionalities provided by AdvisorWiz, including advisor matching, online appointments, and subscriptions.</li>
            </ul>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-900 mt-10 mb-4">2. Eligibility</h2>
            <ul className="pl-6 mb-6 space-y-2 list-none">
              <li>Users must be at least 18 years old to access our platform.</li>
              <li>Financial Advisors must be licensed, qualified, and compliant with applicable laws and regulations in their jurisdiction.</li>
              <li>AdvisorWiz reserves the right to verify credentials before approving any Financial Advisor's profile.</li>
            </ul>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-900 mt-10 mb-4">3. Services Provided</h2>
            <ul className="pl-6 mb-6 space-y-2 list-none">
              <li>AdvisorWiz acts as a connection platform between Consumers and Financial Advisors.</li>
              <li>We do not provide direct financial advice, investment services, or legal consultation.</li>
              <li>Consumers can book free or paid consultations through the platform, depending on the advisor's terms.</li>
            </ul>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-900 mt-10 mb-4">4. User Responsibilities</h2>
            <h3 className="text-xl font-serif font-semibold text-navy-800 mt-4 mb-2">4.1 For Consumers:</h3>
            <ul className="pl-6 mb-4 space-y-2 list-none">
              <li>Consumers acknowledge that any financial decisions made based on advisor recommendations are their sole responsibility.</li>
              <li>AdvisorWiz does not guarantee financial outcomes or investment success.</li>
            </ul>
            
            <h3 className="text-xl font-serif font-semibold text-navy-800 mt-4 mb-2">4.2 For Financial Advisors:</h3>
            <ul className="pl-6 mb-6 space-y-2 list-none">
              <li>Financial Advisors must provide accurate, truthful, and up-to-date information about their qualifications.</li>
              <li>Any advice given must be in compliance with legal and ethical standards set by industry regulators.</li>
              <li>AdvisorWiz is not liable for any disputes arising between Financial Advisors and Consumers.</li>
            </ul>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-900 mt-10 mb-4">5. Payments & Subscriptions (For Financial Advisors)</h2>
            <ul className="pl-6 mb-6 space-y-2 list-none">
              <li>Financial Advisors must subscribe to a paid membership plan to access leads and be listed on the platform.</li>
              <li>Subscription fees are non-refundable, except as required by law.</li>
              <li>AdvisorWiz reserves the right to modify pricing or cancel accounts if terms are violated.</li>
            </ul>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-900 mt-10 mb-4">6. Disclaimers & Limitations of Liability</h2>
            <ul className="pl-6 mb-6 space-y-2 list-none">
              <li><strong>No Guarantees:</strong> AdvisorWiz does not endorse, verify, or guarantee the services provided by Financial Advisors.</li>
              <li><strong>Platform Downtime:</strong> While we strive for 100% uptime, we do not guarantee uninterrupted access.</li>
              <li><strong>Liability Cap:</strong> AdvisorWiz shall not be liable for any indirect, incidental, or consequential damages arising from the use of our platform.</li>
            </ul>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-900 mt-10 mb-4">7. Privacy & Data Protection</h2>
            <ul className="pl-6 mb-6 space-y-2 list-none">
              <li>We collect and process user data in accordance with our Privacy Policy.</li>
              <li>We do not sell or share user data with third parties for marketing purposes.</li>
              <li>Users must ensure that any personal or financial data shared during consultations is done at their own discretion.</li>
            </ul>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-900 mt-10 mb-4">8. Account Termination</h2>
            <p className="mb-2">AdvisorWiz reserves the right to:</p>
            <ul className="pl-6 mb-6 space-y-2 list-none">
              <li>Suspend or terminate any account for violating these terms.</li>
              <li>Remove Financial Advisors who provide misleading information or violate professional ethics.</li>
            </ul>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-900 mt-10 mb-4">9. Dispute Resolution</h2>
            <ul className="pl-6 mb-6 space-y-2 list-none">
              <li>Any disputes between Consumers and Financial Advisors must be resolved independently.</li>
              <li>AdvisorWiz is not responsible for any agreements, disputes, or financial transactions between users.</li>
            </ul>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-900 mt-10 mb-4">10. Governing Law</h2>
            <ul className="pl-6 mb-6 space-y-2 list-none">
              <li>These Terms & Conditions are governed by the laws of Canada.</li>
              <li>Any legal disputes shall be resolved in the courts of Ontario, Canada.</li>
            </ul>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-900 mt-10 mb-4">11. Changes to These Terms</h2>
            <ul className="pl-6 mb-6 space-y-2 list-none">
              <li>We reserve the right to update these Terms & Conditions at any time.</li>
              <li>Continued use of the platform after changes means you accept the revised terms.</li>
            </ul>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-900 mt-10 mb-4">12. Contact Us</h2>
            <p className="mb-6">
              For any questions regarding these Terms & Conditions, please contact us at:
            </p>
            <ul className="list-none mb-6 space-y-2">
              <li>📩 <a href="mailto:support@advisorwiz.com" className="text-teal-600 hover:text-teal-800">support@advisorwiz.com</a></li>
              <li>🌍 <a href="https://www.advisorwiz.com" className="text-teal-600 hover:text-teal-800">www.advisorwiz.com</a></li>
            </ul>
            
            <p className="mt-8 mb-6 font-medium">
              By using AdvisorWiz, you acknowledge and agree to these terms. Thank you for being part of our community!
            </p>
          </div>
          
          <div className="mt-12 mb-8">
            <Link to="/" className="text-teal-600 hover:text-teal-800 font-medium">
              ← Return to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
