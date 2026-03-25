import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentService } from '../services/appointmentService';
import { BookAppointmentData } from '../types/appointment';

export const useMyAppointments = (status?: string) => {
  return useQuery({
    queryKey: ['myAppointments', status],
    queryFn: () => appointmentService.getMyAppointments(status),
  });
};

export const useUpcomingAppointments = () => {
  return useQuery({
    queryKey: ['upcomingAppointments'],
    queryFn: () => appointmentService.getUpcoming(),
  });
};

export const useBookAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BookAppointmentData) => appointmentService.book(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myAppointments'] });
      queryClient.invalidateQueries({ queryKey: ['upcomingAppointments'] });
    },
  });
};

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => appointmentService.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myAppointments'] });
      queryClient.invalidateQueries({ queryKey: ['upcomingAppointments'] });
    },
  });
};
