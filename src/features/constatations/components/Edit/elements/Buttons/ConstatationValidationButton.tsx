import { useValidateConstatation } from "@/features/constatations/hooks/useValidateConstatation";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@rneui/base";
import React from "react";

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
      <Button title="Valider " onPress={() => onValidation()} icon={<Ionicons name="thumbs-up" size={24} color="white" />} iconRight={true} />
    </>
  );
}
