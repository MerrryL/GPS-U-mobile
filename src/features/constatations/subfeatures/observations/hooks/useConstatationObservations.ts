import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getConstatationObservations } from "../api";

type UseConstatationObservationsOptions = {
  constatationId: string;
  config?: QueryConfig<typeof getConstatationObservations>;
};

export const useConstatationObservations = ({
  config,
  constatationId = null,
}: UseConstatationObservationsOptions) => {
  return useQuery({
    ...config,
    queryKey: ["constatationObservations"],
    queryFn: () => getConstatationObservations({ constatationId }),
  });
};
