import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getField } from "../api";

import { Field } from "../types";

type UseFieldOptions = {
  fieldId?: string;
  config?: QueryConfig<typeof getField>;
};

export const useField = ({
  fieldId,
  config,
}: UseFieldOptions) => {
  return useQuery({
    ...config,
    queryKey: ["fields", fieldId],
    queryFn: () => getField({ fieldId }),
  });
};
