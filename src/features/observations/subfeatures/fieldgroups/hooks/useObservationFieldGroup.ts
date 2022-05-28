import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";
import { getObservationFieldGroup } from "../api";

type UseObservationFieldGroupOptions = {
  observationId: number;
  fieldGroupId: number;
  config?: QueryConfig<typeof getObservationFieldGroup>;
};

export const useObservationFieldGroup = ({ observationId, fieldGroupId, config }: UseObservationFieldGroupOptions) => {
  return useQuery({
    queryKey: ["field_groups", fieldGroupId],
    queryFn: () => getObservationFieldGroup({ observationId, fieldGroupId }),
    ...config,
  });
};
