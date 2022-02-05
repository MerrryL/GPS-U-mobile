import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";
import { getObservation } from "../api";

type UseObservationOptions = {
  observationId: string;
  config?: QueryConfig<typeof getObservation>;
};

export const useObservation = ({ observationId, config }: UseObservationOptions) => {
  return useQuery({
    ...config,
    queryKey: ["observations", observationId],
    queryFn: () => getObservation({ observationId }),
  });
};
