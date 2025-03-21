
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import PageSEO from '../components/seo/PageSEO';

const NotFound: React.FC = () => {
  return (
    <AnimatedRoute animation="fade">
      <PageSEO
        title="Page Not Found | AdvisorWiz"
        description="The page you're looking for doesn't exist or has been moved."
        noindex={true}
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow flex items-center justify-center">
          <div className="container max-w-4xl px-4 py-16 text-center">
            <h1 className="text-6xl font-bold text-teal-500 mb-6">404</h1>
            <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button size="lg">
                  Back to Home
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default NotFound;
