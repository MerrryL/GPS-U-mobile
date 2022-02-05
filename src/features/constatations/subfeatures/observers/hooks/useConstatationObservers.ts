import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getConstatationObservers } from "../api";

type UseConstatationObserversOptions = {
  constatationId: string;
  config?: QueryConfig<typeof getConstatationObservers>;
};

export const useConstatationObservers = ({ config, constatationId = null }: UseConstatationObserversOptions) => {
  return useQuery({
    ...config,
    queryKey: ["constatationObservers"],
    queryFn: () => getConstatationObservers({ constatationId }),
  });
};
