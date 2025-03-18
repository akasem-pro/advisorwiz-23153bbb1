
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Lock, 
  HelpCircle, 
  Trash2,
  Check,
  AlertCircle
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import PageSEO from '../components/seo/PageSEO';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const Settings: React.FC = () => {
  const { userType, isAuthenticated } = useUser();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [notificationsEnabled, setNotificationsEnabled] = useState({
    email: true,
    app: true,
    marketing: false
  });
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  if (!isAuthenticated) {
    navigate('/sign-in');
    return null;
  }
  
  const handleNotificationChange = (type: 'email' | 'app' | 'marketing') => {
    setNotificationsEnabled(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally involve a call to update the password
    // For demo purposes, we'll just simulate success
    setPasswordUpdated(true);
    setTimeout(() => setPasswordUpdated(false), 3000);
  };
  
  const handleDeleteAccount = () => {
    // For demo purposes, display a confirmation but don't actually delete
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('In a real application, your account would be deleted or scheduled for deletion.');
    }
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-navy-900">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value={userType === 'consumer' ? 'John Doe' : userType === 'advisor' ? 'Sarah Johnson' : 'Acme Financial Services'} />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" value={userType === 'consumer' ? 'john.doe@example.com' : userType === 'advisor' ? 'sarah@example.com' : 'admin@acmefinancial.com'} />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value="+1 (555) 123-4567" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" value="New York, NY" />
              </div>
            </div>
            
            <div className="pt-4">
              <Button className="mr-2">Update Profile</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-navy-900">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-navy-800">Email Notifications</h3>
                  <p className="text-sm text-slate-500">Receive emails for important updates</p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input 
                    type="checkbox"
                    className="opacity-0 w-0 h-0"
                    checked={notificationsEnabled.email}
                    onChange={() => handleNotificationChange('email')}
                    id="email-toggle"
                  />
                  <label 
                    htmlFor="email-toggle"
                    className={`absolute top-0 left-0 right-0 bottom-0 rounded-full cursor-pointer transition-all duration-300 ${notificationsEnabled.email ? 'bg-teal-600' : 'bg-slate-300'}`}
                  >
                    <span 
                      className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-all duration-300 ${notificationsEnabled.email ? 'transform translate-x-6' : ''}`}
                    ></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-navy-800">App Notifications</h3>
                  <p className="text-sm text-slate-500">Receive in-app notifications</p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input 
                    type="checkbox"
                    className="opacity-0 w-0 h-0"
                    checked={notificationsEnabled.app}
                    onChange={() => handleNotificationChange('app')}
                    id="app-toggle"
                  />
                  <label 
                    htmlFor="app-toggle"
                    className={`absolute top-0 left-0 right-0 bottom-0 rounded-full cursor-pointer transition-all duration-300 ${notificationsEnabled.app ? 'bg-teal-600' : 'bg-slate-300'}`}
                  >
                    <span 
                      className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-all duration-300 ${notificationsEnabled.app ? 'transform translate-x-6' : ''}`}
                    ></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-navy-800">Marketing Emails</h3>
                  <p className="text-sm text-slate-500">Receive tips, offers, and updates</p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input 
                    type="checkbox"
                    className="opacity-0 w-0 h-0"
                    checked={notificationsEnabled.marketing}
                    onChange={() => handleNotificationChange('marketing')}
                    id="marketing-toggle"
                  />
                  <label 
                    htmlFor="marketing-toggle"
                    className={`absolute top-0 left-0 right-0 bottom-0 rounded-full cursor-pointer transition-all duration-300 ${notificationsEnabled.marketing ? 'bg-teal-600' : 'bg-slate-300'}`}
                  >
                    <span 
                      className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-all duration-300 ${notificationsEnabled.marketing ? 'transform translate-x-6' : ''}`}
                    ></span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button>Save Preferences</Button>
            </div>
          </div>
        );
        
      case 'security':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-navy-900">Security Settings</h2>
            
            {/* Password Update */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h3 className="font-medium text-navy-800 mb-4">Update Password</h3>
              
              {passwordUpdated && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-800">
                  <Check className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="text-sm">Password updated successfully!</span>
                </div>
              )}
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-800">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button type="submit">Update Password</Button>
              </form>
            </div>
            
            {/* Two-Factor Authentication */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-navy-800">Two-Factor Authentication</h3>
                  <p className="text-sm text-slate-500">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </div>
            
            {/* Session Management */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h3 className="font-medium text-navy-800 mb-2">Active Sessions</h3>
              <p className="text-sm text-slate-500 mb-4">You're currently logged in on these devices</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-navy-800">Chrome on Windows</p>
                    <p className="text-xs text-slate-500">Last active: Just now</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Current</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-navy-800">Safari on iPhone</p>
                    <p className="text-xs text-slate-500">Last active: Yesterday</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800 hover:bg-red-50">
                    Sign Out
                  </Button>
                </div>
              </div>
              
              <Button variant="outline" className="mt-4">Sign Out All Devices</Button>
            </div>
          </div>
        );
        
      case 'billing':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-navy-900">Billing Information</h2>
            
            {/* Current Plan */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h3 className="font-medium text-navy-800 mb-2">Current Plan</h3>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-semibold text-navy-900">
                    {userType === 'consumer' ? 'Basic Plan (Free)' : userType === 'advisor' ? 'Professional Plan' : 'Enterprise Plan'}
                  </p>
                  <p className="text-sm text-slate-500">
                    {userType === 'consumer' 
                      ? 'Limited features for individual users' 
                      : userType === 'advisor' 
                        ? '$29/month, billed monthly' 
                        : '$199/month, billed monthly'}
                  </p>
                </div>
                {userType !== 'consumer' && (
                  <Button variant="outline" onClick={() => navigate('/pricing')}>
                    Upgrade Plan
                  </Button>
                )}
              </div>
              
              {userType !== 'consumer' && (
                <div className="text-sm text-slate-500">
                  <p>Next billing date: October 15, 2023</p>
                </div>
              )}
            </div>
            
            {/* Payment Methods */}
            {userType !== 'consumer' && (
              <div className="border border-slate-200 rounded-lg p-4">
                <h3 className="font-medium text-navy-800 mb-4">Payment Methods</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-16 bg-slate-200 rounded flex items-center justify-center mr-3">
                        <span className="text-xs text-slate-700">VISA</span>
                      </div>
                      <div>
                        <p className="font-medium text-navy-800">Visa ending in 4242</p>
                        <p className="text-xs text-slate-500">Expires 05/25</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">Default</span>
                  </div>
                </div>
                
                <Button variant="outline">Add Payment Method</Button>
              </div>
            )}
            
            {/* Billing History */}
            {userType !== 'consumer' && (
              <div className="border border-slate-200 rounded-lg p-4">
                <h3 className="font-medium text-navy-800 mb-4">Billing History</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Invoice
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          Sep 15, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          {userType === 'advisor' ? '$29.00' : '$199.00'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Paid
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-600">
                          <button className="hover:underline">Download</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          Aug 15, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          {userType === 'advisor' ? '$29.00' : '$199.00'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Paid
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-600">
                          <button className="hover:underline">Download</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'help':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-navy-900">Help & Support</h2>
            
            {/* FAQs */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h3 className="font-medium text-navy-800 mb-4">Frequently Asked Questions</h3>
              
              <div className="space-y-3">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-3 bg-slate-50 rounded-lg">
                    <span>How do I update my profile information?</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p className="text-slate-600 mt-3 mb-2 px-4">
                    You can update your profile information in the "Profile" tab of the settings page. Click "Update Profile" after making your changes.
                  </p>
                </details>
                
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-3 bg-slate-50 rounded-lg">
                    <span>How do I change my password?</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p className="text-slate-600 mt-3 mb-2 px-4">
                    You can change your password in the "Security" tab. You'll need to enter your current password and your new password twice.
                  </p>
                </details>
                
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-3 bg-slate-50 rounded-lg">
                    <span>How do I cancel my subscription?</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p className="text-slate-600 mt-3 mb-2 px-4">
                    You can cancel your subscription in the "Billing" tab. Click on "Cancel Subscription" and follow the prompts. Your subscription will remain active until the end of your current billing period.
                  </p>
                </details>
              </div>
            </div>
            
            {/* Contact Support */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h3 className="font-medium text-navy-800 mb-4">Contact Support</h3>
              
              <form className="space-y-4">
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What can we help you with?" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea 
                    id="message"
                    className="flex h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Please describe your issue in detail..."
                  ></textarea>
                </div>
                <Button>Submit Support Request</Button>
              </form>
              
              <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">
                  <strong>Need immediate assistance?</strong><br />
                  Contact us at <a href="mailto:support@advisorwiz.com" className="text-teal-600 hover:underline">support@advisorwiz.com</a> or call <a href="tel:+18005551234" className="text-teal-600 hover:underline">1-800-555-1234</a>.
                </p>
              </div>
            </div>
          </div>
        );
        
      case 'account':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-navy-900">Account Settings</h2>
            
            {/* Language Preferences */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h3 className="font-medium text-navy-800 mb-4">Language Preferences</h3>
              
              <div className="mb-4">
                <Label htmlFor="language">Preferred Language</Label>
                <select
                  id="language"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="en">English (US)</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
              
              <Button>Save Preferences</Button>
            </div>
            
            {/* Privacy Settings */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h3 className="font-medium text-navy-800 mb-4">Privacy Settings</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-navy-800">Profile Visibility</p>
                    <p className="text-sm text-slate-500">Control who can see your profile</p>
                  </div>
                  <select
                    className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                  >
                    <option value="public">Public</option>
                    <option value="contacts">Contacts Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-navy-800">Data Usage</p>
                    <p className="text-sm text-slate-500">Allow us to use your data to improve services</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                    <input 
                      type="checkbox"
                      className="opacity-0 w-0 h-0"
                      checked={true}
                      id="data-usage-toggle"
                    />
                    <label 
                      htmlFor="data-usage-toggle"
                      className="absolute top-0 left-0 right-0 bottom-0 rounded-full cursor-pointer transition-all duration-300 bg-teal-600"
                    >
                      <span 
                        className="absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-all duration-300 transform translate-x-6"
                      ></span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Button>Save Privacy Settings</Button>
              </div>
            </div>
            
            {/* Delete Account */}
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <h3 className="font-medium text-red-800 mb-2">Delete Account</h3>
              <p className="text-sm text-red-700 mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button 
                variant="destructive" 
                onClick={handleDeleteAccount}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <>
      <PageSEO 
        title="Account Settings | AdvisorWiz"
        description="Manage your AdvisorWiz account settings, privacy preferences, and security options."
        canonicalUrl="https://advisorwiz.com/settings"
      />
      
      <DashboardLayout 
        title="Account Settings" 
        subtitle="Manage your profile, preferences, and account settings"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="p-4 col-span-1">
            <nav className="space-y-1">
              <button
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'profile' 
                    ? 'bg-teal-50 text-teal-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                <User className={`mr-3 h-5 w-5 ${
                  activeTab === 'profile' ? 'text-teal-500' : 'text-slate-400'
                }`} />
                Profile
              </button>
              
              <button
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'notifications' 
                    ? 'bg-teal-50 text-teal-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell className={`mr-3 h-5 w-5 ${
                  activeTab === 'notifications' ? 'text-teal-500' : 'text-slate-400'
                }`} />
                Notifications
              </button>
              
              <button
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'security' 
                    ? 'bg-teal-50 text-teal-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
                onClick={() => setActiveTab('security')}
              >
                <Shield className={`mr-3 h-5 w-5 ${
                  activeTab === 'security' ? 'text-teal-500' : 'text-slate-400'
                }`} />
                Security
              </button>
              
              <button
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'billing' 
                    ? 'bg-teal-50 text-teal-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
                onClick={() => setActiveTab('billing')}
              >
                <CreditCard className={`mr-3 h-5 w-5 ${
                  activeTab === 'billing' ? 'text-teal-500' : 'text-slate-400'
                }`} />
                Billing
              </button>
              
              <button
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'help' 
                    ? 'bg-teal-50 text-teal-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
                onClick={() => setActiveTab('help')}
              >
                <HelpCircle className={`mr-3 h-5 w-5 ${
                  activeTab === 'help' ? 'text-teal-500' : 'text-slate-400'
                }`} />
                Help & Support
              </button>
              
              <button
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'account' 
                    ? 'bg-teal-50 text-teal-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
                onClick={() => setActiveTab('account')}
              >
                <Lock className={`mr-3 h-5 w-5 ${
                  activeTab === 'account' ? 'text-teal-500' : 'text-slate-400'
                }`} />
                Account
              </button>
            </nav>
          </Card>
          
          {/* Content */}
          <Card className="p-6 col-span-1 md:col-span-3">
            {renderTabContent()}
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Settings;
