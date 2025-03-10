
import React, { useState } from 'react';
import { Calendar, Clock, PlusCircle, Calendar as CalendarIcon } from 'lucide-react';
import { useUser } from '../context/UserContext';
import AdvisorAppointmentManager from '../components/scheduler/AdvisorAppointmentManager';
import ConsumerAppointmentList from '../components/scheduler/ConsumerAppointmentList';
import AppointmentCalendar from '../components/scheduler/AppointmentCalendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import AppLayout from '../components/layout/AppLayout';
import { addMonths, subMonths } from 'date-fns';

const Schedule = () => {
  const { userType, consumerProfile, advisorProfile, appointments } = useUser();
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  
  const userAppointments = appointments.filter(appointment => {
    if (userType === 'consumer' && consumerProfile) {
      return appointment.consumerId === consumerProfile.id;
    } else if (userType === 'advisor' && advisorProfile) {
      return appointment.advisorId === advisorProfile.id;
    }
    return false;
  });

  const handlePreviousMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="glass-card rounded-2xl overflow-hidden shadow-lg">
          <div className="p-6 md:p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-navy-900 mb-2">
                <CalendarIcon className="inline-block mr-2 h-6 w-6" />
                Your Schedule
              </h1>
              <p className="text-slate-600">
                {userType === 'consumer' 
                  ? 'Manage your appointments with financial advisors' 
                  : 'Manage your client appointments and availability'}
              </p>
            </div>

            <Tabs defaultValue="calendar" className="w-full">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger 
                    value="calendar" 
                    onClick={() => setView('calendar')}
                    className={cn(view === 'calendar' ? 'bg-teal-100' : '')}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Calendar
                  </TabsTrigger>
                  <TabsTrigger 
                    value="list" 
                    onClick={() => setView('list')}
                    className={cn(view === 'list' ? 'bg-teal-100' : '')}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Appointments
                  </TabsTrigger>
                </TabsList>

                {userType === 'advisor' && (
                  <button
                    className="btn-primary btn-sm inline-flex items-center"
                    onClick={() => toast({
                      title: "Feature Coming Soon",
                      description: "Setting up available times will be available soon.",
                    })}
                  >
                    <PlusCircle className="mr-1 h-4 w-4" />
                    Set Availability
                  </button>
                )}
              </div>

              <TabsContent value="calendar" className="space-y-4">
                <AppointmentCalendar 
                  appointments={userAppointments}
                  currentDate={currentDate}
                  onPrevMonth={handlePreviousMonth}
                  onNextMonth={handleNextMonth}
                />
              </TabsContent>

              <TabsContent value="list" className="space-y-4">
                {userType === 'advisor' ? (
                  <AdvisorAppointmentManager appointments={userAppointments} />
                ) : (
                  <ConsumerAppointmentList appointments={userAppointments} />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Schedule;
