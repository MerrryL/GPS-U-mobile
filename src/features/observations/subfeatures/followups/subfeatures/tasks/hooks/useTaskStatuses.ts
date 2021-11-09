import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getTaskStatuses } from "../api";

type UseTaskStatusesOptions = {
  config?: QueryConfig<typeof getTaskStatuses>;
};

export const useTaskStatuses = ({ config }: UseTaskStatusesOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["task_statuses"],
    queryFn: () => getTaskStatuses(),
  });
};
