import React from "react";

import { useObservationFieldGroups } from "../hooks/useObservationFieldGroups";
import { FieldGroupCard } from "./FieldGroupCard";
import { FieldGroupsAdd } from "./FieldGroupAdd";
// import { useUpdateFieldGroup } from "../hooks/useUpdateFieldGroup";

export function FieldGroupPart({ observationId }) {
  const FieldGroupsQuery = useObservationFieldGroups({
    observationId: observationId,
  });

  return (
    <>
      <FieldGroupsAdd observationId={observationId} />
      {FieldGroupsQuery?.data?.map((fieldGroup) => (
        <FieldGroupCard
          fieldGroupId={fieldGroup.id}
          observationId={observationId}
          key={fieldGroup.id}
        />
      ))}
    </>
  );
}
