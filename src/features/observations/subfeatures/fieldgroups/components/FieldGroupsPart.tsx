import { FieldGroup, Observation } from "@/types";
import React from "react";
import { useObservationFieldGroups } from "../hooks/useObservationFieldGroups";
import { FieldGroupsAdd } from "./FieldGroupAdd";
import { FieldGroupCard } from "./FieldGroupCard";

// import { useUpdateFieldGroup } from "../hooks/useUpdateFieldGroup";

interface FieldGroupsPartProps {
  observation: Observation;
}

export function FieldGroupsPart(props: FieldGroupsPartProps): JSX.Element {
  const FieldGroupsQuery = useObservationFieldGroups({
    observationId: props.observation.id,
  });

  return (
    <>
      <FieldGroupsAdd observation={props.observation} />
      {FieldGroupsQuery?.data?.map(
        (fieldGroup: FieldGroup): JSX.Element => (
          <FieldGroupCard fieldGroupId={fieldGroup.id} observation={props.observation} key={fieldGroup.id} />
        )
      )}
    </>
  );
}
