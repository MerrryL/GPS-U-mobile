import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";
import { getObservation } from "../api";

type UseObservationOptions = {
  observationId: number;
  config?: QueryConfig<typeof getObservation>;
};

export const useObservation = ({ observationId, config }: UseObservationOptions) => {
  return useQuery({
    queryKey: ["observations", observationId],
    queryFn: () => getObservation({ observationId }),
    ...config,
  });
};
