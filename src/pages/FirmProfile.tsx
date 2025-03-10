
import React, { useState, useEffect } from 'react';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useUser } from '../context/UserContext';
import FirmRegistrationForm from '../components/firm/FirmRegistrationForm';
import AdvisorProfileManager from '../components/firm/AdvisorProfileManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import FirmList from '../components/firm/FirmList';
import FirmOverview from '../components/firm/FirmOverview';

const FirmProfile: React.FC = () => {
  const { userType, isAuthenticated, advisorProfile, firms, getFirmByAdmin } = useUser();
  const navigate = useNavigate();
  const { id: firmId } = useParams<{ id: string }>();
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
              <FirmList firms={userFirms} />
            )}

            {activeFirm ? (
              <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 mb-8">
                  <TabsTrigger value="overview">Firm Overview</TabsTrigger>
                  <TabsTrigger value="advisors">Manage Advisors</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <FirmOverview firm={activeFirm} onSwitchTab={setActiveTab} />
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
