
import React from 'react';

interface AppointmentTitleProps {
  title: string;
}

const AppointmentTitle: React.FC<AppointmentTitleProps> = ({ title }) => {
  return <h3 className="font-medium">{title}</h3>;
};

export default AppointmentTitle;
