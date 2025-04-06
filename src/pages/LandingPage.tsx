
import React from 'react';
import { Link } from 'react-router-dom';
import { User, BarChart, Clock, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Helmet } from 'react-helmet';
import AppLayout from '../components/layout/AppLayout';
import FAQAccordion, { FAQItem } from '../components/shared/FAQAccordion';

const LandingPage: React.FC = () => {
  // FAQs data
  const faqs: FAQItem[] = [
    {
      question: "How does AdvisorWiz match me with a financial advisor?",
      answer: "AdvisorWiz uses a proprietary matching algorithm that considers your financial goals, preferences, and needs. We analyze our network of pre-vetted advisors based on their expertise, credentials, fee structures, and approach to find the best match for your specific situation.",
      relatedLinks: [
        { text: "Learn more about our matching process", url: "/for-consumers" },
        { text: "Start finding your advisor match", url: "/onboarding" }
      ]
    },
    {
      question: "Is there a fee to use AdvisorWiz as a consumer?",
      answer: "No, AdvisorWiz is completely free for consumers. Our service is funded by the financial advisors and firms who join our platform to connect with clients like you.",
    },
    {
      question: "How are the financial advisors vetted?",
      answer: "All advisors on our platform undergo a comprehensive verification process. We check their credentials, regulatory history, professional experience, and client reviews. We also conduct interviews to ensure they meet our standards for professionalism and expertise.",
    },
    {
      question: "What if I'm not satisfied with my advisor match?",
      answer: "If you're not completely satisfied with your advisor match, simply let us know and we'll work to find you a more suitable advisor. Your satisfaction is our priority, and we're committed to helping you find the right financial partner.",
    },
    {
      question: "What types of financial advisors are on AdvisorWiz?",
      answer: "AdvisorWiz features a diverse network of financial professionals including Certified Financial Planners (CFPs), Registered Investment Advisors (RIAs), wealth managers, retirement specialists, tax planners, and more. Whether you need comprehensive financial planning or specialized advice, we can match you with the right expert.",
    },
    {
      question: "How quickly can I expect to be matched with an advisor?",
      answer: "After completing our matching questionnaire, you'll typically receive advisor recommendations within 24-48 hours. You can then review their profiles and schedule initial consultations at your convenience."
    },
    {
      question: "How is my personal information protected?",
      answer: "We take data security seriously. All personal and financial information is encrypted using industry-standard protocols. We never share your information with third parties without your explicit consent.",
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "AdvisorWiz helped me find a financial advisor who truly understood my needs. The matching process was seamless and I've been working with my advisor for over a year now.",
      author: "Sarah Johnson",
      title: "Small Business Owner",
      company: "Bright Ideas LLC"
    },
    {
      quote: "As someone planning for retirement, I needed specialized advice. Through AdvisorWiz, I connected with an advisor who specializes in retirement planning, and the results have been exceptional.",
      author: "Michael Chen",
      title: "Pre-Retiree"
    },
    {
      quote: "The advisor matching service saved me hours of research. The advisor I was matched with has deep expertise in estate planning, exactly what I was looking for.",
      author: "Emily Rodriguez",
      title: "Healthcare Professional",
      company: "City General Hospital"
    }
  ];

  return (
    <AppLayout hideSocialProof={true} withoutPadding={true} hideFooter={false}>
      <Helmet>
        <title>AdvisorWiz - Connecting Financial Advisors with Clients</title>
        <meta 
          name="description" 
          content="AdvisorWiz connects consumers with trusted financial advisors through an innovative matching platform." 
        />
      </Helmet>
      
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-slate-50 via-white to-white dark:from-navy-950 dark:via-navy-900 dark:to-navy-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-navy-900 dark:text-white mb-6 leading-tight">
            Find the Perfect Financial Advisor for Your Needs
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Connect with qualified financial advisors who understand your unique financial 
            situation and help you achieve your goals.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              asChild
              variant="default" 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white py-6"
            >
              <Link to="/onboarding">Find Your Advisor</Link>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50 py-6 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-navy-800"
            >
              <Link to="/for-advisors">For Advisors</Link>
            </Button>
          </div>
          
          {/* Statistics Bar */}
          <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm p-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div className="text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Active Clients</p>
              <div className="flex items-center justify-center gap-2">
                <User className="h-5 w-5 text-teal-500" />
                <span className="text-2xl font-bold text-navy-900 dark:text-white">24,500+</span>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Successful Matches</p>
              <div className="flex items-center justify-center gap-2">
                <BarChart className="h-5 w-5 text-blue-500" />
                <span className="text-2xl font-bold text-navy-900 dark:text-white">18,300+</span>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Portfolio Growth</p>
              <div className="flex items-center justify-center gap-2">
                <BarChart className="h-5 w-5 text-purple-500" />
                <span className="text-2xl font-bold text-navy-900 dark:text-white">24% Avg</span>
              </div>
            </div>
          </div>
          
          {/* Social Share */}
          <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm p-6 max-w-2xl mx-auto mt-12">
            <p className="font-medium text-navy-900 dark:text-white mb-4">Share AdvisorWiz</p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Help others discover financial expertise</p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <span className="text-blue-600">Facebook</span>
              </Button>
              
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <span className="text-sky-500">Twitter</span>
              </Button>
              
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <span className="text-blue-700">LinkedIn</span>
              </Button>
              
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <span className="text-orange-500">Email</span>
              </Button>
            </div>
            
            <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
              Get the App
            </Button>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white dark:bg-navy-950">
        <div className="container mx-auto px-4 text-center">
          <p className="text-teal-600 dark:text-teal-400 font-medium mb-2">How It Works</p>
          <h2 className="text-3xl font-serif font-bold text-navy-900 dark:text-white mb-4">
            Simple Process for Everyone
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            AdvisorWiz makes financial connections simple, transparent, and tailored to each user's needs.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-50 dark:bg-navy-900 p-4 rounded-lg mb-4">
              <ul className="flex border-b">
                <li className="flex-1">
                  <button className="w-full py-2 px-4 bg-white dark:bg-navy-800 rounded-t-lg border-t border-r border-l border-slate-200 dark:border-navy-700 font-medium text-navy-900 dark:text-white">
                    Consumers
                  </button>
                </li>
                <li className="flex-1">
                  <button className="w-full py-2 px-4 text-slate-600 dark:text-slate-400">
                    Advisors
                  </button>
                </li>
                <li className="flex-1">
                  <button className="w-full py-2 px-4 text-slate-600 dark:text-slate-400">
                    Firms
                  </button>
                </li>
              </ul>
              
              <div className="p-6 bg-white dark:bg-navy-800 rounded-b-lg shadow-sm">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-slate-50 dark:bg-navy-700 rounded-full flex items-center justify-center mb-4">
                      <User className="h-8 w-8 text-teal-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-navy-900 dark:text-white mb-2">
                      Create Your Profile
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Tell us about your financial goals, preferences, and what you're looking for in an advisor.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-slate-50 dark:bg-navy-700 rounded-full flex items-center justify-center mb-4">
                      <BarChart className="h-8 w-8 text-teal-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-navy-900 dark:text-white mb-2">
                      Match with Advisors
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Browse and swipe through profiles of pre-vetted financial advisors who match your criteria.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-slate-50 dark:bg-navy-700 rounded-full flex items-center justify-center mb-4">
                      <Clock className="h-8 w-8 text-teal-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-navy-900 dark:text-white mb-2">
                      Connect & Consult
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Chat directly within the app and schedule a free consultation with your matched advisor.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Link 
              to="/for-consumers" 
              className="inline-flex items-center text-teal-600 dark:text-teal-400 hover:underline"
            >
              Learn more about the consumer journey
            </Link>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-slate-50 dark:bg-navy-900">
        <div className="container mx-auto px-4 text-center">
          <p className="text-teal-600 dark:text-teal-400 font-medium mb-2">Benefits</p>
          <h2 className="text-3xl font-serif font-bold text-navy-900 dark:text-white mb-4">
            Why Choose AdvisorWiz
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            Our platform provides unique advantages for consumers, financial advisors, and firms.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-navy-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-navy-900 dark:text-white mb-4">For Consumers</h3>
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                alt="Consumer using financial app" 
                className="w-full h-48 object-cover rounded-md mb-6"
              />
              <ul className="text-left space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Personalized matching based on your financial goals and preferences</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Transparent advisor profiles with verified credentials</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Direct communication with potential advisors</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Free initial consultations to ensure compatibility</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-navy-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-navy-900 dark:text-white mb-4">For Advisors</h3>
              <img 
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf" 
                alt="Financial advisor with client" 
                className="w-full h-48 object-cover rounded-md mb-6"
              />
              <ul className="text-left space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Connect with pre-qualified potential clients</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Showcase your expertise and credentials</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Display client testimonials and success stories</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Efficient client acquisition without cold calling</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-navy-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-navy-900 dark:text-white mb-4">For Financial Firms</h3>
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="Financial firm office" 
                className="w-full h-48 object-cover rounded-md mb-6"
              />
              <ul className="text-left space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Manage multiple advisor profiles under one organization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Streamline client acquisition for your entire team</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Maintain consistent branding across all advisors</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Track performance metrics for your firm</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mobile App Section */}
      <section className="py-16 bg-white dark:bg-navy-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-navy-900 dark:text-white mb-4">
              AdvisorWiz Mobile App
            </h2>
          </div>
          
          <div className="bg-slate-50 dark:bg-navy-900 rounded-lg shadow-md max-w-5xl mx-auto overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-2/5 bg-gradient-to-r from-teal-400 to-teal-500 p-8 flex items-center justify-center">
                <div className="relative w-full max-w-xs">
                  <img 
                    src="/lovable-uploads/4a2d5a00-86b8-4960-9c7b-bc5eeb5eb457.png" 
                    alt="AdvisorWiz Mobile App" 
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold text-navy-900 px-2 py-1 rounded-full">
                    NEW!
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-3/5 p-6 md:p-8">
                <div className="flex items-center mb-4">
                  <div className="h-8 w-8 bg-teal-500 rounded-md flex items-center justify-center mr-3">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 dark:text-white">AdvisorWiz Mobile App</h3>
                </div>
                
                <div className="mb-3">
                  <div className="flex text-amber-400 mb-1">
                    ★★★★★ <span className="text-slate-600 dark:text-slate-400 ml-2 text-sm">Available now on iOS & Android</span>
                  </div>
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Take financial advisory connections on the go with our feature-packed mobile app. Connect with advisors, manage appointments, and track your financial goals from anywhere.
                </p>
                
                <div className="border-b border-slate-200 dark:border-navy-700 mb-4">
                  <div className="flex mb-2">
                    <button className="mr-4 border-b-2 border-teal-500 pb-2 font-medium text-navy-900 dark:text-white">
                      Features
                    </button>
                    <button className="mr-4 text-slate-600 dark:text-slate-400 pb-2">
                      Benefits
                    </button>
                    <button className="text-slate-600 dark:text-slate-400 pb-2">
                      Reviews
                    </button>
                  </div>
                </div>
                
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center mr-2">
                      <CheckCircle className="h-3 w-3 text-teal-600 dark:text-teal-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 text-sm">Real-time advisor matching</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center mr-2">
                      <CheckCircle className="h-3 w-3 text-teal-600 dark:text-teal-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 text-sm">Secure in-app messaging</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center mr-2">
                      <CheckCircle className="h-3 w-3 text-teal-600 dark:text-teal-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 text-sm">Financial goal tracking dashboard</span>
                  </li>
                </ul>
                
                <div className="flex space-x-3">
                  <Button size="sm" variant="default" className="bg-black text-white hover:bg-gray-800">
                    App Store
                  </Button>
                  <Button size="sm" variant="default" className="bg-teal-500 hover:bg-teal-600 text-white">
                    Google Play
                  </Button>
                </div>
                
                <div className="mt-4">
                  <Link to="/mobile-app" className="text-sm text-teal-600 dark:text-teal-400 hover:underline">
                    Learn more about our mobile app →
                  </Link>
                </div>
                
                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-navy-700 pt-4">
                  <div className="text-center">
                    <h4 className="text-sm font-medium text-navy-900 dark:text-white mb-2">
                      Find Advisors Faster
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Our intelligent matching algorithm connects you with the perfect financial advisor in seconds.
                    </p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-sm font-medium text-navy-900 dark:text-white mb-2">
                      Track Your Progress
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      See financial goals and monitor your dashboard and alerts.
                    </p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-sm font-medium text-navy-900 dark:text-white mb-2">
                      Seamless Experience
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Switch between web and mobile with perfect platform synchronization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-slate-50 dark:bg-navy-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-navy-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            Hear from people who have found their perfect financial match.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-navy-800 p-6 rounded-lg shadow-sm">
                <div className="text-teal-500 text-5xl font-serif mb-4">"</div>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  {testimonial.quote}
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold mr-3">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-navy-900 dark:text-white">{testimonial.author}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {testimonial.title}
                      {testimonial.company && ` • ${testimonial.company}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-navy-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-navy-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            Get answers to common questions about how AdvisorWiz works for both consumers and financial advisors.
          </p>
          
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={faqs} defaultValue="item-0" />
            
            <div className="mt-8">
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Have more questions? We're here to help.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center px-4 py-2 border border-navy-600 text-navy-700 bg-white hover:bg-navy-50 rounded-md dark:bg-navy-800 dark:border-navy-600 dark:text-white dark:hover:bg-navy-700"
                >
                  Contact Us
                </Link>
                <Link 
                  to="/learn-more"
                  className="text-teal-600 dark:text-teal-400 hover:underline"
                >
                  Learn more about AdvisorWiz
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-16 bg-navy-800 dark:bg-navy-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-6">
            Ready to Find Your Financial Advisor?
          </h2>
          <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">
            Join thousands of consumers who have found their perfect financial match through AdvisorWiz.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-lg mx-auto mb-12">
            <div className="flex justify-center items-center gap-x-4">
              <div className="flex flex-col items-center">
                <div className="bg-navy-700 rounded-full p-3 mb-2">
                  <CheckCircle className="h-6 w-6 text-teal-400" />
                </div>
                <p className="text-sm">Expertly Matched</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-navy-700 rounded-full p-3 mb-2">
                  <CheckCircle className="h-6 w-6 text-teal-400" />
                </div>
                <p className="text-sm">Secure & Private</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-navy-700 rounded-full p-3 mb-2">
                  <CheckCircle className="h-6 w-6 text-teal-400" />
                </div>
                <p className="text-sm">Quick Setup</p>
              </div>
            </div>
          </div>
          
          <Button 
            asChild 
            size="lg" 
            className="bg-teal-600 hover:bg-teal-700 text-white py-6 px-8 text-lg"
          >
            <Link to="/onboarding">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </AppLayout>
  );
};

export default LandingPage;
