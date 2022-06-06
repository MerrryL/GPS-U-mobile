import { useRefuseValidationConstatation } from "@/features/constatations/hooks/useRefuseValidationConstatation";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@rneui/base";
import React from "react";

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
      <Button title="Refuser " onPress={() => onRefuseValidationSubmit()} icon={<Ionicons name="thumbs-down" size={24} color="white" />} iconRight={true} />
    </>
  );
}
