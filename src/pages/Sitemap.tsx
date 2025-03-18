
import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import PageSEO from '../components/seo/PageSEO';
import { Button } from '../components/ui/button';

const Sitemap: React.FC = () => {
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
      title: 'Company',
      links: [
        { name: 'Blog', path: '/blog' },
        { name: 'Careers', path: '/careers' },
        { name: 'Resources', path: '/resources' },
        { name: 'About Us', path: '/for-consumers' },
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
    <AppLayout>
      <PageSEO
        title="Sitemap"
        description="Complete sitemap of AdvisorWiz - Find your way around our financial advisor matching platform."
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif font-semibold text-navy-900 mb-8">Sitemap</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {siteCategories.map((category, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-xl font-serif font-semibold text-navy-900 pb-2 border-b border-slate-200">
                {category.title}
              </h2>
              <ul className="space-y-3">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.path} 
                      className="text-slate-600 hover:text-teal-600 transition-colors"
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
          <p className="text-slate-600 mb-6">Can't find what you're looking for?</p>
          <Button asChild variant="default" className="bg-teal-600 hover:bg-teal-700">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Sitemap;
