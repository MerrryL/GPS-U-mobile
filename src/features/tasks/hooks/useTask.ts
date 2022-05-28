import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";
import { getTask } from "../api";



type UseTaskOptions = {
  constatationId: number;
  config?: QueryConfig<typeof getTask>;
};

export const useTask = ({ constatationId, config }: UseTaskOptions) => {
  return useQuery({
    ...config,
    queryKey: ["constatations", constatationId],
    queryFn: () => getTask({ constatationId }),
  });
};
