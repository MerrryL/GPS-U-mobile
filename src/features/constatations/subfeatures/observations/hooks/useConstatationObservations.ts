import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";
import { getConstatationObservations } from "../api";



type UseConstatationObservationsOptions = {
  constatationId: number;
  config?: QueryConfig<typeof getConstatationObservations>;
};

export const useConstatationObservations = ({ config, constatationId = null }: UseConstatationObservationsOptions) => {
  return useQuery({
    ...config,
    queryKey: ["constatationObservations"],
    queryFn: () => getConstatationObservations({ constatationId }),
  });
};
