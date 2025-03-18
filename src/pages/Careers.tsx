
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageSEO from '../components/seo/PageSEO';
import AnimatedRoute from '../components/ui/AnimatedRoute';

const Careers: React.FC = () => {
  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <PageSEO
          title="Careers at AdvisorWiz"
          description="Join our team at AdvisorWiz and help revolutionize how people connect with financial advisors. Explore our open positions and career opportunities."
          keywords="careers, jobs, financial technology, fintech careers, financial advisor platform, job opportunities"
        />
        
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-6">Join Our Team</h1>
              
              <div className="prose prose-slate max-w-none">
                <p className="text-xl text-slate-700 mb-8">
                  At AdvisorWiz, we're on a mission to transform how people find and connect with financial advisors. 
                  Join our talented team and be part of building technology that makes financial advice more accessible.
                </p>
                
                <h2 className="text-2xl font-serif font-semibold text-navy-800 mt-10 mb-4">Why Work With Us</h2>
                <ul className="space-y-3 mb-8">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                      <span className="text-teal-600 font-bold">✓</span>
                    </div>
                    <span className="text-slate-700">Make a real impact in the financial services industry</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                      <span className="text-teal-600 font-bold">✓</span>
                    </div>
                    <span className="text-slate-700">Collaborative, innovative, and supportive work environment</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                      <span className="text-teal-600 font-bold">✓</span>
                    </div>
                    <span className="text-slate-700">Competitive compensation and benefits</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                      <span className="text-teal-600 font-bold">✓</span>
                    </div>
                    <span className="text-slate-700">Remote-friendly with flexible work arrangements</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                      <span className="text-teal-600 font-bold">✓</span>
                    </div>
                    <span className="text-slate-700">Professional development opportunities</span>
                  </li>
                </ul>
                
                <h2 className="text-2xl font-serif font-semibold text-navy-800 mt-10 mb-6">Open Positions</h2>
                
                <div className="mb-10">
                  <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm mb-6 hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-navy-800 mb-2">Senior Frontend Developer</h3>
                      <p className="text-slate-500 mb-3">Remote • Full-time</p>
                      <p className="text-slate-700 mb-4">
                        We're looking for a talented frontend developer to help build and improve our user interfaces with React and TypeScript.
                      </p>
                      <a href="mailto:careers@advisorwiz.com" className="text-teal-600 font-medium hover:text-teal-700">
                        Apply Now →
                      </a>
                    </div>
                  </div>
                  
                  <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm mb-6 hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-navy-800 mb-2">Product Manager</h3>
                      <p className="text-slate-500 mb-3">Toronto, ON • Full-time</p>
                      <p className="text-slate-700 mb-4">
                        Join our product team to drive the vision and strategy for our advisor matching platform.
                      </p>
                      <a href="mailto:careers@advisorwiz.com" className="text-teal-600 font-medium hover:text-teal-700">
                        Apply Now →
                      </a>
                    </div>
                  </div>
                  
                  <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-navy-800 mb-2">Financial Content Writer</h3>
                      <p className="text-slate-500 mb-3">Remote • Part-time</p>
                      <p className="text-slate-700 mb-4">
                        Create engaging, informative financial content to help our users make better financial decisions.
                      </p>
                      <a href="mailto:careers@advisorwiz.com" className="text-teal-600 font-medium hover:text-teal-700">
                        Apply Now →
                      </a>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-serif font-semibold text-navy-800 mt-10 mb-4">Don't See a Fit?</h2>
                <p className="text-slate-700 mb-6">
                  We're always looking for talented individuals to join our team. If you don't see a position that matches your skills, 
                  but you're passionate about our mission, we'd still love to hear from you.
                </p>
                
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-10">
                  <h3 className="text-lg font-semibold text-navy-800 mb-3">Send us your resume</h3>
                  <p className="text-slate-700 mb-4">
                    Email your resume and a brief introduction to <a href="mailto:careers@advisorwiz.com" className="text-teal-600 hover:text-teal-700">careers@advisorwiz.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default Careers;
