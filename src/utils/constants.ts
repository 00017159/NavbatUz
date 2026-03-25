export const APP_NAME = 'NavbatUz';

export const API_BASE_URL = 'http://localhost:3000';

export const OTP_LENGTH = 6;
export const OTP_EXPIRY_SECONDS = 300; // 5 minutes

export const SPECIALTIES = [
  { key: 'CARDIOLOGY', label: 'Cardiology', icon: '❤️' },
  { key: 'NEUROLOGY', label: 'Neurology', icon: '🧠' },
  { key: 'ORTHOPEDIC', label: 'Orthopedic', icon: '🦴' },
  { key: 'OPHTHALMOLOGY', label: 'Ophthalmology', icon: '👁️' },
  { key: 'GENERAL', label: 'General', icon: '🏥' },
  { key: 'DERMATOLOGY', label: 'Dermatology', icon: '🧴' },
  { key: 'PEDIATRICS', label: 'Pediatrics', icon: '👶' },
  { key: 'PSYCHIATRY', label: 'Psychiatry', icon: '🧘' },
] as const;

export const APPOINTMENT_STATUS_COLORS = {
  PENDING: '#F59E0B',
  CONFIRMED: '#22C55E',
  COMPLETED: '#6B7280',
  CANCELLED: '#EF4444',
} as const;

export const MORNING_SLOTS = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
];

export const AFTERNOON_SLOTS = [
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
];

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
} as const;
