import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getFields } from "../api";

type UseFieldsOptions = {
  constatationId?: string;
  config?: QueryConfig<typeof getFields>;
};

export const useFields = ({ config, constatationId = null }: UseFieldsOptions) => {
  return useQuery({
    ...config,
    queryKey: ["field_groups"],
    queryFn: () => getFields({constatationId}),
  });
};
