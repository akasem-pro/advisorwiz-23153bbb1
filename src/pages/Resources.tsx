
import React from 'react';
import { Link } from 'react-router-dom';
import PageSEO from '../components/seo/PageSEO';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Book, TrendingUp, Calculator, Shield, FileText } from 'lucide-react';

const Resources: React.FC = () => {
  return (
    <>
      <PageSEO
        title="Financial Resources & Tools"
        description="Access a wealth of financial education, investment insights, calculators, and regulatory information to help you make informed financial decisions."
      />
      
      <div className="container mx-auto px-4 py-12 space-y-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-navy-900 mb-4">Financial Resources</h1>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Access expert financial knowledge, tools, and insights to help you make informed decisions about your financial future.
          </p>
        </div>

        {/* Financial Education Section */}
        <section>
          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-slate-200"></div>
            <h2 className="flex-shrink mx-4 text-2xl md:text-3xl font-serif text-slate-500">Financial Education & Guides</h2>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Book className="w-6 h-6 text-teal-600 mr-3" />
                  <h3 className="text-xl font-semibold text-navy-900">Financial Planning 101</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Learn the fundamentals of financial planning, including budgeting, saving, and investment strategies. Get expert tips to manage your money wisely.
                </p>
                <Button variant="outline" className="rounded-full">
                  Find out more
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Book className="w-6 h-6 text-teal-600 mr-3" />
                  <h3 className="text-xl font-semibold text-navy-900">How to Choose a Financial Advisor</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Find the right financial advisor with our comprehensive guide. Understand credentials, fee structures, and key questions to ask before hiring.
                </p>
                <Button variant="outline" className="rounded-full">
                  Find out more
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Book className="w-6 h-6 text-teal-600 mr-3" />
                  <h3 className="text-xl font-semibold text-navy-900">Retirement Planning Resources</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Discover expert insights on RRSPs, TFSAs, pensions, and strategies for securing your financial future in retirement.
                </p>
                <Button variant="outline" className="rounded-full">
                  Find out more
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Book className="w-6 h-6 text-teal-600 mr-3" />
                  <h3 className="text-xl font-semibold text-navy-900">Tax-Free Savings Account (TFSA) Guide</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Learn everything about the Tax-Free Savings Account (TFSA), including contribution limits, tax benefits, and withdrawal rules. A must-read for Canadian investors.
                </p>
                <Button variant="outline" className="rounded-full">
                  Find out more
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Investment Insights Section */}
        <section>
          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-slate-200"></div>
            <h2 className="flex-shrink mx-4 text-2xl md:text-3xl font-serif text-slate-500">Investment & Market Insights</h2>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-6 h-6 text-teal-600 mr-3" />
                  <h3 className="text-xl font-semibold text-navy-900">Investment Strategies for Beginners & Experts</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Learn about stocks, ETFs, mutual funds, and alternative investments while understanding market trends. Get the latest investment strategies to grow your wealth.
                </p>
                <Button variant="outline" className="rounded-full">
                  Find out more
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-6 h-6 text-teal-600 mr-3" />
                  <h3 className="text-xl font-semibold text-navy-900">Understanding Market Trends</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Stay informed with real-time investment & market insights, economic forecasts, and expert financial analysis to guide your investment strategies and decisions.
                </p>
                <Button variant="outline" className="rounded-full">
                  Find out more
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Tools & Calculators Section */}
        <section>
          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-slate-200"></div>
            <h2 className="flex-shrink mx-4 text-2xl md:text-3xl font-serif text-slate-500">Tools & Financial Calculators</h2>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Calculator className="w-6 h-6 text-teal-600 mr-3" />
                  <h3 className="text-xl font-semibold text-navy-900">Risk Assessment Quiz</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Take risk assessment quiz to determine your investment risk tolerance and find the best strategy for your financial goals.
                </p>
                <Button variant="outline" className="rounded-full">
                  Take Quiz
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Calculator className="w-6 h-6 text-teal-600 mr-3" />
                  <h3 className="text-xl font-semibold text-navy-900">Financial Calculators</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Use financial calculators to estimate mortgage payments, retirement savings, and investment returns. Make smarter money decisions today.
                </p>
                <Button variant="outline" className="rounded-full">
                  Calculators
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Compliance & Regulations Section */}
        <section>
          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-slate-200"></div>
            <h2 className="flex-shrink mx-4 text-2xl md:text-3xl font-serif text-slate-500">Compliance & Regulations (For Canadian Users)</h2>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-teal-600 mr-3" />
                  <h3 className="text-xl font-semibold text-navy-900">Understanding Financial Advisor Regulations in Canada</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Learn about financial advisor compliance & regulations in Canada, including licensing requirements and how to verify advisor credentials.
                </p>
                <Button variant="outline" className="rounded-full">
                  Learn more
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <FileText className="w-6 h-6 text-teal-600 mr-3" />
                  <h3 className="text-xl font-semibold text-navy-900">Check Financial Advisor Credentials</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Verify and check financial advisor credentials in Canada through official regulatory organizations. Ensure your advisor is properly registered and compliant with industry standards.
                </p>
                <Button variant="outline" className="rounded-full">
                  Find out more
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-teal-600 mr-3" />
                  <h3 className="text-xl font-semibold text-navy-900">Trusted Canadian Financial Resources</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Explore trusted government and regulatory resources, including FCAC, CIRO, and CRA, to ensure safe financial decisions.
                </p>
                <Button variant="outline" className="rounded-full">
                  Find out more
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Call to Action */}
        <div className="bg-navy-50 p-8 rounded-lg text-center mt-12">
          <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">Need Personalized Financial Advice?</h2>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Our platform connects you with qualified financial advisors who can provide tailored guidance based on your unique financial situation.
          </p>
          <Button asChild className="bg-teal-600 hover:bg-teal-700">
            <Link to="/for-consumers">Find an Advisor</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Resources;
