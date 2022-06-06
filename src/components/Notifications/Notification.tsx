import { Ionicons } from "@expo/vector-icons";
import { Badge, Button, Overlay } from "@rneui/base";
import Modal from "modal-react-native-web";
import React, { useEffect } from "react";
import { Text } from "react-native";

const icons = {
  primary: <Ionicons name="information-outline" />,
  success: <Ionicons name="happy-outline" />,
  warning: <Ionicons name="warning-outline" />,
  error: <Ionicons name="skull-outline" />,
};

export type NotificationProps = {
  notification: {
    id: string;
    type: keyof typeof icons;
    title: string;
    message?: string;
  };
  onDismiss: (id: string) => void;
};

export const Notification = ({ notification: { id, type, title, message }, onDismiss }: NotificationProps) => {
  useEffect((): (() => void) => {
    const timer: NodeJS.Timeout = setTimeout((): void => onDismiss(id), 3000);
    return (): void => clearTimeout(timer);
  }, []);

  return (
    <>
      <Overlay isVisible={true} ModalComponent={Modal}>
        <Badge status={type} value={title}></Badge>
        <Text h1>{title}</Text>
        {icons[type]}
        <Text h3>{message}</Text>

        <Button title="X" onPress={() => onDismiss(id)} />
      </Overlay>
    </>
  );
};
