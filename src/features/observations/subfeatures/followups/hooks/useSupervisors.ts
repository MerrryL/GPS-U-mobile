import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getSupervisors } from "../api";

type UseSupervisorsOptions = {
  config?: QueryConfig<typeof getSupervisors>;
};

export const useSupervisors = ({ config }: UseSupervisorsOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["supervisors"],
    queryFn: () => getSupervisors(),
  });
};
