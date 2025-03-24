import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Building, MapPin, Globe, Users, DollarSign } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { FinancialFirm } from '../types/firmTypes';
import AuthGuard from '../components/auth/AuthGuard';

const FirmProfile: React.FC = () => {
  const { firms, addFirm, userType } = useUser();
  const navigate = useNavigate();
  
  // For demo purposes, we'll assume the user is editing the first firm
  // In a real app, you would fetch the user's firm from the backend
  const existingFirm = firms && firms.length > 0 ? firms[0] : null;
  
  const [formData, setFormData] = useState<Partial<FinancialFirm>>({
    id: existingFirm?.id || '',
    name: existingFirm?.name || '',
    description: existingFirm?.description || '',
    website: existingFirm?.website || '',
    logo: existingFirm?.logo || '',
    city: existingFirm?.city || '',
    state: existingFirm?.state || '',
    country: existingFirm?.country || 'US',
    industry: existingFirm?.industry || '',
    size: existingFirm?.size || '',
    assetsUnderManagement: existingFirm?.assetsUnderManagement || 0,
    employeeCount: existingFirm?.employeeCount || 0
  });
  
  const [saved, setSaved] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleLogoChange = (url: string) => {
    setFormData(prev => ({
      ...prev,
      logo: url
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new firm entry with required fields
    addFirm({
      name: formData.name || 'My Firm',
      description: formData.description || '',
      website: formData.website || '',
      logo: formData.logo || '',
      city: formData.city || '',
      state: formData.state || '',
      country: formData.country || 'US',
      industry: formData.industry || '',
      size: formData.size || '',
      assetsUnderManagement: formData.assetsUnderManagement || 0,
      employeeCount: formData.employeeCount || 0,
      adminId: 'current-user-id',
      advisorIds: []
    });
    
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };
  
  const handleContinue = () => {
    navigate('/firm-dashboard');
  };
  
  return (
    <AuthGuard userTypes={['firm_admin']}>
      <AnimatedRoute animation="fade">
        <div className="min-h-screen flex flex-col">
          <Header />
          
          <main className="flex-grow pt-20">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
              <div className="glass-card rounded-2xl overflow-hidden shadow-lg">
                <div className="p-8">
                  <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-2">
                      Firm Profile
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                      Set up your firm's profile to help consumers find your advisors
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 border-b pb-2 mb-4">
                        <Building className="text-teal-600" />
                        <h2 className="text-xl font-serif font-semibold">Basic Information</h2>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-navy-800 mb-1">
                            Firm Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Enter your firm's name"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="website" className="block text-sm font-medium text-navy-800 mb-1">
                            Website
                          </label>
                          <input
                            type="url"
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="https://www.yourfirm.com"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label htmlFor="description" className="block text-sm font-medium text-navy-800 mb-1">
                            Firm Description
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="input-field"
                            rows={4}
                            placeholder="Describe your firm, its values, and services"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Location Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 border-b pb-2 mb-4">
                        <MapPin className="text-purple-600" />
                        <h2 className="text-xl font-serif font-semibold">Location</h2>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-navy-800 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Enter city"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-navy-800 mb-1">
                            State/Province
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Enter state"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-navy-800 mb-1">
                            Country
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="input-field"
                          >
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="AU">Australia</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    {/* Business Details Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 border-b pb-2 mb-4">
                        <DollarSign className="text-green-600" />
                        <h2 className="text-xl font-serif font-semibold">Business Details</h2>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="industry" className="block text-sm font-medium text-navy-800 mb-1">
                            Industry Focus
                          </label>
                          <input
                            type="text"
                            id="industry"
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="e.g., Retirement Planning, Wealth Management"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="size" className="block text-sm font-medium text-navy-800 mb-1">
                            Firm Size
                          </label>
                          <select
                            id="size"
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                            className="input-field"
                          >
                            <option value="">Select firm size</option>
                            <option value="Small">Small (1-10 employees)</option>
                            <option value="Medium">Medium (11-50 employees)</option>
                            <option value="Large">Large (51-200 employees)</option>
                            <option value="Enterprise">Enterprise (201+ employees)</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="assetsUnderManagement" className="block text-sm font-medium text-navy-800 mb-1">
                            Assets Under Management (AUM)
                          </label>
                          <input
                            type="number"
                            id="assetsUnderManagement"
                            name="assetsUnderManagement"
                            value={formData.assetsUnderManagement || ''}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Enter amount in USD"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="employeeCount" className="block text-sm font-medium text-navy-800 mb-1">
                            Number of Employees
                          </label>
                          <input
                            type="number"
                            id="employeeCount"
                            name="employeeCount"
                            value={formData.employeeCount || ''}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Enter number of employees"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Form Actions */}
                    <div className="flex justify-between pt-6 border-t border-slate-200">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleContinue}
                      >
                        Skip for Now
                      </Button>
                      
                      <Button 
                        type="submit" 
                        className="bg-teal-600 hover:bg-teal-700"
                      >
                        Save Profile
                      </Button>
                    </div>
                  </form>
                  
                  {saved && (
                    <div className="mt-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded text-center">
                      Firm profile saved successfully!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
          
          <Footer />
        </div>
      </AnimatedRoute>
    </AuthGuard>
  );
};

export default FirmProfile;
