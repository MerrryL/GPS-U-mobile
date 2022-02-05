import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getFields } from "../api";

type UseFieldsOptions = {
  observationId: string;
  fieldGroupId: string;
  config?: QueryConfig<typeof getFields>;
};

export const useFields = ({
  config,
  observationId,
  fieldGroupId,
}: UseFieldsOptions) => {
  return useQuery({
    ...config,
    queryKey: ["fields"],
    queryFn: () => getFields({ observationId, fieldGroupId }),
  });
};
