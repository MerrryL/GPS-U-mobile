import { nanoid } from "nanoid";
import "react-native-get-random-values";
import create, { SetState, StoreApi, UseBoundStore } from "zustand";

export type Notification = {
  id: string;
  type: "primary" | "warning" | "success" | "error";
  title: string;
  message?: string;
};

type NotificationsState = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => void;
  dismissNotification: (id: string) => void;
};

export const useNotificationStore: UseBoundStore<NotificationsState, StoreApi<NotificationsState>> = create<NotificationsState>((set:SetState<NotificationsState>) => ({
  notifications: [],
  addNotification: (notification: Omit<Notification, "id">):void =>
    set((state:NotificationsState):{notifications:Notification[]} => ({
      notifications: [...state.notifications, { id: nanoid(), ...notification }],
    })),
  dismissNotification: (id:string):void =>
    set((state:NotificationsState):{notifications:Notification[]} => ({
      notifications: state.notifications.filter((notification:Notification):boolean => notification.id !== id),
    })),
}));
