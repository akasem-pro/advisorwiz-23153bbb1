
import React from 'react';

interface AppointmentCategoryProps {
  category: string;
}

const AppointmentCategory: React.FC<AppointmentCategoryProps> = ({ category }) => {
  return (
    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
      {category}
    </span>
  );
};

export default AppointmentCategory;
