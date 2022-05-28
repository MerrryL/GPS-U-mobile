import { ConstatationStackParamList } from '@/features/constatations';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from '@react-navigation/stack';
import React from "react";
import { Button, FullTheme, makeStyles } from "react-native-elements";

type DetailsButtonProps = {
  constatationId: number;
};
export default function DetailsButton({ constatationId }: DetailsButtonProps) {
  const navigation: StackNavigationProp<ConstatationStackParamList, keyof ConstatationStackParamList, undefined> = useNavigation<StackNavigationProp<ConstatationStackParamList>>();

  const styles = useStyles();

  return <Button 
  icon={<Ionicons name="eye-outline" size={24} color="white" />} 
  type="outline" 
  style={styles.button} 
  onPress={() => navigation.navigate("Details", { constatationId: constatationId })}
  />;
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  button: {
    marginRight: "10px",
  },
}));
