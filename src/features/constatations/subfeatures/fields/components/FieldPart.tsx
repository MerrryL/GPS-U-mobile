import React from "react";

import { useFields } from "../hooks/useFields";
import { FieldCard } from "./FieldCard";
import { FieldsAdd } from "./FieldAdd";
import { useDeleteField } from "../hooks/useDeleteField";
// import { useUpdateField } from "../hooks/useUpdateField";

export function FieldPart({ fields, fieldGroupId, constatationId }) {
  const FieldsQuery = useFields({
    fieldGroupId: fieldGroupId,
  });

  return (
    <>
      <FieldCard
        field={field}
        fieldGroupId={fieldGroupId}
        constatationId={constatationId}
      />
    </>
  );
}
