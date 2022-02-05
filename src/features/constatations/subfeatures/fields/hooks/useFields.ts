import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getFields } from "../api";

type UseFieldsOptions = {
  fieldGroupId?: string;
  config?: QueryConfig<typeof getFields>;
};

export const useFields = ({
  config,
  fieldGroupId = null,
}: UseFieldsOptions) => {
  return useQuery({
    ...config,
    queryKey: ["fields"],
    queryFn: () => getFields({ fieldGroupId }),
  });
};
