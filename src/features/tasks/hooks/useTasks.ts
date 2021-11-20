import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getTasks } from "../api";

type UseTasksOptions = {
  config?: QueryConfig<typeof getTasks>;
};

export const useTasks = ({ config }: UseTasksOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });
};
