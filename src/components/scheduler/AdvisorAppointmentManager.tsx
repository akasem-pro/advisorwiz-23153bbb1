
import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Clock, 
  Check, 
  X, 
  Edit, 
  PlusCircle,
  Filter,
  ChevronDown,
  Search,
} from 'lucide-react';
import { Appointment, AppointmentStatus, useUser } from '../../context/UserContext';
import { format, parseISO } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import AppointmentCategoryManager from './AppointmentCategoryManager';
import { cn } from '@/lib/utils';

interface AdvisorAppointmentManagerProps {
  appointments: Appointment[];
}

const AdvisorAppointmentManager: React.FC<AdvisorAppointmentManagerProps> = ({ appointments }) => {
  const { updateAppointmentStatus, advisorProfile } = useUser();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAppointments = appointments.filter(appointment => {
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    const matchesSearch = appointment.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = (appointmentId: string, status: AppointmentStatus) => {
    updateAppointmentStatus(appointmentId, status);
    toast({
      title: 'Status updated',
      description: `Appointment status changed to ${status}`,
    });
    setShowDetails(false);
  };

  const formatAppointmentTime = (start: string, end: string) => {
    const formatTime = (time: string) => {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const period = hour >= 12 ? 'PM' : 'AM';
      const adjustedHour = hour % 12 || 12;
      return `${adjustedHour}:${minutes} ${period}`;
    };

    return `${formatTime(start)} - ${formatTime(end)}`;
  };

  const getStatusClass = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-700 bg-green-100';
      case 'pending':
        return 'text-amber-700 bg-amber-100';
      case 'cancelled':
        return 'text-red-700 bg-red-100';
      case 'completed':
        return 'text-blue-700 bg-blue-100';
      default:
        return 'text-slate-700 bg-slate-100';
    }
  };

  const getCategoryLabel = (appointment: Appointment) => {
    if (advisorProfile) {
      const category = advisorProfile.appointmentCategories.find(
        cat => cat.id === appointment.categoryId
      );
      return category ? category.label : 'Appointment';
    }
    return 'Appointment';
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-2.5 top-3 text-slate-400" />
          <Input
            type="text"
            placeholder="Search appointments"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-full"
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-1" />
                {statusFilter === 'all' ? 'All' : statusFilter}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('confirmed')}>
                Confirmed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('completed')}>
                Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('cancelled')}>
                Cancelled
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={() => setShowCategoryManager(true)}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Manage Categories
          </Button>
        </div>
      </div>

      {filteredAppointments.length > 0 ? (
        <div className="space-y-3">
          {filteredAppointments.map((appointment) => (
            <div 
              key={appointment.id}
              className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                setSelectedAppointment(appointment);
                setShowDetails(true);
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-medium">{appointment.title}</h3>
                  <div className="text-sm text-slate-500 flex items-center mt-1">
                    <CalendarCheck className="h-4 w-4 mr-1" />
                    {format(parseISO(appointment.date), 'EEEE, MMMM d, yyyy')}
                  </div>
                  <div className="text-sm text-slate-500 flex items-center mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatAppointmentTime(appointment.startTime, appointment.endTime)}
                  </div>
                </div>
                
                <div className="flex flex-col sm:items-end gap-2">
                  <Badge variant="outline" className={cn(getStatusClass(appointment.status), "capitalize")}>
                    {appointment.status}
                  </Badge>
                  <span className="text-sm text-slate-600">
                    {getCategoryLabel(appointment)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-lg bg-slate-50">
          <Clock className="h-8 w-8 text-slate-400 mx-auto mb-2" />
          <h3 className="text-lg font-medium text-slate-700">No appointments found</h3>
          <p className="text-slate-500 mt-1">
            {searchTerm 
              ? 'Try changing your search criteria'
              : statusFilter !== 'all'
                ? `No ${statusFilter} appointments found`
                : 'You have no appointments scheduled'}
          </p>
        </div>
      )}

      {/* Appointment Details Dialog */}
      {selectedAppointment && (
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedAppointment.title}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-2">
                <div className="text-sm font-medium text-slate-500">Date:</div>
                <div>{format(parseISO(selectedAppointment.date), 'EEEE, MMMM d, yyyy')}</div>
                
                <div className="text-sm font-medium text-slate-500">Time:</div>
                <div>{formatAppointmentTime(selectedAppointment.startTime, selectedAppointment.endTime)}</div>
                
                <div className="text-sm font-medium text-slate-500">Category:</div>
                <div>{getCategoryLabel(selectedAppointment)}</div>
                
                <div className="text-sm font-medium text-slate-500">Status:</div>
                <div>
                  <Badge variant="outline" className={cn(getStatusClass(selectedAppointment.status), "capitalize")}>
                    {selectedAppointment.status}
                  </Badge>
                </div>
                
                {selectedAppointment.location && (
                  <>
                    <div className="text-sm font-medium text-slate-500">Location:</div>
                    <div>{selectedAppointment.location}</div>
                  </>
                )}
                
                {selectedAppointment.notes && (
                  <>
                    <div className="text-sm font-medium text-slate-500">Notes:</div>
                    <div className="text-sm">{selectedAppointment.notes}</div>
                  </>
                )}
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Update Status</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAppointment.status !== 'confirmed' && (
                    <Button 
                      variant="outline" 
                      className="bg-green-50 text-green-700 hover:bg-green-100"
                      onClick={() => handleUpdateStatus(selectedAppointment.id, 'confirmed')}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Confirm
                    </Button>
                  )}
                  
                  {selectedAppointment.status !== 'completed' && selectedAppointment.status !== 'cancelled' && (
                    <Button 
                      variant="outline" 
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                      onClick={() => handleUpdateStatus(selectedAppointment.id, 'completed')}
                    >
                      <CalendarCheck className="h-4 w-4 mr-1" />
                      Mark Completed
                    </Button>
                  )}
                  
                  {selectedAppointment.status !== 'cancelled' && (
                    <Button 
                      variant="outline" 
                      className="bg-red-50 text-red-700 hover:bg-red-100"
                      onClick={() => handleUpdateStatus(selectedAppointment.id, 'cancelled')}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline"
                    className="bg-slate-50 text-slate-700 hover:bg-slate-100"
                    onClick={() => toast({
                      title: "Feature Coming Soon",
                      description: "Appointment editing will be available soon.",
                    })}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Category Manager Dialog */}
      <AppointmentCategoryManager 
        isOpen={showCategoryManager} 
        onClose={() => setShowCategoryManager(false)} 
      />
    </div>
  );
};

export default AdvisorAppointmentManager;
