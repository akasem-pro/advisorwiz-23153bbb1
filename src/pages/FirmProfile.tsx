
import React, { useState, useEffect } from 'react';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useUser, FinancialFirm } from '../context/UserContext';
import FirmRegistrationForm from '../components/firm/FirmRegistrationForm';
import AdvisorProfileManager from '../components/firm/AdvisorProfileManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Building, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/use-toast';

const FirmProfile: React.FC = () => {
  const { userType, isAuthenticated, advisorProfile, firms, getFirmByAdmin } = useUser();
  const navigate = useNavigate();
  const { id: firmId } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
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
  
  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 text-center mb-2">
                {activeFirm ? activeFirm.name : 'Financial Firm Registration'}
              </h1>
              <p className="text-slate-600 text-center max-w-2xl mx-auto">
                {activeFirm 
                  ? 'Manage your firm and its advisor profiles' 
                  : 'Register your financial firm to connect with potential clients and manage your advisor team.'}
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
                    Register New Firm
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
                          <span>Firm created on {new Date(activeFirm.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
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
              <FirmRegistrationForm />
            )}
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default FirmProfile;
