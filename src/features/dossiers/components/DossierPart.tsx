import React from "react";

//import { Dossier } from "@/types";

import { useDossiers } from "../hooks/useDossiers";
import { DossierCard } from "./DossierCard";
import { DossiersAdd } from "./DossierAdd";
import { useDeleteDossier } from "../hooks/useDeleteDossier";
// import { useUpdateDossier } from "../hooks/useUpdateDossier";

export function DossierPart({ dossier, constatationId }) {
  const DossiersQuery = useDossiers({
    constatationId: constatationId,
  });

  return (
    <>
      <DossierCard dossier={dossier} constatationId={constatationId} />
    </>
  );
}
