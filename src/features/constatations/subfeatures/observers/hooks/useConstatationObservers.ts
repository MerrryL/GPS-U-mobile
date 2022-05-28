import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";
import { getConstatationObservers } from "../api";



type UseConstatationObserversOptions = {
  constatationId: number;
  config?: QueryConfig<typeof getConstatationObservers>;
};

export const useConstatationObservers = ({ config, constatationId = null }: UseConstatationObserversOptions) => {
  return useQuery({
    ...config,
    queryKey: ["constatationObservers"],
    queryFn: () => getConstatationObservers({ constatationId }),
  });
};
