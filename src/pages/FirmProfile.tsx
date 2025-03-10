import React from 'react';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useUser, FinancialFirm, AdvisorProfile } from '../context/UserContext';
import { Save, CheckCircle, Plus, Trash2, Users, Building, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';
import ProfilePictureUpload from '../components/profile/ProfilePictureUpload';
import AdvisorProfileManager from '../components/firm/AdvisorProfileManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const FirmProfile: React.FC = () => {
  const { userType, isAuthenticated, advisorProfile, firms, addFirm, getFirmByAdmin } = useUser();
  const navigate = useNavigate();
  const { id: firmId } = useParams<{ id: string }>();
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

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
    }
  };

  const handleRemoveAdvisor = (email: string) => {
    setPendingAdvisors(prev => prev.filter(e => e !== email));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFirm.name && newFirm.description) {
      addFirm(newFirm as Omit<FinancialFirm, 'id' | 'createdAt'>);
      setNewFirm({
        name: '',
        description: '',
        website: '',
        logo: '',
        adminId,
        advisorIds: [adminId],
      });
      setPendingAdvisors([]);
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }
  };

  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="glass-card rounded-2xl overflow-hidden shadow-lg mb-8">
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
                      <Building className="mr-2 h-6 w-6" />
                      Your Firms
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {userFirms.map(firm => (
                        <div key={firm.id} className="bg-white rounded-xl shadow p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-4">
                            {firm.logo ? (
                              <img src={firm.logo} alt={firm.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-navy-400 to-navy-600 flex items-center justify-center text-white text-xl font-bold mr-4">
                                {firm.name.charAt(0)}
                              </div>
                            )}
                            <div>
                              <h3 className="text-xl font-medium text-navy-900">{firm.name}</h3>
                              <p className="text-sm text-slate-500">
                                {firm.advisorIds.length} advisor{firm.advisorIds.length !== 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                          
                          <p className="text-slate-700 mb-4">{firm.description}</p>
                          
                          {firm.website && (
                            <a 
                              href={firm.website} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex items-center text-teal-600 hover:text-teal-700 mb-4"
                            >
                              <Globe className="w-4 h-4 mr-1" />
                              {firm.website}
                            </a>
                          )}
                          
                          <div className="flex justify-end">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/firm/${firm.id}`)}
                            >
                              Manage
                            </Button>
                          </div>
                        </div>
                      ))}
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
                      <div className="flex justify-center mb-8">
                        <ProfilePictureUpload 
                          currentPicture={activeFirm.logo}
                          onPictureChange={handleLogoChange}
                          size="lg"
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium text-navy-800 mb-2">Firm Details</h3>
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-slate-500">Name</p>
                                <p className="font-medium text-navy-800">{activeFirm.name}</p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-500">Website</p>
                                <p className="font-medium text-navy-800">
                                  {activeFirm.website ? (
                                    <a 
                                      href={activeFirm.website} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-teal-600 hover:text-teal-700"
                                    >
                                      {activeFirm.website}
                                    </a>
                                  ) : (
                                    "Not provided"
                                  )}
                                </p>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <p className="text-sm text-slate-500">Description</p>
                              <p className="text-navy-800">{activeFirm.description}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-navy-800 mb-2">Team Overview</h3>
                          <div className="bg-white rounded-lg p-4 shadow-sm">
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
                  <div>
                    <h2 className="text-2xl font-serif font-semibold text-navy-800 mb-6 flex items-center">
                      <Plus className="mr-2 h-6 w-6" />
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
                          className="input-field"
                          placeholder="Your firm's name"
                          required
                        />
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
                          className="input-field min-h-[100px]"
                          placeholder="Describe your firm and its services"
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
                          className="input-field"
                          placeholder="https://yourfirm.com"
                        />
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-navy-800 mb-3 flex items-center">
                          <Users className="mr-2 h-5 w-5" />
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
                              className="input-field"
                              placeholder="advisor@example.com"
                            />
                          </div>
                          <Button 
                            type="button" 
                            onClick={handleAddAdvisor}
                            disabled={!advisorEmail.trim()}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add
                          </Button>
                        </div>
                        
                        {pendingAdvisors.length > 0 && (
                          <div className="bg-slate-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-navy-800 mb-2">Pending Invitations</h4>
                            <ul className="space-y-2">
                              {pendingAdvisors.map(email => (
                                <li key={email} className="flex justify-between items-center text-sm bg-white p-2 rounded">
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

                      <div className="pt-4 flex justify-end">
                        <button
                          type="submit"
                          className="btn-primary inline-flex items-center"
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
                        </button>
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
