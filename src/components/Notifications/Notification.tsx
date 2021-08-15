import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Text, View } from 'react-native'
import { Button, Badge } from 'react-native-elements'


const icons = {
  info: <Ionicons name="information-outline"/>,
  success: <Ionicons name="happy-outline"/>,
  warning: <Ionicons name="warning-outline"/>,
  error: <Ionicons name="skull-outline"/>,
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

export const Notification = ({
  notification: { id, type, title, message },
  onDismiss,
}: NotificationProps) => {
  return (
    <>
    <View>
      <Badge status={type}>
      <Text h1>
        {title}
        </Text>
        {icons[type]}
        <Text h3>
        {message}
        </Text>
        </Badge>
        <Button onPress={ () => onDismiss}/>

    </View>
    </>
  );
};
