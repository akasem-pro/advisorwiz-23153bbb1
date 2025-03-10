
import React, { useState, useEffect } from 'react';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useUser, FinancialFirm, AdvisorProfile } from '../context/UserContext';
import { Save, CheckCircle, Plus, Trash2, Users, Building, Globe, Pencil, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import ProfilePictureUpload from '../components/profile/ProfilePictureUpload';
import AdvisorProfileManager from '../components/firm/AdvisorProfileManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '../components/ui/use-toast';

const FirmProfile: React.FC = () => {
  const { userType, isAuthenticated, advisorProfile, firms, addFirm, getFirmByAdmin } = useUser();
  const navigate = useNavigate();
  const { id: firmId } = useParams<{ id: string }>();
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated || userType !== 'firm_admin') {
      navigate('/');
    }
  }, [isAuthenticated, userType, navigate]);

  const adminId = advisorProfile?.id || '';
  const userFirms = getFirmByAdmin(adminId);
  
  const activeFirm = firmId 
    ? firms.find(firm => firm.id === firmId) 
    : undefined;
  
  const [newFirm, setNewFirm] = useState<Partial<FinancialFirm>>({
    name: activeFirm?.name || '',
    description: activeFirm?.description || '',
    website: activeFirm?.website || '',
    logo: activeFirm?.logo || '',
    adminId,
    advisorIds: activeFirm?.advisorIds || [adminId],
  });

  useEffect(() => {
    if (activeFirm) {
      setNewFirm({
        name: activeFirm.name,
        description: activeFirm.description,
        website: activeFirm.website,
        logo: activeFirm.logo,
        adminId: activeFirm.adminId,
        advisorIds: activeFirm.advisorIds,
      });
    }
  }, [activeFirm]);

  const [advisorEmail, setAdvisorEmail] = useState('');
  const [pendingAdvisors, setPendingAdvisors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewFirm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (imageBase64: string) => {
    setNewFirm(prev => ({
      ...prev,
      logo: imageBase64
    }));
  };

  const handleAddAdvisor = () => {
    if (advisorEmail.trim()) {
      setPendingAdvisors(prev => [...prev, advisorEmail]);
      setAdvisorEmail('');
      toast({
        title: "Advisor invitation pending",
        description: `Email sent to ${advisorEmail}`,
      });
    }
  };

  const handleRemoveAdvisor = (email: string) => {
    setPendingAdvisors(prev => prev.filter(e => e !== email));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFirm.name && newFirm.description) {
      addFirm(newFirm as Omit<FinancialFirm, 'id' | 'createdAt'>);
      
      toast({
        title: "Success!",
        description: activeFirm ? "Firm updated successfully" : "Firm created successfully",
        variant: "default",
      });
      
      if (!activeFirm) {
        setNewFirm({
          name: '',
          description: '',
          website: '',
          logo: '',
          adminId,
          advisorIds: [adminId],
        });
        setPendingAdvisors([]);
      } else {
        setIsEditing(false);
      }
      
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="bg-white rounded-2xl overflow-hidden shadow-md mb-8">
              <div className="p-8 md:p-12">
                <div className="text-center mb-10">
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4">
                    {activeFirm ? activeFirm.name : 'Financial Firm Management'}
                  </h1>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    {activeFirm 
                      ? 'Manage your firm and its advisor profiles' 
                      : 'Create and manage your financial firm profiles and advisor team.'}
                  </p>
                </div>

                {!activeFirm && userFirms.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-serif font-semibold text-navy-800 mb-6 flex items-center">
                      <Building className="mr-2 h-6 w-6 text-teal-600" />
                      Your Firms
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {userFirms.map(firm => (
                        <div key={firm.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-4">
                            {firm.logo ? (
                              <img src={firm.logo} alt={firm.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xl font-bold mr-4">
                                {firm.name.charAt(0)}
                              </div>
                            )}
                            <div>
                              <h3 className="text-xl font-medium text-navy-900">{firm.name}</h3>
                              <p className="text-sm text-slate-500 flex items-center">
                                <Users className="w-4 h-4 mr-1 text-slate-400" />
                                {firm.advisorIds.length} advisor{firm.advisorIds.length !== 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                          
                          <p className="text-slate-700 mb-4 line-clamp-2">{firm.description}</p>
                          
                          {firm.website && (
                            <a 
                              href={firm.website} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex items-center text-teal-600 hover:text-teal-700 mb-4 text-sm"
                            >
                              <Globe className="w-4 h-4 mr-1" />
                              {firm.website}
                            </a>
                          )}
                          
                          <div className="flex justify-end">
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => navigate(`/firm/${firm.id}`)}
                              className="bg-teal-600 hover:bg-teal-700"
                            >
                              Manage
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 flex justify-center">
                      <Button 
                        onClick={() => navigate('/firm-profile')} 
                        className="bg-teal-600 hover:bg-teal-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Firm
                      </Button>
                    </div>
                  </div>
                )}

                {activeFirm ? (
                  <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-2 mb-8">
                      <TabsTrigger value="overview">Firm Overview</TabsTrigger>
                      <TabsTrigger value="advisors">Manage Advisors</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-serif font-semibold text-navy-800 flex items-center">
                          <Building className="mr-2 h-6 w-6 text-teal-600" />
                          Firm Details
                        </h2>
                        
                        <Button 
                          variant={isEditing ? "outline" : "default"} 
                          size="sm"
                          onClick={toggleEditMode}
                          className={isEditing ? "" : "bg-teal-600 hover:bg-teal-700"}
                        >
                          {isEditing ? (
                            <>Cancel</>
                          ) : (
                            <>
                              <Pencil className="w-4 h-4 mr-2" />
                              Edit Details
                            </>
                          )}
                        </Button>
                      </div>
                      
                      {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="flex justify-center mb-8">
                            <ProfilePictureUpload 
                              currentPicture={newFirm.logo}
                              onPictureChange={handleLogoChange}
                              size="lg"
                            />
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="name" className="block text-sm font-medium text-navy-800 mb-1">
                                Firm Name
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={newFirm.name}
                                onChange={handleChange}
                                className="input-field w-full"
                                placeholder="Your firm's name"
                                required
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="website" className="block text-sm font-medium text-navy-800 mb-1">
                                Website (optional)
                              </label>
                              <input
                                type="url"
                                id="website"
                                name="website"
                                value={newFirm.website}
                                onChange={handleChange}
                                className="input-field w-full"
                                placeholder="https://yourfirm.com"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="description" className="block text-sm font-medium text-navy-800 mb-1">
                              Description
                            </label>
                            <textarea
                              id="description"
                              name="description"
                              value={newFirm.description}
                              onChange={handleChange}
                              className="input-field w-full min-h-[120px]"
                              placeholder="Describe your firm and its services"
                              required
                            />
                          </div>
                          
                          <div className="pt-4 flex justify-end">
                            <Button
                              type="submit"
                              className="bg-teal-600 hover:bg-teal-700"
                            >
                              <Save className="mr-2 w-5 h-5" />
                              Save Changes
                            </Button>
                          </div>
                        </form>
                      ) : (
                        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                          <div className="flex justify-center py-8 bg-gradient-to-br from-slate-50 to-teal-50">
                            {activeFirm.logo ? (
                              <img 
                                src={activeFirm.logo} 
                                alt={activeFirm.name} 
                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md" 
                              />
                            ) : (
                              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-md">
                                {activeFirm.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          
                          <div className="p-6">
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                              <div>
                                <h3 className="text-sm font-medium text-slate-500 mb-1">Firm Name</h3>
                                <p className="text-lg font-medium text-navy-800">{activeFirm.name}</p>
                              </div>
                              
                              <div>
                                <h3 className="text-sm font-medium text-slate-500 mb-1">Website</h3>
                                {activeFirm.website ? (
                                  <a 
                                    href={activeFirm.website} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-lg text-teal-600 hover:text-teal-700 flex items-center"
                                  >
                                    <Globe className="w-4 h-4 mr-2" />
                                    {activeFirm.website}
                                  </a>
                                ) : (
                                  <p className="text-slate-600">Not provided</p>
                                )}
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-sm font-medium text-slate-500 mb-2">Description</h3>
                              <p className="text-navy-800 whitespace-pre-wrap">{activeFirm.description}</p>
                            </div>
                            
                            <div className="mt-6 pt-6 border-t border-slate-100">
                              <div className="flex items-center text-sm text-slate-500">
                                <Shield className="w-4 h-4 mr-2 text-teal-600" />
                                <span>Firm created on {new Date(activeFirm.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-8">
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                          <h3 className="text-lg font-medium text-navy-800 mb-4 flex items-center">
                            <Users className="mr-2 h-5 w-5 text-teal-600" />
                            Team Overview
                          </h3>
                          
                          <div className="flex items-center justify-between">
                            <p className="text-navy-800">
                              Your firm has {activeFirm.advisorIds.length} advisor{activeFirm.advisorIds.length !== 1 ? 's' : ''}.
                            </p>
                            <Button
                              variant="link"
                              onClick={() => setActiveTab('advisors')}
                              className="p-0 h-auto font-normal text-teal-600 hover:text-teal-700"
                            >
                              Manage your advisor team →
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="advisors">
                      <AdvisorProfileManager firm={activeFirm} />
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="bg-white rounded-lg border border-slate-200 p-8">
                    <h2 className="text-2xl font-serif font-semibold text-navy-800 mb-6 flex items-center">
                      <Plus className="mr-2 h-6 w-6 text-teal-600" />
                      Create New Firm
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                      <div className="flex justify-center mb-8">
                        <ProfilePictureUpload 
                          currentPicture={newFirm.logo}
                          onPictureChange={handleLogoChange}
                          size="lg"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-navy-800 mb-1">
                            Firm Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={newFirm.name}
                            onChange={handleChange}
                            className="input-field w-full"
                            placeholder="Your firm's name"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="website" className="block text-sm font-medium text-navy-800 mb-1">
                            Website (optional)
                          </label>
                          <input
                            type="url"
                            id="website"
                            name="website"
                            value={newFirm.website}
                            onChange={handleChange}
                            className="input-field w-full"
                            placeholder="https://yourfirm.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-navy-800 mb-1">
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          value={newFirm.description}
                          onChange={handleChange}
                          className="input-field w-full min-h-[100px]"
                          placeholder="Describe your firm and its services"
                          required
                        />
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-navy-800 mb-3 flex items-center">
                          <Users className="mr-2 h-5 w-5 text-teal-600" />
                          Invite Advisors
                        </h3>
                        
                        <div className="flex items-end space-x-2 mb-4">
                          <div className="flex-grow">
                            <label htmlFor="advisorEmail" className="block text-sm font-medium text-navy-800 mb-1">
                              Advisor Email
                            </label>
                            <input
                              type="email"
                              id="advisorEmail"
                              value={advisorEmail}
                              onChange={(e) => setAdvisorEmail(e.target.value)}
                              className="input-field w-full"
                              placeholder="advisor@example.com"
                            />
                          </div>
                          <Button 
                            type="button" 
                            onClick={handleAddAdvisor}
                            disabled={!advisorEmail.trim()}
                            className="bg-teal-600 hover:bg-teal-700"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add
                          </Button>
                        </div>
                        
                        {pendingAdvisors.length > 0 && (
                          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <h4 className="text-sm font-medium text-navy-800 mb-2">Pending Invitations</h4>
                            <ul className="space-y-2">
                              {pendingAdvisors.map(email => (
                                <li key={email} className="flex justify-between items-center text-sm bg-white p-2 rounded border border-slate-100">
                                  <span>{email}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveAdvisor(email)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="pt-6 flex justify-end">
                        <Button
                          type="submit"
                          className="bg-teal-600 hover:bg-teal-700"
                        >
                          {saved ? (
                            <>
                              <CheckCircle className="mr-2 w-5 h-5" />
                              Firm Created!
                            </>
                          ) : (
                            <>
                              <Building className="mr-2 w-5 h-5" />
                              Create Firm
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default FirmProfile;
