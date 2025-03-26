
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Phone, MessageCircle, BarChart3, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const QuickPathCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
  actionText: string;
  color: string;
}> = ({ icon, title, description, to, actionText, color }) => {
  return (
    <Card className="border border-slate-200 dark:border-navy-700 hover:shadow-md transition-shadow">
      <CardHeader className={`pb-2 flex items-start ${color} text-white rounded-t-lg`}>
        <div className="rounded-full bg-white/20 p-2">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <CardTitle className="text-lg font-medium mb-1">{title}</CardTitle>
        <CardDescription className="mb-3">{description}</CardDescription>
        <Link to={to} className="flex items-center justify-end text-sm font-medium text-teal-600 dark:text-teal-400 hover:underline">
          {actionText}
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
};

export const AdvisorQuickPathWidget: React.FC = () => {
  const quickPaths = [
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Schedule",
      description: "Manage appointments and availability",
      to: "/schedule",
      actionText: "View Calendar",
      color: "bg-purple-600"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Clients",
      description: "Review and manage your client relationships",
      to: "/clients",
      actionText: "View Clients",
      color: "bg-blue-600"
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "Messages",
      description: "Respond to client inquiries",
      to: "/chat",
      actionText: "Open Messages",
      color: "bg-green-600"
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Performance",
      description: "Track your key metrics and growth",
      to: "/analytics",
      actionText: "View Analytics",
      color: "bg-amber-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {quickPaths.map((path, index) => (
        <QuickPathCard key={index} {...path} />
      ))}
    </div>
  );
};

export default AdvisorQuickPathWidget;
