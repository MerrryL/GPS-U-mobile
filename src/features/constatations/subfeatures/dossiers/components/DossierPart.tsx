import React, { useState } from "react";
import { FAB, Text, Button, Input } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//import { Dossier } from "../types";

import { useDossiers } from "../hooks/useDossiers";
import { DossierCard } from "./DossierCard";
import { DossiersAdd } from "./DossierAdd";
import { useDeleteDossier } from "../hooks/useDeleteDossier";
// import { useUpdateDossier } from "../hooks/useUpdateDossier";

export function DossierPart({ dossier, constatationId }) {
  const DossiersQuery = useDossiers({
    constatationId: constatationId
  });

  
  return (
    <>
      <DossierCard dossier={dossier} constatationId={constatationId} />
    </>
  )
}
