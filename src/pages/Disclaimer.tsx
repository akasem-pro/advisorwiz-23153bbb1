
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';
import PageSEO from '../components/seo/PageSEO';

const Disclaimer: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Disclaimer', url: '/disclaimer' }
  ];

  return (
    <AnimatedRoute animation="fade">
      <PageSEO
        title="Financial Disclaimer | AdvisorWiz"
        description="Important financial disclaimer and limitations of services provided by AdvisorWiz."
        keywords="financial disclaimer, advisorwiz disclaimer, financial advice limitations"
        canonicalUrl="https://advisorwiz.com/disclaimer"
      />
      
      <Header />
      
      <BreadcrumbNav items={breadcrumbs} />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4 text-navy-900 dark:text-white">Financial Disclaimer</h1>
          <p className="text-slate-600 dark:text-slate-300">Important information about our services</p>
        </div>
        
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-slate-200 dark:border-navy-700 p-6 md:p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-navy-900 dark:text-white">Platform Disclaimer</h2>
          <p className="mb-4 text-slate-700 dark:text-slate-300">
            AdvisorWiz is a platform that connects consumers with financial advisors. We do not provide financial, investment, legal, or tax advice. Our service is limited to facilitating connections between consumers and qualified financial professionals.
          </p>
          <p className="mb-4 text-slate-700 dark:text-slate-300">
            Any information provided through our platform is for general informational and educational purposes only. It should not be considered as personalized financial advice or recommendations.
          </p>
        </div>
        
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-slate-200 dark:border-navy-700 p-6 md:p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-navy-900 dark:text-white">Advisor Relationships</h2>
          <p className="mb-4 text-slate-700 dark:text-slate-300">
            Financial advisors listed on our platform are independent professionals and are not employees of AdvisorWiz. We verify their credentials to the best of our ability, but we do not guarantee their services, advice, or performance.
          </p>
          <p className="mb-4 text-slate-700 dark:text-slate-300">
            Users are responsible for conducting their own due diligence before engaging with any financial advisor. We strongly recommend that users verify an advisor's registration, licensing, and compliance history before establishing a professional relationship.
          </p>
        </div>
        
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-slate-200 dark:border-navy-700 p-6 md:p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-navy-900 dark:text-white">Investment Risks</h2>
          <p className="mb-4 text-slate-700 dark:text-slate-300">
            All investments involve risk and the past performance of a security, or financial product does not guarantee future results or returns. Keep in mind that while diversification may help spread risk, it does not assure a profit or protect against loss in a down market.
          </p>
          <p className="mb-4 text-slate-700 dark:text-slate-300">
            There is always the potential of losing money when you invest in securities or other financial products. Investors should consider their investment objectives and risks carefully before investing.
          </p>
        </div>
        
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-slate-200 dark:border-navy-700 p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4 text-navy-900 dark:text-white">Additional Resources</h2>
          <p className="mb-4 text-slate-700 dark:text-slate-300">
            For more information about our services and policies, please visit:
          </p>
          <ul className="list-disc pl-6 mb-4 text-slate-700 dark:text-slate-300">
            <li className="mb-2">
              <Link to="/terms" className="text-teal-600 dark:text-teal-400 hover:underline">Terms of Service</Link>
            </li>
            <li className="mb-2">
              <Link to="/privacy" className="text-teal-600 dark:text-teal-400 hover:underline">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/cookies" className="text-teal-600 dark:text-teal-400 hover:underline">Cookies Policy</Link>
            </li>
          </ul>
          <p className="text-slate-700 dark:text-slate-300">
            If you have any questions about this disclaimer, please <Link to="/contact" className="text-teal-600 dark:text-teal-400 hover:underline">contact us</Link>.
          </p>
        </div>
      </main>
      
      <Footer />
    </AnimatedRoute>
  );
};

export default Disclaimer;
