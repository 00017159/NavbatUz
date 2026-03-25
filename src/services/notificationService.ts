import api from './api';
import { Notification } from '../types/appointment';

export const notificationService = {
  getAll: async (): Promise<Notification[]> => {
    const response = await api.get('/notifications');
    return response.data;
  },

  markAsRead: async (id: string): Promise<void> => {
    await api.patch(`/notifications/${id}/read`);
  },

  markAllAsRead: async (): Promise<void> => {
    await api.patch('/notifications/read-all');
  },

  getUnreadCount: async (): Promise<number> => {
    const response = await api.get('/notifications', {
      params: { isRead: false },
    });
    return response.data.length;
  },
};
