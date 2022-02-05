import { useQuery } from "react-query";
import { QueryConfig } from "@/lib/react-query";
import { getObservationFieldGroup } from "../api";

type UseObservationFieldGroupOptions = {
  observationId: string;
  fieldGroupId: string;
  config?: QueryConfig<typeof getObservationFieldGroup>;
};

export const useObservationFieldGroup = ({ observationId, fieldGroupId, config }: UseObservationFieldGroupOptions) => {
  return useQuery({
    ...config,
    queryKey: ["field_groups", fieldGroupId],
    queryFn: () => getObservationFieldGroup({ observationId, fieldGroupId }),
  });
};
