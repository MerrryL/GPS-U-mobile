import { useNotificationStore } from "@/hooks/useNotificationStore";
import React from "react";
import { View } from "react-native";
import { Notification } from "./Notification";



export const Notifications:() => JSX.Element = ():JSX.Element => {
  const { notifications, dismissNotification } = useNotificationStore();

  {
    if (notifications.length === 0) {
      return <></>;
    } else {
      return (
        <View>
          {notifications.map((notification):JSX.Element => (
            <Notification key={notification.id} notification={notification} onDismiss={dismissNotification} />
          ))}
        </View>
      );
    }
  }
};
