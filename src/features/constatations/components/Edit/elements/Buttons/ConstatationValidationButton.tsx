import { useValidateConstatation } from "@/features/constatations/hooks/useValidateConstatation";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@rneui/base";
import React from "react";

interface ConstatationValidationButtonProps {
  id: number;
}

export default function ConstatationValidationButton({ id }: ConstatationValidationButtonProps) {
  const validateMutation = useValidateConstatation();

  const onValidation = async () => {
    await validateMutation.mutateAsync({
      constatationId: id,
    });
  };

  return (
    <>
      <Button onPress={() => onValidation()} iconRight={true} color="success">
        <Ionicons name="thumbs-up" size={12} color="white" />
      </Button>
      {/* <Button title="Valider " onPress={() => onValidation()} icon={<Ionicons name="thumbs-up" size={24} color="white" />} iconRight={true} /> */}
    </>
  );
}
