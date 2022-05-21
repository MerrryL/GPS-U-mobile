import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";
import { getObservers } from "../features/constatations/subfeatures/observers/api";



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
