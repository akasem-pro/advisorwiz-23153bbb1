
import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Clock, 
  Check, 
  X, 
  UserCheck,
  Search,
  Filter,
  ChevronDown
} from 'lucide-react';
import { Appointment, AppointmentStatus, useUser } from '../../context/UserContext';
import { format, parseISO, isAfter } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
import { cn } from '@/lib/utils';

interface ConsumerAppointmentListProps {
  appointments: Appointment[];
}

const ConsumerAppointmentList: React.FC<ConsumerAppointmentListProps> = ({ appointments }) => {
  const { updateAppointmentStatus } = useUser();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'all' | 'upcoming'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');

  const isUpcoming = (appointment: Appointment) => {
    const appointmentDate = parseISO(appointment.date);
    return isAfter(appointmentDate, new Date()) && appointment.status !== 'cancelled';
  };

  const filteredAppointments = appointments.filter(appointment => {
    // Apply status filter
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'upcoming' ? isUpcoming(appointment) : appointment.status === statusFilter);
    
    // Apply search filter
    const matchesSearch = appointment.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

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

  const handleCancelAppointment = (appointmentId: string) => {
    updateAppointmentStatus(appointmentId, 'cancelled');
    toast({
      title: 'Appointment cancelled',
      description: 'Your appointment has been cancelled.',
    });
    setShowDetails(false);
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
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-1" />
              {statusFilter === 'all' 
                ? 'All' 
                : statusFilter === 'upcoming' 
                  ? 'Upcoming' 
                  : statusFilter}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setStatusFilter('all')}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('upcoming')}>
              Upcoming
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
                  <Badge 
                    variant="outline"
                    className={cn(getStatusClass(appointment.status), "capitalize")}
                  >
                    {appointment.status}
                  </Badge>
                  <div className="text-sm text-slate-600 flex items-center">
                    <UserCheck className="h-4 w-4 mr-1" />
                    <span>Financial Advisor</span>
                  </div>
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
                
                <div className="text-sm font-medium text-slate-500">With:</div>
                <div>Financial Advisor</div>
                
                <div className="text-sm font-medium text-slate-500">Status:</div>
                <div>
                  <Badge 
                    variant="outline"
                    className={cn(getStatusClass(selectedAppointment.status), "capitalize")}
                  >
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
              
              {selectedAppointment.status !== 'cancelled' && selectedAppointment.status !== 'completed' && (
                <div className="pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="bg-red-50 text-red-700 hover:bg-red-100 w-full"
                    onClick={() => handleCancelAppointment(selectedAppointment.id)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel Appointment
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ConsumerAppointmentList;
