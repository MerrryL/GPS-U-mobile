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
import { useRefuseValidationConstatation } from "@/features/constatations/hooks/useRefuseValidationConstatation";

export default function ConstatationRefusalButton(props) {
  const { id } = props;
  const refuseValidationMutation = useRefuseValidationConstatation();

  const onRefuseValidationSubmit = async () => {
    await refuseValidationMutation.mutateAsync({
      constatationId: id,
    });
  };
  return (
    <>
      <Button
        title="Refuser "
        onPress={() => onRefuseValidationSubmit()}
        icon={<Ionicons name="thumbs-down" size={24} color="white" />}
        iconRight={true}
      />
    </>
  );
}
