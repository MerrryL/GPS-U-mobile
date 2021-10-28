import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getObservers } from "../api";

type UseObserversOptions = {
  config?: QueryConfig<typeof getObservers>;
};

export const useObservers = ({ config }: UseObserversOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["observers"],
    queryFn: () => getObservers(),
  });
};
