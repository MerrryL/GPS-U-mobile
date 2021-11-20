import { useValidateConstatation } from "@/features/constatations/hooks/useValidateConstatation";
import React from "react";
import { Button, makeStyles } from "react-native-elements";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function ConstatationValidationButton(props) {
  const { id } = props;
  const validateMutation = useValidateConstatation();

  const onValidation = async () => {
    await validateMutation.mutateAsync({
      constatationId: id,
    });
  };

  return (
    <>
      <Button
        title="Valider "
        onPress={() => onValidation()}
        icon={<Ionicons name="thumbs-up" size={24} color="white" />}
        iconRight={true}
      />
    </>
  );
}
