import { useQuery } from "react-query";
import { QueryConfig } from "@/lib/react-query";
import { getFieldGroup } from "../api";
import { QueryKeys } from "@/lib/query-keys";

type UseFieldGroupOptions = {
  fieldGroupId?: string;
  config?: QueryConfig<typeof getFieldGroup>;
};

export const useFieldGroup = ({ fieldGroupId, config }: UseFieldGroupOptions) => {
  return useQuery({
    ...config,
    queryKey: [QueryKeys.FieldGroups, fieldGroupId],
    queryFn: () => getFieldGroup({ fieldGroupId }),
  });
};
