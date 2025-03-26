
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';
import PageSEO from '../components/seo/PageSEO';

const Cookies: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Cookies Policy', url: '/cookies' }
  ];

  return (
    <AnimatedRoute animation="fade">
      <PageSEO
        title="Cookies Policy | AdvisorWiz"
        description="Learn about how AdvisorWiz uses cookies and similar technologies to improve your experience."
        keywords="cookies policy, cookie usage, tracking cookies, privacy"
        canonicalUrl="https://advisorwiz.com/cookies"
      />
      
      <Header />
      
      <BreadcrumbNav items={breadcrumbs} />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4 text-navy-900 dark:text-white">Cookies Policy</h1>
          <p className="text-slate-600 dark:text-slate-300">Learn how we use cookies on our platform</p>
        </div>
        
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-slate-200 dark:border-navy-700 p-6 md:p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-navy-900 dark:text-white">What Are Cookies</h2>
          <p className="mb-4 text-slate-700 dark:text-slate-300">
            Cookies are small text files that are placed on your device when you visit a website. They're widely used to make websites work more efficiently and provide information to the owners of the site.
          </p>
          <p className="mb-4 text-slate-700 dark:text-slate-300">
            Cookies help us enhance your experience, analyze site usage, and assist in our marketing efforts.
          </p>
        </div>
        
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-slate-200 dark:border-navy-700 p-6 md:p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-navy-900 dark:text-white">How We Use Cookies</h2>
          <p className="mb-4 text-slate-700 dark:text-slate-300">
            We use different types of cookies for various purposes:
          </p>
          <ul className="list-disc pl-6 mb-4 text-slate-700 dark:text-slate-300">
            <li className="mb-2">
              <strong>Essential cookies:</strong> These cookies are necessary for the website to function properly and cannot be disabled.
            </li>
            <li className="mb-2">
              <strong>Preferences cookies:</strong> These cookies allow us to remember your preferences and settings.
            </li>
            <li className="mb-2">
              <strong>Analytics cookies:</strong> These cookies help us understand how visitors interact with our website.
            </li>
            <li>
              <strong>Marketing cookies:</strong> These cookies track your online activity to help us deliver more relevant advertising.
            </li>
          </ul>
        </div>
        
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-slate-200 dark:border-navy-700 p-6 md:p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-navy-900 dark:text-white">Cookie Management</h2>
          <p className="mb-4 text-slate-700 dark:text-slate-300">
            You can manage your cookie preferences by adjusting your browser settings. Most browsers allow you to block or delete cookies.
          </p>
          <p className="mb-4 text-slate-700 dark:text-slate-300">
            Please note that restricting cookies may impact your experience on our website and limit some functionality.
          </p>
        </div>
        
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-slate-200 dark:border-navy-700 p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4 text-navy-900 dark:text-white">Related Policies</h2>
          <p className="mb-4 text-slate-700 dark:text-slate-300">
            For more information about how we handle your data, please visit:
          </p>
          <ul className="list-disc pl-6 mb-4 text-slate-700 dark:text-slate-300">
            <li className="mb-2">
              <Link to="/privacy" className="text-teal-600 dark:text-teal-400 hover:underline">Privacy Policy</Link>
            </li>
            <li className="mb-2">
              <Link to="/terms" className="text-teal-600 dark:text-teal-400 hover:underline">Terms of Service</Link>
            </li>
            <li>
              <Link to="/disclaimer" className="text-teal-600 dark:text-teal-400 hover:underline">Financial Disclaimer</Link>
            </li>
          </ul>
          <p className="text-slate-700 dark:text-slate-300">
            If you have any questions about our cookies policy, please <Link to="/contact" className="text-teal-600 dark:text-teal-400 hover:underline">contact us</Link>.
          </p>
        </div>
      </main>
      
      <Footer />
    </AnimatedRoute>
  );
};

export default Cookies;
