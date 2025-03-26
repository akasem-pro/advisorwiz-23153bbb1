
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarClock, 
  MessageCircle, 
  Users, 
  BarChart3, 
  Clock, 
  BellRing, 
  Clipboard, 
  Phone
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { useUser } from '../../context/UserContext';

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  className?: string;
  onClick?: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ 
  icon, 
  label, 
  href, 
  variant = "outline",
  className,
  onClick
}) => {
  return (
    <Button 
      variant={variant} 
      className={cn("flex items-center justify-start gap-2 h-10 px-3 w-full", className)}
      asChild
      onClick={onClick}
    >
      <Link to={href}>
        {icon}
        <span className="text-sm">{label}</span>
      </Link>
    </Button>
  );
};

const QuickActionPanel: React.FC = () => {
  const { appointments, chats } = useUser();
  
  // Calculate unread messages
  const unreadMessageCount = chats?.reduce((count, chat) => {
    const unreadMessages = chat.messages?.filter(
      msg => !msg.read && msg.senderId !== 'advisor_id'
    ) || [];
    return count + unreadMessages.length;
  }, 0) || 0;

  // Calculate upcoming appointments (next 24 hours)
  // Using the correct property names from the Appointment type
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setHours(tomorrow.getHours() + 24);
  
  const upcomingAppointments = appointments?.filter(
    appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate >= now && appointmentDate <= tomorrow;
    }
  ).length || 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <QuickAction 
          icon={<CalendarClock className="h-4 w-4" />} 
          label={`Appointments ${upcomingAppointments > 0 ? `(${upcomingAppointments})` : ''}`} 
          href="/schedule" 
          variant={upcomingAppointments > 0 ? "default" : "outline"}
          className={upcomingAppointments > 0 ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
        />
        
        <QuickAction 
          icon={<MessageCircle className="h-4 w-4" />} 
          label={`Messages ${unreadMessageCount > 0 ? `(${unreadMessageCount})` : ''}`}
          href="/chat"
          variant={unreadMessageCount > 0 ? "default" : "outline"}
          className={unreadMessageCount > 0 ? "bg-purple-600 hover:bg-purple-700 text-white" : ""}
        />
        
        <QuickAction 
          icon={<Users className="h-4 w-4" />} 
          label="Leads" 
          href="/leads" 
        />
        
        <QuickAction 
          icon={<BarChart3 className="h-4 w-4" />} 
          label="Performance" 
          href="/analytics" 
        />
        
        <QuickAction 
          icon={<Clock className="h-4 w-4" />} 
          label="Set Availability" 
          href="/availability" 
        />
        
        <QuickAction 
          icon={<BellRing className="h-4 w-4" />} 
          label="Notifications" 
          href="/notifications" 
        />
        
        <QuickAction 
          icon={<Clipboard className="h-4 w-4" />} 
          label="Client Notes" 
          href="/client-notes" 
        />
        
        <QuickAction 
          icon={<Phone className="h-4 w-4" />} 
          label="Call Client" 
          href="/call" 
        />
      </CardContent>
    </Card>
  );
};

export default QuickActionPanel;
