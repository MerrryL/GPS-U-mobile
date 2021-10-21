import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getObservation } from "../api";

type UseObservationOptions = {
  constatationId: string;
  config?: QueryConfig<typeof getObservation>;
};

export const useObservation = ({
  constatationId,
  config,
}: UseObservationOptions) => {
  return useQuery({
    ...config,
    queryKey: ["constatations", constatationId],
    queryFn: () => getObservation({ constatationId }),
  });
};
