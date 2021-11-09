import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getOperators } from "../api";

type UseOperatorsOptions = {
  config?: QueryConfig<typeof getOperators>;
};

export const useOperators = ({ config }: UseOperatorsOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["operators"],
    queryFn: () => getOperators(),
  });
};
