import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";
import { getObservationTypes } from "../api";



type UseObservationTypesOptions = {
  config?: QueryConfig<typeof getObservationTypes>;
};

export const useObservationTypes = ({ config }: UseObservationTypesOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["observation_types"],
    queryFn: () => getObservationTypes(),
  });
};
