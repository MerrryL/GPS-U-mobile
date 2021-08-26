import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getDossiers } from "../api";

type UseDossiersOptions = {
  constatationId?: string;
  config?: QueryConfig<typeof getDossiers>;
};

export const useDossiers = ({ config, constatationId = null }: UseDossiersOptions) => {
  return useQuery({
    ...config,
    queryKey: ["dossiers"],
    queryFn: () => getDossiers({constatationId}),
  });
};
