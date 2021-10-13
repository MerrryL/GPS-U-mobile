import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getObservers } from "../api";

type UseObserversOptions = {
  constatationId?: string;
  config?: QueryConfig<typeof getObservers>;
};

export const useObservers = ({ config, constatationId = null }: UseObserversOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["observers"],
    queryFn: () => getObservers({constatationId}),
  });
};
