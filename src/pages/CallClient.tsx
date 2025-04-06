
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import AppLayout from '../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Phone, Video, X, Mic, MicOff, Monitor, User } from 'lucide-react';
import { useToast } from '../components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';

const CallClient: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { advisorProfile, callSessions, initiateCall, updateCallStatus, activeCall } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [callMethod, setCallMethod] = useState<string>('direct');
  const [externalLink, setExternalLink] = useState<string>('');
  const [callType, setCallType] = useState<'audio' | 'video'>('audio');
  const [isCalling, setIsCalling] = useState(false);
  const [client, setClient] = useState<any>(null);
  
  // Mock client data (in a real app, this would come from your database)
  useEffect(() => {
    if (clientId) {
      // Simulate fetching client data
      setClient({
        id: clientId,
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '(555) 123-4567',
        profilePicture: ''
      });
    }
  }, [clientId]);
  
  const handleStartCall = () => {
    if (!clientId || !advisorProfile) {
      toast("Unable to initiate call - missing information");
      return;
    }
    
    if (callMethod === 'direct') {
      // Initiate direct call through the platform
      setIsCalling(true);
      const call = initiateCall(clientId, callType);
      
      if (call) {
        toast("Calling client...");
        
        // Simulate connection after delay
        setTimeout(() => {
          updateCallStatus(call.id, 'connected');
        }, 2000);
      } else {
        setIsCalling(false);
        toast("Failed to initiate call");
      }
    } else if (callMethod === 'external') {
      // Open external app like Zoom or Teams
      if (!externalLink) {
        toast("Please enter a valid meeting link");
        return;
      }
      
      window.open(externalLink, '_blank');
      toast("Opening external meeting application");
    } else if (callMethod === 'phone') {
      // Use phone call
      if (client?.phone) {
        // Create tel: link to initiate call
        window.location.href = `tel:${client.phone}`;
        toast("Initiating phone call");
      } else {
        toast("Client phone number not available");
      }
    }
  };
  
  const handleEndCall = () => {
    if (activeCall) {
      updateCallStatus(activeCall.id, 'completed');
    }
    setIsCalling(false);
    toast("Call ended");
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6 flex items-center">
          <Button variant="outline" size="sm" onClick={handleGoBack} className="mr-3">
            <X className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Call Client</h1>
        </div>
        
        {client ? (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {client.profilePicture ? (
                    <img src={client.profilePicture} alt={client.name} className="w-12 h-12 rounded-full mr-4" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mr-4">
                      <User className="h-6 w-6" />
                    </div>
                  )}
                  <span>{client.name}</span>
                </CardTitle>
                <CardDescription>
                  {client.email} • {client.phone}
                </CardDescription>
              </CardHeader>
            </Card>
            
            {isCalling ? (
              <Card className="text-center p-8">
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <div className="w-24 h-24 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-4">
                      <User className="h-12 w-12" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{client.name}</h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      {activeCall?.status === 'connected' ? 'Connected' : 'Connecting...'}
                    </p>
                  </div>
                  
                  <div className="flex justify-center gap-4 mb-8">
                    {callType === 'video' && (
                      <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                        <Monitor className="h-6 w-6" />
                      </Button>
                    )}
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                      <MicOff className="h-6 w-6" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="h-12 w-12 rounded-full"
                      onClick={handleEndCall}
                    >
                      <Phone className="h-6 w-6 rotate-135" />
                    </Button>
                  </div>
                  
                  <div className="text-slate-500 dark:text-slate-400">
                    {activeCall?.status === 'connected' && (
                      <p>Call duration: {Math.floor((Date.now() - new Date(activeCall.startTime).getTime()) / 1000)} seconds</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Connect with Client</CardTitle>
                  <CardDescription>
                    Choose how you would like to call this client
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="direct" value={callMethod} onValueChange={setCallMethod} className="w-full">
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="direct">Platform Call</TabsTrigger>
                      <TabsTrigger value="external">External App</TabsTrigger>
                      <TabsTrigger value="phone">Phone Call</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="direct">
                      <div className="space-y-4">
                        <div className="flex flex-col space-y-2">
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            Initiate a call directly through our platform. Choose your preferred call type below.
                          </p>
                          <div className="flex gap-4">
                            <Button 
                              variant={callType === 'audio' ? 'default' : 'outline'}
                              size="lg"
                              className="flex-1 py-6"
                              onClick={() => setCallType('audio')}
                            >
                              <Phone className="h-5 w-5 mr-2" />
                              Audio Call
                            </Button>
                            <Button 
                              variant={callType === 'video' ? 'default' : 'outline'}
                              size="lg"
                              className="flex-1 py-6"
                              onClick={() => setCallType('video')}
                            >
                              <Video className="h-5 w-5 mr-2" />
                              Video Call
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="external">
                      <div className="space-y-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                          Enter a meeting link from your preferred platform (Zoom, Microsoft Teams, etc.) to connect with your client.
                        </p>
                        <div className="flex flex-col space-y-2">
                          <label htmlFor="external-link" className="text-sm font-medium">
                            Meeting Link
                          </label>
                          <Input
                            id="external-link"
                            placeholder="https://zoom.us/j/123456789"
                            value={externalLink}
                            onChange={(e) => setExternalLink(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <label htmlFor="platform" className="text-sm font-medium">
                            Platform
                          </label>
                          <Select defaultValue="zoom">
                            <SelectTrigger id="platform">
                              <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="zoom">Zoom</SelectItem>
                              <SelectItem value="teams">Microsoft Teams</SelectItem>
                              <SelectItem value="meet">Google Meet</SelectItem>
                              <SelectItem value="webex">Cisco Webex</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="phone">
                      <div className="space-y-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                          Place a standard phone call to this client. This will use your device's default phone app.
                        </p>
                        <div className="flex flex-col space-y-2">
                          <label className="text-sm font-medium">
                            Client Phone Number
                          </label>
                          <div className="text-lg font-medium">{client.phone || 'No phone number available'}</div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="mt-8 flex justify-end">
                    <Button onClick={handleStartCall} disabled={callMethod === 'external' && !externalLink}>
                      {callMethod === 'direct' ? (
                        callType === 'audio' ? (
                          <>
                            <Phone className="mr-2 h-4 w-4" />
                            Start Audio Call
                          </>
                        ) : (
                          <>
                            <Video className="mr-2 h-4 w-4" />
                            Start Video Call
                          </>
                        )
                      ) : callMethod === 'external' ? (
                        'Open External Meeting'
                      ) : (
                        'Call Client'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="py-8">
                <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Client not found
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  The client you're trying to call could not be found.
                </p>
                <Button onClick={handleGoBack}>Return to Dashboard</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default CallClient;
