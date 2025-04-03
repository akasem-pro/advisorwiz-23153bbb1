
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';

const AboutUs: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' }
  ];

  return (
    <AppLayout>
      <BreadcrumbNav items={breadcrumbs} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-navy-900 dark:text-white mb-6 text-center">About AdvisorWiz</h1>
          
          <div className="bg-white dark:bg-navy-800 shadow-md rounded-lg overflow-hidden mb-12">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-navy-800 dark:text-white mb-4">Our Mission</h2>
              <p className="text-navy-700 dark:text-slate-300 mb-6">
                At AdvisorWiz, our mission is to transform how individuals connect with financial advisors. 
                We believe everyone deserves access to quality financial guidance that aligns with their 
                unique needs, goals, and circumstances.
              </p>
              
              <h2 className="text-2xl font-semibold text-navy-800 dark:text-white mb-4">Our Story</h2>
              <p className="text-navy-700 dark:text-slate-300 mb-6">
                Founded in 2021, AdvisorWiz emerged from a simple observation: finding the right financial 
                advisor is challenging and often intimidating for many people. Our founders, with backgrounds 
                in fintech and wealth management, recognized that traditional methods of connecting clients 
                with advisors were inefficient and frequently led to mismatches.
              </p>
              <p className="text-navy-700 dark:text-slate-300 mb-6">
                We created a platform that uses sophisticated algorithms and human-centered design to make 
                meaningful connections between clients and advisors. Our approach focuses on compatibility 
                across multiple dimensions – from investment philosophy and communication style to specialty 
                areas and fee structures.
              </p>
              
              <h2 className="text-2xl font-semibold text-navy-800 dark:text-white mb-4">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-50 dark:bg-navy-700 p-5 rounded-lg">
                  <h3 className="text-xl font-medium text-teal-600 dark:text-teal-400 mb-2">Transparency</h3>
                  <p className="text-navy-700 dark:text-slate-300">
                    We believe in clear, honest communication about advisor qualifications, fees, and services.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-navy-700 p-5 rounded-lg">
                  <h3 className="text-xl font-medium text-teal-600 dark:text-teal-400 mb-2">Client-Centered</h3>
                  <p className="text-navy-700 dark:text-slate-300">
                    Every feature we build prioritizes the needs and experience of the individuals seeking financial guidance.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-navy-700 p-5 rounded-lg">
                  <h3 className="text-xl font-medium text-teal-600 dark:text-teal-400 mb-2">Quality</h3>
                  <p className="text-navy-700 dark:text-slate-300">
                    We maintain high standards for advisors in our network, ensuring clients connect with true professionals.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-navy-700 p-5 rounded-lg">
                  <h3 className="text-xl font-medium text-teal-600 dark:text-teal-400 mb-2">Innovation</h3>
                  <p className="text-navy-700 dark:text-slate-300">
                    We continuously improve our matching algorithms and platform features based on user feedback and data.
                  </p>
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold text-navy-800 dark:text-white mb-4">Leadership Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-32 h-32 bg-slate-200 dark:bg-navy-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl text-navy-700 dark:text-slate-300">JD</span>
                  </div>
                  <h3 className="text-xl font-medium text-navy-800 dark:text-white">Jane Doe</h3>
                  <p className="text-navy-600 dark:text-slate-400">CEO & Co-Founder</p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-slate-200 dark:bg-navy-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl text-navy-700 dark:text-slate-300">JS</span>
                  </div>
                  <h3 className="text-xl font-medium text-navy-800 dark:text-white">John Smith</h3>
                  <p className="text-navy-600 dark:text-slate-400">CTO & Co-Founder</p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-slate-200 dark:bg-navy-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl text-navy-700 dark:text-slate-300">AR</span>
                  </div>
                  <h3 className="text-xl font-medium text-navy-800 dark:text-white">Amy Rodriguez</h3>
                  <p className="text-navy-600 dark:text-slate-400">Chief Experience Officer</p>
                </div>
              </div>
              
              <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg mb-6">
                <h2 className="text-2xl font-semibold text-navy-800 dark:text-white mb-3">Our Impact</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">50,000+</p>
                    <p className="text-navy-700 dark:text-slate-300">Successful Matches</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">1,200+</p>
                    <p className="text-navy-700 dark:text-slate-300">Verified Advisors</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">95%</p>
                    <p className="text-navy-700 dark:text-slate-300">Client Satisfaction</p>
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold text-navy-800 dark:text-white mb-4">Join Our Community</h2>
              <p className="text-navy-700 dark:text-slate-300 mb-6">
                Whether you're seeking financial guidance or you're a financial advisor looking to grow 
                your practice, AdvisorWiz offers a better way to make meaningful connections. 
                We're committed to continuous improvement and welcome your feedback as we build the 
                future of financial advisor matching.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <a 
                  href="/for-consumers" 
                  className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg text-center font-medium transition-colors"
                >
                  Find Your Advisor Match
                </a>
                <a 
                  href="/for-advisors" 
                  className="inline-block bg-white hover:bg-slate-100 text-navy-800 border border-navy-300 px-6 py-3 rounded-lg text-center font-medium transition-colors dark:bg-navy-700 dark:hover:bg-navy-600 dark:text-white dark:border-navy-600"
                >
                  Join as an Advisor
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AboutUs;
