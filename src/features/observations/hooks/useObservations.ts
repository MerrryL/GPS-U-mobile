import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getObservations } from "../api";

type UseObservationsOptions = {
  config?: QueryConfig<typeof getObservations>;
};

export const useObservations = ({ config }: UseObservationsOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["observations"],
    queryFn: () => getObservations(),
  });
};
