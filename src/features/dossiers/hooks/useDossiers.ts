import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getDossiers } from "../api";

type UseDossiersOptions = {
  config?: QueryConfig<typeof getDossiers>;
};

export const useDossiers = ({ config }: UseDossiersOptions) => {
  return useQuery({
    ...config,
    queryKey: ["dossiers"],
    queryFn: () => getDossiers({}),
  });
};
