import React from "react";

import { useFieldGroups } from "../hooks/useFieldGroups";
import { FieldGroupCard } from "./FieldGroupCard";
import { FieldGroupsAdd } from "./FieldGroupAdd";
// import { useUpdateFieldGroup } from "../hooks/useUpdateFieldGroup";

export function FieldGroupPart({ constatationId = null }) {
  const FieldGroupsQuery = useFieldGroups({
    constatationId: constatationId,
  });

  return (
    <>
      <FieldGroupsAdd constatationId={constatationId} />
      {FieldGroupsQuery?.data?.map((fieldGroup) => (
        <FieldGroupCard fieldGroup={fieldGroup} constatationId={constatationId} key={fieldGroup.id} />
      ))}
    </>
  );
}
