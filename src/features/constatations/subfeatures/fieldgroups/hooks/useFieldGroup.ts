import { useQuery } from "react-query";
import { QueryConfig } from "@/lib/react-query";
import { getFieldGroup } from "../api";


type UseFieldGroupOptions = {
  fieldGroupId?: string;
  config?: QueryConfig<typeof getFieldGroup>;
};

export const useFieldGroup = ({
  fieldGroupId,
  config,
}: UseFieldGroupOptions) => {
  return useQuery({
    ...config,
    queryKey: ["field_groups", fieldGroupId],
    queryFn: () => getFieldGroup({ fieldGroupId }),
  });
};
