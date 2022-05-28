import { ConstatationStackParamList } from '@/features/constatations';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from '@react-navigation/stack';
import React from "react";
import { Button, FullTheme, makeStyles } from "react-native-elements";

interface EditButtonProps {
  constatationId: number;
}
export default function EditButton({ constatationId }: EditButtonProps) {
  const navigation: StackNavigationProp<ConstatationStackParamList, keyof ConstatationStackParamList, undefined> = useNavigation<StackNavigationProp<ConstatationStackParamList>>();

  const styles = useStyles();

  return <Button icon={<AntDesign name="edit" size={24} color="white" />}  type="outline"  style={styles.button} onPress={() => navigation.navigate("Edition", { constatationId: constatationId })} />;
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  button: {
    marginRight: "10px",
  },
}));
