
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import SecurityDashboard from '../components/admin/SecurityDashboard';
import AccessibilityAuditDashboard from '../components/admin/AccessibilityAuditDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Shield, Accessibility } from 'lucide-react';

const SecurityAndAccessibilityPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Security & Accessibility</h1>
        
        <Tabs defaultValue="security" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="security" className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="flex items-center">
              <Accessibility className="mr-2 h-4 w-4" />
              Accessibility
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="security" className="space-y-8">
            <SecurityDashboard />
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Security Recommendations</h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold">Regular Security Audits</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Schedule regular security audits to identify potential vulnerabilities.
                    Consider using automated tools like OWASP ZAP or Burp Suite for web application scanning.
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold">Update Dependencies</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Regularly update dependencies to patch security vulnerabilities.
                    Use tools like npm audit or Dependabot to automate this process.
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold">Security Headers</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Implement security headers like Content-Security-Policy, X-XSS-Protection, and
                    X-Content-Type-Options to protect against common web vulnerabilities.
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold">Implement CSRF Protection</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Ensure all forms and API endpoints are protected against Cross-Site Request Forgery (CSRF)
                    attacks by implementing anti-CSRF tokens.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="accessibility" className="space-y-8">
            <AccessibilityAuditDashboard />
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Accessibility Recommendations</h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold">Regular Accessibility Testing</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Include accessibility testing in your CI/CD pipeline using tools like Axe, Lighthouse,
                    or Wave to identify issues early in development.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold">Screen Reader Testing</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Test your application with screen readers like NVDA, VoiceOver, or JAWS to ensure
                    it's usable for visually impaired users.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold">Keyboard Navigation</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Ensure all interactive elements are keyboard accessible and have visible focus states.
                    Test navigation using only the keyboard.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold">Color Contrast</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Use tools like the WebAIM Contrast Checker to ensure text has sufficient contrast
                    against its background (4.5:1 for normal text, 3:1 for large text).
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SecurityAndAccessibilityPage;
