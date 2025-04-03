
import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Shield, ShieldAlert, ShieldCheck, RefreshCw, ExternalLink, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const SecurityDashboard: React.FC = () => {
  // Mock security checks
  const [isChecking, setIsChecking] = React.useState(false);
  const [securityStatus, setSecurityStatus] = React.useState<{
    overall: 'good' | 'warning' | 'critical';
    lastChecked: Date | null;
    vulnerabilities: {
      severity: 'low' | 'medium' | 'high';
      component: string;
      description: string;
      recommendation: string;
    }[];
  }>({
    overall: 'good',
    lastChecked: null,
    vulnerabilities: []
  });

  const runSecurityCheck = async () => {
    setIsChecking(true);
    toast.info('Running security checks...');

    // Simulate security check
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock security scan results - in a real app, this would call an actual security service
    const mockVulnerabilities = [
      {
        severity: 'low' as const,
        component: 'API Endpoints',
        description: 'Some API endpoints are missing rate limiting',
        recommendation: 'Implement rate limiting on all public API endpoints'
      },
      {
        severity: 'medium' as const,
        component: 'Session Handling',
        description: 'Session timeout not properly enforced',
        recommendation: 'Configure session expiration and idle timeout'
      }
    ];

    // Fixed the comparison by correctly checking if any vulnerability has 'high' severity
    setSecurityStatus({
      overall: mockVulnerabilities.some(v => v.severity === 'high') ? 'critical' : 
               mockVulnerabilities.some(v => v.severity === 'medium') ? 'warning' : 'good',
      lastChecked: new Date(),
      vulnerabilities: mockVulnerabilities
    });

    setIsChecking(false);
    toast.success('Security check completed');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Security Dashboard</h2>
          {securityStatus.lastChecked && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last checked: {securityStatus.lastChecked.toLocaleString()}
            </p>
          )}
        </div>
        <Button 
          onClick={runSecurityCheck} 
          disabled={isChecking}
          className="flex items-center mt-4 md:mt-0"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
          {isChecking ? 'Running Checks...' : 'Run Security Checks'}
        </Button>
      </div>

      {/* Security Status Card */}
      <Card className={`mb-6 border-l-4 ${
        securityStatus.overall === 'good' ? 'border-l-green-500' : 
        securityStatus.overall === 'warning' ? 'border-l-yellow-500' : 'border-l-red-500'
      } p-6`}>
        <div className="flex items-center">
          {securityStatus.overall === 'good' ? (
            <ShieldCheck className="h-8 w-8 text-green-500 mr-4" />
          ) : securityStatus.overall === 'warning' ? (
            <AlertTriangle className="h-8 w-8 text-yellow-500 mr-4" />
          ) : (
            <ShieldAlert className="h-8 w-8 text-red-500 mr-4" />
          )}
          <div>
            <h3 className="text-lg font-semibold">
              {securityStatus.overall === 'good' ? 'Security Status: Good' : 
               securityStatus.overall === 'warning' ? 'Security Status: Needs Attention' : 
               'Security Status: Critical Issues'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {securityStatus.overall === 'good' ? 
                'No major security issues detected.' : 
                `${securityStatus.vulnerabilities.length} issues found that require attention.`}
            </p>
          </div>
        </div>
      </Card>

      {/* Environment Security */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Environment Security</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center mb-2">
              <Shield className="h-5 w-5 text-blue-500 mr-2" />
              <h4 className="font-medium">Authentication</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Using Supabase authentication with proper session handling.
            </p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center mb-2">
              <Shield className="h-5 w-5 text-blue-500 mr-2" />
              <h4 className="font-medium">API Security</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Row-level security (RLS) policies protecting database resources.
            </p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center mb-2">
              <Shield className="h-5 w-5 text-blue-500 mr-2" />
              <h4 className="font-medium">Data Protection</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Using secure environment variables for sensitive configuration.
            </p>
          </Card>
        </div>
      </div>

      {/* Vulnerabilities */}
      {securityStatus.vulnerabilities.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Detected Issues</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Severity</th>
                  <th className="px-4 py-2 text-left">Component</th>
                  <th className="px-4 py-2 text-left">Issue</th>
                  <th className="px-4 py-2 text-left">Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {securityStatus.vulnerabilities.map((issue, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        issue.severity === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 
                        issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {issue.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3">{issue.component}</td>
                    <td className="px-4 py-3">{issue.description}</td>
                    <td className="px-4 py-3">{issue.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Security Best Practices */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Security Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">Authentication & Authorization</h4>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>Enable multi-factor authentication</li>
              <li>Implement proper role-based access control</li>
              <li>Set secure password policies</li>
              <li>Use HttpOnly cookies for session tokens</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">API Security</h4>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>Validate and sanitize all input data</li>
              <li>Implement rate limiting and throttling</li>
              <li>Use HTTPS for all communications</li>
              <li>Set proper CORS policies</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">Data Protection</h4>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>Encrypt sensitive data at rest and in transit</li>
              <li>Implement proper data backup procedures</li>
              <li>Apply the principle of least privilege</li>
              <li>Regularly audit data access logs</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">Development Practices</h4>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>Keep dependencies updated</li>
              <li>Perform regular security code reviews</li>
              <li>Run automated security scans</li>
              <li>Follow secure coding guidelines</li>
            </ul>
          </div>
        </div>
      </div>

      {/* External Resources */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Security Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a 
            href="https://owasp.org/www-project-top-ten/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center"
          >
            <div>
              <div className="flex items-center">
                <h4 className="font-medium">OWASP Top 10</h4>
                <ExternalLink className="h-3 w-3 ml-1" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Security risks and prevention strategies
              </p>
            </div>
          </a>
          <a 
            href="https://cheatsheetseries.owasp.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center"
          >
            <div>
              <div className="flex items-center">
                <h4 className="font-medium">OWASP Cheat Sheets</h4>
                <ExternalLink className="h-3 w-3 ml-1" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Implementation guidelines for security
              </p>
            </div>
          </a>
          <a 
            href="https://supabase.com/docs/guides/auth/row-level-security" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center"
          >
            <div>
              <div className="flex items-center">
                <h4 className="font-medium">Supabase RLS Guide</h4>
                <ExternalLink className="h-3 w-3 ml-1" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Row-Level Security implementation
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;
