import { useValidateConstatation } from "@/features/constatations/hooks/useValidateConstatation";
import React from "react";
import { Button, makeStyles } from "react-native-elements";
import { AntDesign, Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRequireValidationConstatation } from "@/features/constatations/hooks/useRequireValidationConstatation";

export default function ConstatationRequireValidationButton(props) {
  const { id } = props;
  const requireValidationMutation = useRequireValidationConstatation();

  const onRequireValidation = async () => {
    await requireValidationMutation.mutateAsync({
      constatationId: id,
    });
  };

  return (
    <>
      <Button title="Valider " onPress={() => onRequireValidation()} icon={<Ionicons name="thumbs-up" size={24} color="white" />} iconRight={true} />
    </>
  );
}
