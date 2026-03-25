import { useQuery } from '@tanstack/react-query';
import { doctorService } from '../services/doctorService';
import { DoctorSearchFilters } from '../types/api';

export const useDoctors = (filters: DoctorSearchFilters) => {
  return useQuery({
    queryKey: ['doctors', filters],
    queryFn: () => doctorService.search(filters),
  });
};

export const useDoctorDetail = (id: string) => {
  return useQuery({
    queryKey: ['doctor', id],
    queryFn: () => doctorService.getById(id),
    enabled: !!id,
  });
};

export const useDoctorSlots = (doctorId: string, date: string) => {
  return useQuery({
    queryKey: ['doctorSlots', doctorId, date],
    queryFn: () => doctorService.getSlots(doctorId, date),
    enabled: !!doctorId && !!date,
  });
};

export const useTopDoctors = (limit: number = 5) => {
  return useQuery({
    queryKey: ['topDoctors', limit],
    queryFn: () => doctorService.getTopRated(limit),
  });
};
