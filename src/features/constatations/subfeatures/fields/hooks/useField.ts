import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getField } from "../api";

import { Field } from "../types";

type UseFieldOptions = {
  fieldGroupId?: string;
  config?: QueryConfig<typeof getField>;
};

export const useField = ({
  fieldGroupId,
  config,
}: UseFieldOptions) => {
  return useQuery({
    ...config,
    queryKey: ["field_groups", fieldGroupId],
    queryFn: () => getField({ fieldGroupId }),
  });
};
