import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getFieldGroups } from "../api";

type UseFieldGroupsOptions = {
  constatationId?: string;
  config?: QueryConfig<typeof getFieldGroups>;
};

export const useFieldGroups = ({
  config,
  constatationId = null,
}: UseFieldGroupsOptions) => {
  return useQuery({
    ...config,
    queryKey: ["field_groups"],
    queryFn: () => getFieldGroups({ constatationId }),
  });
};
