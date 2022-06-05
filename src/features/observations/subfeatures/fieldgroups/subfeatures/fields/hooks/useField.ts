import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";
import { getField } from "../api";

type UseFieldOptions = {
  fieldId: number;
  observationId: number;
  fieldGroupId: number;
  config?: QueryConfig<typeof getField>;
};

export const useField = ({ fieldId, observationId, fieldGroupId, config }: UseFieldOptions) => {
  return useQuery({
    queryKey: ["fields", fieldId],
    queryFn: () => getField({ observationId, fieldGroupId, fieldId }),
    ...config,
  });
};
