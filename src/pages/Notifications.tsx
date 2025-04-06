
import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { format, subDays } from 'date-fns';
import { Bell, Check, Mail, Calendar, FileText, User, AlertCircle } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Notification } from '../types/notificationTypes';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';
import { useToast } from '../components/ui/use-toast';

const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'match':
      return <User className="h-5 w-5 text-blue-500" />;
    case 'message':
      return <Mail className="h-5 w-5 text-purple-500" />;
    case 'appointment':
      return <Calendar className="h-5 w-5 text-green-500" />;
    case 'lead':
      return <FileText className="h-5 w-5 text-amber-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
};

const Notifications: React.FC = () => {
  const { userType } = useUser();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Mock notification data since we're not connecting to Supabase yet
  useEffect(() => {
    setIsLoading(true);
    
    // Create 30 days of sample notifications
    const now = new Date();
    const mockNotifications: Notification[] = [];
    
    const notificationTypes = ['match', 'message', 'appointment', 'lead', 'system'];
    const titlesByType = {
      match: ['New match found', 'High compatibility match', 'Potential client match'],
      message: ['New message received', 'Unread message', 'Client replied to your message'],
      appointment: ['Appointment scheduled', 'Appointment reminder', 'Appointment request'],
      lead: ['New lead created', 'Lead status updated', 'Lead converted to client'],
      system: ['Profile update reminder', 'Subscription renewal', 'New feature available']
    };
    
    // Generate notifications for the last 30 days
    for (let i = 0; i < 30; i++) {
      const date = subDays(now, i);
      const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const titles = titlesByType[type as keyof typeof titlesByType];
      const title = titles[Math.floor(Math.random() * titles.length)];
      
      mockNotifications.push({
        id: `notification-${i}`,
        userId: 'user-1',
        type: type as 'match' | 'message' | 'appointment' | 'system',
        title,
        message: `This is a sample ${type} notification from ${format(date, 'MMMM d')}`,
        read: i > 5, // First 5 are unread
        actionLink: type === 'match' ? '/matches' : 
                    type === 'message' ? '/chat' : 
                    type === 'appointment' ? '/schedule' :
                    type === 'lead' ? '/leads' : undefined,
        timestamp: date.toISOString()
      });
    }
    
    setNotifications(mockNotifications);
    setIsLoading(false);
  }, []);
  
  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId ? {...notification, read: true} : notification
      )
    );
    toast("Notification marked as read");
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({...notification, read: true}))
    );
    toast("All notifications marked as read");
  };
  
  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : activeTab === 'unread'
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.type === activeTab);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Notifications", url: "/notifications" }
  ];
  
  return (
    <AppLayout>
      <div className="container mx-auto px-4 max-w-6xl">
        <BreadcrumbNav items={breadcrumbs} />
        
        <div className="my-6">
          <h1 className="text-3xl font-serif font-bold text-navy-900 dark:text-white flex items-center">
            Notifications
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-3">
                {unreadCount} unread
              </Badge>
            )}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            View and manage your notifications from the last 30 days
          </p>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="match">Matches</TabsTrigger>
              <TabsTrigger value="message">Messages</TabsTrigger>
              <TabsTrigger value="appointment">Appointments</TabsTrigger>
              {(userType === 'advisor' || userType === 'firm_admin') && (
                <TabsTrigger value="lead">Leads</TabsTrigger>
              )}
            </TabsList>
          </Tabs>
          
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleMarkAllAsRead}
              className="whitespace-nowrap ml-4"
            >
              <Check className="mr-1 h-4 w-4" />
              Mark all read
            </Button>
          )}
        </div>
        
        <div className="space-y-4 mb-8">
          {isLoading ? (
            <Card>
              <CardContent className="p-6">
                <div className="h-24 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                </div>
              </CardContent>
            </Card>
          ) : filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <Card key={notification.id} className={notification.read ? "opacity-80" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <NotificationIcon type={notification.type} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-medium ${notification.read ? "text-slate-700 dark:text-slate-300" : "text-navy-900 dark:text-white font-semibold"}`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {format(new Date(notification.timestamp), 'MMM d, h:mm a')}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        {notification.actionLink && (
                          <Button size="sm" variant="link" asChild className="p-0 h-auto">
                            <a href={notification.actionLink}>View Details</a>
                          </Button>
                        )}
                        
                        {!notification.read && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="ml-auto"
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                    {!notification.read && (
                      <div className="min-w-4 min-h-4 rounded-full bg-blue-500 mr-2" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="py-8">
                  <div className="mb-4 flex justify-center">
                    <Bell className="h-12 w-12 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-2">
                    No notifications found
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    You don't have any {activeTab !== 'all' ? activeTab : ''} notifications at this time.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Notifications;
