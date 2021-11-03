import { useQuery } from "react-query";
import { QueryConfig } from "@/lib/react-query";
import { getTask } from "../api";


type UseTaskOptions = {
  taskId: string;
  observationId:string;
  followupId:string;
  config?: QueryConfig<typeof getTask>;
};

export const useTask = ({
  taskId,
  observationId,
  followupId,
  config,
}: UseTaskOptions) => {
  return useQuery({
    ...config,
    queryKey: ["tasks", taskId],
    queryFn: () => getTask({ observationId, followupId, taskId }),
  });
};
