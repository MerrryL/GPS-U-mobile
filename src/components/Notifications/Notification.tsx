import React, { useEffect } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Button, Badge, Overlay } from "react-native-elements";
import Modal from "modal-react-native-web";

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
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(id), 3000);
    return () => clearTimeout(timer);
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
