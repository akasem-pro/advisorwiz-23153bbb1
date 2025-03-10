
import { ClientTypeOption, MeetingMethodOption } from '../types/advisorTypes';

// Define client type preferences
export const clientTypeOptions: ClientTypeOption[] = [
  { value: 'young_professionals', label: 'Young Professionals' },
  { value: 'business_owners', label: 'Business Owners' },
  { value: 'retirees', label: 'Retirees' },
  { value: 'high_net_worth', label: 'High-Net-Worth Individuals' },
  { value: 'families', label: 'Families' },
  { value: 'pre_retirees', label: 'Pre-Retirees' },
  { value: 'all', label: 'All Types of Clients' }
];

// Define meeting preferences
export const meetingMethodOptions: MeetingMethodOption[] = [
  { value: 'phone', label: 'Phone' },
  { value: 'video', label: 'Video Call' },
  { value: 'in_person', label: 'In-Person' },
  { value: 'hybrid', label: 'Hybrid (Mix of virtual and in-person)' }
];
