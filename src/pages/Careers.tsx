
import React from 'react';
import PageSEO from '../components/seo/PageSEO';
import { Button } from '../components/ui/button';
import { generateBreadcrumbSchema } from '../utils/schemas';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';

const Careers: React.FC = () => {
  // Breadcrumbs for SEO
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' }
  ];

  const structuredData = [
    generateBreadcrumbSchema(breadcrumbs)
  ];

  return (
    <>
      <PageSEO
        title="Careers at AdvisorWiz | Join Our Financial Technology Team"
        description="Join our team at AdvisorWiz and help revolutionize how people connect with financial advisors. Explore our open positions and career opportunities."
        keywords="careers, jobs, financial technology, fintech careers, financial advisor platform, job opportunities"
        canonicalUrl="https://advisorwiz.com/careers"
        structuredData={structuredData}
      />
      
      <BreadcrumbNav items={breadcrumbs} />
      
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="section-header">
            <h1 className="section-title">Join Our Team</h1>
            <p className="section-description">
              At AdvisorWiz, we're on a mission to transform how people find and connect with financial advisors. 
              Join our talented team and be part of building technology that makes financial advice more accessible.
            </p>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-semibold text-navy-800 dark:text-slate-200 mt-10 mb-4">Why Work With Us</h2>
            <ul className="space-y-4 mb-8">
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">✓</span>
                </div>
                <span className="text-slate-700 dark:text-slate-300">Make a real impact in the financial services industry</span>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">✓</span>
                </div>
                <span className="text-slate-700 dark:text-slate-300">Collaborative, innovative, and supportive work environment</span>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">✓</span>
                </div>
                <span className="text-slate-700 dark:text-slate-300">Competitive compensation and benefits</span>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">✓</span>
                </div>
                <span className="text-slate-700 dark:text-slate-300">Remote-friendly with flexible work arrangements</span>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">✓</span>
                </div>
                <span className="text-slate-700 dark:text-slate-300">Professional development opportunities</span>
              </li>
            </ul>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-800 dark:text-slate-200 mt-10 mb-6">Open Positions</h2>
            
            <div className="mb-10 grid gap-6 md:grid-cols-2">
              <div className="professional-card">
                <h3 className="text-xl font-semibold text-navy-800 dark:text-slate-200 mb-2">Senior Frontend Developer</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-3">Remote • Full-time</p>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  We're looking for a talented frontend developer to help build and improve our user interfaces with React and TypeScript.
                </p>
                <Button variant="outline" asChild className="mt-2">
                  <a href="mailto:careers@advisorwiz.com">Apply Now</a>
                </Button>
              </div>
              
              <div className="professional-card">
                <h3 className="text-xl font-semibold text-navy-800 dark:text-slate-200 mb-2">Product Manager</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-3">Toronto, ON • Full-time</p>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Join our product team to drive the vision and strategy for our advisor matching platform.
                </p>
                <Button variant="outline" asChild className="mt-2">
                  <a href="mailto:careers@advisorwiz.com">Apply Now</a>
                </Button>
              </div>
              
              <div className="professional-card">
                <h3 className="text-xl font-semibold text-navy-800 dark:text-slate-200 mb-2">Financial Content Writer</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-3">Remote • Part-time</p>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Create engaging, informative financial content to help our users make better financial decisions.
                </p>
                <Button variant="outline" asChild className="mt-2">
                  <a href="mailto:careers@advisorwiz.com">Apply Now</a>
                </Button>
              </div>
              
              <div className="professional-card">
                <h3 className="text-xl font-semibold text-navy-800 dark:text-slate-200 mb-2">Data Analyst</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-3">Remote • Full-time</p>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Help us understand user behavior and optimize our matching algorithms with data-driven insights.
                </p>
                <Button variant="outline" asChild className="mt-2">
                  <a href="mailto:careers@advisorwiz.com">Apply Now</a>
                </Button>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-navy-800/50 border border-slate-200 dark:border-navy-700 rounded-lg p-6 mb-10">
              <h3 className="text-lg font-semibold text-navy-800 dark:text-slate-200 mb-3">Don't See a Fit?</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                We're always looking for talented individuals to join our team. If you don't see a position that matches your skills, 
                but you're passionate about our mission, we'd still love to hear from you.
              </p>
              <Button asChild className="bg-teal-600 hover:bg-teal-700">
                <a href="mailto:careers@advisorwiz.com">Send Us Your Resume</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Careers;
