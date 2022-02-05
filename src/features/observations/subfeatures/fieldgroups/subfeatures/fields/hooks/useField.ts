import { useQuery } from "react-query";
import { QueryConfig } from "@/lib/react-query";
import { getField } from "../api";

type UseFieldOptions = {
  fieldId: string;
  observationId: string;
  fieldGroupId: string;
  config?: QueryConfig<typeof getField>;
};

export const useField = ({
  fieldId,
  observationId,
  fieldGroupId,
  config,
}: UseFieldOptions) => {
  return useQuery({
    ...config,
    queryKey: ["fields", fieldId],
    queryFn: () => getField({ observationId, fieldGroupId, fieldId }),
  });
};
