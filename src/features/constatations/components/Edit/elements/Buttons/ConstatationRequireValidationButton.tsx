import { useRequireValidationConstatation } from "@/features/constatations/hooks/useRequireValidationConstatation";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@rneui/base";
import React from "react";

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
      <Button onPress={() => onRequireValidation()} iconRight={true} color="success">
        <Ionicons name="thumbs-up" size={12} color="white" />
      </Button>
    </>
  );
}
