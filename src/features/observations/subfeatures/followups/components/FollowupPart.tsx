import React from "react";

import { useFollowups } from "../hooks/useFollowups";
import { FollowupCard } from "./FollowupCard";
import { FollowupsAdd } from "./FollowupAdd";
// import { useUpdateFollowup } from "../hooks/useUpdateFollowup";

export function FollowupPart({ observationId }) {
  const FollowupsQuery = useFollowups({
    observationId: observationId,
  });

  return (
    <>
      <FollowupsAdd observationId={observationId} />
      {FollowupsQuery?.data?.map((followup) => (
        <FollowupCard followupId={followup.id} observationId={observationId} key={followup.id} />
      ))}
    </>
  );
}
