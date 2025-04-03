
import React from 'react';
import AppLayout from '../components/layout/AppLayout';

const AboutUs: React.FC = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-navy-900 dark:text-slate-100 mb-8">About Us</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            AdvisorWiz is a revolutionary platform designed to connect consumers with financial advisors
            through our proprietary matching algorithm. Founded in 2023, our mission is to democratize
            access to quality financial advice for everyone, regardless of their wealth or background.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
          <p>
            We believe that everyone deserves access to quality financial guidance. Our platform makes
            it easy to find trusted advisors who match your specific needs and goals, eliminating the
            guesswork and uncertainty often associated with finding financial help.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Team</h2>
          <p>
            AdvisorWiz was founded by a team of fintech innovators and financial industry veterans
            who recognized the need for a better way to connect people with financial advice. Our diverse
            team combines expertise in finance, technology, data science, and user experience design.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Approach</h2>
          <p>
            We've developed a sophisticated matching system that considers over 50 different factors
            when pairing advisors with clients. This includes not just financial considerations, but
            also communication style, personality compatibility, and long-term goals alignment.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Commitment to Quality</h2>
          <p>
            Every advisor on our platform undergoes rigorous verification of their credentials,
            regulatory standing, and professional history. We continuously monitor advisor profiles
            and client feedback to ensure ongoing compliance with our high standards.
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default AboutUs;
