import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";
import { getObservationFieldGroups } from "../api";



type UseObservationFieldGroupsOptions = {
  observationId: number;
  config?: QueryConfig<typeof getObservationFieldGroups>;
};

export const useObservationFieldGroups = ({ config, observationId }: UseObservationFieldGroupsOptions) => {
  return useQuery({
    ...config,
    queryKey: ["field_groups"],
    queryFn: () => getObservationFieldGroups({ observationId }),
  });
};
