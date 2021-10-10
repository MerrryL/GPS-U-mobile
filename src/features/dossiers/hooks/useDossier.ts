import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getDossier } from "../api";

import { Dossier } from "@/types";

type UseDossierOptions = {
  dossierId?: string;
  config?: QueryConfig<typeof getDossier>;
};

export const useDossier = ({
  dossierId,
  config,
}: UseDossierOptions) => {
  return useQuery({
    ...config,
    queryKey: ["dossiers", dossierId],
    queryFn: () => getDossier({ dossierId }),
  });
};
