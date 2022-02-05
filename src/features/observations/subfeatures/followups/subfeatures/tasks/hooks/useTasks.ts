import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getTasks } from "../api";

type UseTasksOptions = {
  observationId: string;
  followupId: string;
  config?: QueryConfig<typeof getTasks>;
};

export const useTasks = ({ config, observationId, followupId }: UseTasksOptions) => {
  return useQuery({
    ...config,
    queryKey: ["fields"],
    queryFn: () => getTasks({ observationId, followupId }),
  });
};
