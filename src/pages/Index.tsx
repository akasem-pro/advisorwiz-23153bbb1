import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatedRoute } from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ArrowRight, CheckCircle, ShieldCheck, Clock, Users, BarChart, Building } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          {/* Hero Section */}
          <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-navy-50 to-teal-50 z-0"></div>
            <div className="container mx-auto relative z-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 md:space-y-8">
                  <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium animate-pulse-scale">
                    The Smart Way to Find Your Financial Advisor
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy-900 leading-tight">
                    Match with the Perfect Financial Advisor
                  </h1>
                  <p className="text-lg md:text-xl text-slate-700 max-w-xl">
                    AdvisorWiz connects you with experienced financial advisors who match your specific needs and preferences.
                  </p>
                  <div className="flex space-x-4">
                    <Link to="/onboarding" className="btn-primary inline-flex items-center">
                      Get Started
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                    <a href="#how-it-works" className="btn-outline inline-flex items-center">
                      Learn More
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" 
                    alt="Financial growth chart with upward trend" 
                    className="rounded-2xl shadow-2xl transform rotate-3 animate-slide-up"
                  />
                  <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-white shadow-lg rounded-xl p-4 -rotate-6 animate-pulse-scale">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-teal-600" />
                      </div>
                      <span className="font-medium text-navy-800">Perfect Match!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="container mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-teal-600 font-medium">How It Works</span>
                <h2 className="mt-2 text-3xl md:text-4xl font-serif font-bold text-navy-900">
                  Find Your Financial Advisor in 3 Simple Steps
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  AdvisorWiz makes finding the right financial advisor simple, transparent, and tailored to your needs.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                {[
                  {
                    icon: <Users className="w-10 h-10 text-teal-500" />,
                    title: "Create Your Profile",
                    description: "Tell us about your financial goals, preferences, and what you're looking for in an advisor."
                  },
                  {
                    icon: <BarChart className="w-10 h-10 text-teal-500" />,
                    title: "Match with Advisors",
                    description: "Browse and swipe through profiles of pre-vetted financial advisors who match your criteria."
                  },
                  {
                    icon: <Clock className="w-10 h-10 text-teal-500" />,
                    title: "Connect & Consult",
                    description: "Chat directly within the app and schedule a free consultation with your matched advisor."
                  }
                ].map((step, index) => (
                  <div key={index} className="glass-card rounded-xl p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-navy-50 flex items-center justify-center mb-5">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-navy-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-600">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Section with Images */}
          <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-navy-50">
            <div className="container mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-teal-600 font-medium">Benefits</span>
                <h2 className="mt-2 text-3xl md:text-4xl font-serif font-bold text-navy-900">
                  Why Choose AdvisorWiz
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  Our platform provides unique advantages for consumers, financial advisors, and firms.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1565514020179-026b5cfd231c" 
                      alt="Person planning for retirement with financial documents" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-serif font-semibold text-navy-900 mb-6">
                      For Consumers
                    </h3>
                    <ul className="space-y-4">
                      {[
                        "Personalized matching based on your financial goals and preferences",
                        "Transparent advisor profiles with verified credentials",
                        "Direct communication with potential advisors",
                        "Free initial consultations to ensure compatibility",
                        "Secure platform to share financial information",
                        "Rate and review your experience"
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-teal-500 mt-1 mr-3 flex-shrink-0" />
                          <span className="text-slate-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1543286386-713bdd548da4" 
                      alt="Financial advisor working with investment data" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-serif font-semibold text-navy-900 mb-6">
                      For Advisors
                    </h3>
                    <ul className="space-y-4">
                      {[
                        "Connect with pre-qualified potential clients",
                        "Showcase your expertise and credentials",
                        "Display client testimonials and success stories",
                        "Efficient client acquisition without cold calling",
                        "Manage appointments and communications in one place",
                        "Build your reputation through verified reviews"
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-navy-500 mt-1 mr-3 flex-shrink-0" />
                          <span className="text-slate-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1563986768609-322da13575f3" 
                      alt="Financial firm office with growth charts and investments" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-serif font-semibold text-navy-900 mb-6">
                      For Financial Firms
                    </h3>
                    <ul className="space-y-4">
                      {[
                        "Manage multiple advisor profiles under one organization",
                        "Streamline client acquisition for your entire team",
                        "Maintain consistent branding across all advisors",
                        "Track performance metrics for your firm",
                        "Centralized management and administration",
                        "Showcase your firm's unique value proposition"
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-purple-500 mt-1 mr-3 flex-shrink-0" />
                          <span className="text-slate-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing CTA Section */}
          <section className="py-12 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-serif font-bold text-navy-900 mb-4">
                  Simple, Transparent Pricing
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  Choose the plan that's right for your needs. Free for consumers, flexible options for advisors and firms.
                </p>
                <Link 
                  to="/pricing" 
                  className="inline-flex items-center bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
                >
                  View Pricing Plans
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy-800 to-navy-900 text-white">
            <div className="container mx-auto text-center max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                Ready to Find Your Financial Advisor?
              </h2>
              <p className="mt-4 text-lg text-slate-300 mb-8">
                Join thousands of consumers who have found their perfect financial match through AdvisorWiz.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/onboarding"
                  className="btn-accent inline-flex items-center justify-center"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link 
                  to="/pricing"
                  className="inline-flex items-center justify-center py-3 px-6 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default Index;
