
import React from 'react';
import { Appointment, AdvisorProfile } from '../../../context/UserContext';

interface AppointmentCategoryProps {
  appointment: Appointment;
  advisorProfile: AdvisorProfile | null;
}

const AppointmentCategory: React.FC<AppointmentCategoryProps> = ({ 
  appointment, 
  advisorProfile 
}) => {
  const getCategoryLabel = () => {
    if (advisorProfile) {
      const category = advisorProfile.appointmentCategories.find(
        cat => cat.id === appointment.categoryId
      );
      return category ? category.label : 'Appointment';
    }
    return 'Appointment';
  };

  return (
    <span className="text-sm text-slate-600">
      {getCategoryLabel()}
    </span>
  );
};

export default AppointmentCategory;
