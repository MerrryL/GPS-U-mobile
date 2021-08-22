import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getConstatations } from "../api";

type UseConstatationsOptions = {
  config?: QueryConfig<typeof getConstatations>;
};

export const useConstatations = ({ config }: UseConstatationsOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["constatations"],
    queryFn: () => getConstatations(),
  });
};
