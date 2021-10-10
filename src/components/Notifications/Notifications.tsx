import React from "react";
import { useNotificationStore } from "@/hooks/useNotificationStore";

import { Notification } from "./Notification";

import { View } from "react-native";

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotificationStore();

  console.log("notifications", notifications);

  {
    if (notifications.length === 0) {
      return <></>;
    } else {
      return (
        <View>
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              notification={notification}
              onDismiss={dismissNotification}
            />
          ))}
        </View>
      );
    }
  }
};
