// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  OTP: { phone: string };
  TelegramLink: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Appointments: undefined;
  Profile: undefined;
};

export type DoctorStackParamList = {
  DoctorDetail: { doctorId: string };
  BookAppointment: { doctorId: string };
  Confirmation: { appointmentId: string };
};
