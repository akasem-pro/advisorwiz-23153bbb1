
import React from 'react';
import { Link } from 'react-router-dom';
import PageSEO from '../components/seo/PageSEO';
import { Button } from '../components/ui/button';
import { generateBreadcrumbSchema } from '../utils/schemas';
import { LayoutGrid } from 'lucide-react';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';

const Sitemap: React.FC = () => {
  // Breadcrumbs for SEO
  const breadcrumbs = [
    { name: 'Home', url: 'https://advisorwiz.com/' },
    { name: 'Sitemap', url: 'https://advisorwiz.com/sitemap' }
  ];

  const structuredData = [
    generateBreadcrumbSchema(breadcrumbs)
  ];

  const siteCategories = [
    {
      title: 'Main Pages',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Advisors', path: '/for-advisors' },
        { name: 'Firms', path: '/for-firms' },
        { name: 'Consumers', path: '/for-consumers' },
        { name: 'Resources', path: '/resources' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Contact Us', path: '/contact' },
      ]
    },
    {
      title: 'User Features',
      links: [
        { name: 'Find an Advisor', path: '/for-consumers' },
        { name: 'Browse Matches', path: '/matches' },
        { name: 'Advisor Profile', path: '/advisor-profile' },
        { name: 'Consumer Profile', path: '/consumer-profile' },
        { name: 'Chat', path: '/chat' },
        { name: 'Schedule', path: '/schedule' },
      ]
    },
    {
      title: 'Advisor Resources',
      links: [
        { name: 'Join Network', path: '/for-advisors' },
        { name: 'Lead Management', path: '/leads' },
        { name: 'Firm Profile', path: '/firm-profile' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Financial Education', path: '/resources#financial-education' },
        { name: 'Investment Insights', path: '/resources#investment-insights' },
        { name: 'Tools & Calculators', path: '/resources#tools-calculators' },
        { name: 'Compliance & Regulations', path: '/resources#compliance-regulations' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'Blog', path: '/blog' },
        { name: 'Careers', path: '/careers' },
        { name: 'About Us', path: '/about' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Disclaimer', path: '/disclaimer' },
        { name: 'Cookies Policy', path: '/cookies' },
      ]
    },
  ];

  return (
    <>
      <PageSEO
        title="Complete Website Sitemap | AdvisorWiz"
        description="Navigate the AdvisorWiz financial advisor matching platform with our comprehensive sitemap. Find all sections and pages of our website organized for easy access."
        keywords="sitemap, advisorwiz navigation, financial advisor website map, advisor matching platform site guide"
        canonicalUrl="https://advisorwiz.com/sitemap"
        structuredData={structuredData}
      />
      
      <BreadcrumbNav items={breadcrumbs} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="section-header">
            <h1 className="section-title flex items-center justify-center gap-3">
              <LayoutGrid className="w-10 h-10 text-teal-600 dark:text-teal-400" />
              <span>Sitemap</span>
            </h1>
            <p className="section-description">
              Use this sitemap to navigate to any section of the AdvisorWiz platform. 
              We've organized all our pages by category to help you find what you're looking for.
            </p>
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {siteCategories.map((category, index) => (
            <div key={index} className="professional-card">
              <h2 className="text-xl font-serif font-semibold text-navy-900 dark:text-slate-100 pb-4 mb-4 border-b border-slate-200 dark:border-navy-700">
                {category.title}
              </h2>
              <ul className="space-y-3">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.path} 
                      className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-600 dark:text-slate-300 mb-6">Can't find what you're looking for?</p>
          <Button asChild variant="default" className="bg-teal-600 hover:bg-teal-700">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sitemap;
