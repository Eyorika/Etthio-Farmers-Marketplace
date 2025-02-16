import { create } from 'zustand';

interface NotificationState {
  notifications: any[];
  setNotifications: (notifications: any[]) => void;
  markAsRead: (id: string) => void;
}

export const useNotificationsStore = create<NotificationState>((set) => ({
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    })),
}));